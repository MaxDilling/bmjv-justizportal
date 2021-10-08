import React from 'react';
import { ReactNode } from 'react';
import * as Icons from 'react-icons/fa';

import Data from '../data_parser/data.json';
import Glossary from '../data_parser/glossary.json';

interface DynamicFaIconProps {
  name: string;
}

const DynamicFaIcon = (props: DynamicFaIconProps) => {
  const IconComponent: any = Icons[props.name];

  if (!IconComponent) {
    // Return a default one
    console.log(`[Warrning] Cloud not find icon '${props.name}'`);
    return <Icons.FaBeer size="3.5rem" />;
  }

  return <IconComponent size="3.5rem" />;
};

export interface MMNode {
  id: string;
  title: string;
  type: string;
  icon?: ReactNode;
  info?: string;
  children?: MMNode[];
}

export class MMGraph {
  private parent: { [id: string]: MMNode } = {};
  private nodes: { [id: string]: MMNode } = {};
  private root: MMNode;
  private numberOfNotes = 0;

  constructor() {
    this.root = { title: '', id: '', type: 'root' };
  }

  initialize() {
    let currentInput: any = Data['root'];
    let currentNode: MMNode = { title: currentInput['data']['text'], id: currentInput['data']['id'], type: 'root' };
    this.root = this.traverseMindMap(Data['root']);
  }

  getNode(id: string | null): MMNode {
    if (id != null && id in this.nodes) {
      return this.nodes[id];
    } else {
      return this.root;
    }
  }

  getParent(id: string | null): MMNode | undefined {
    if (id != null && id in this.parent) {
      return this.parent[id];
    } else {
      return undefined;
    }
  }

  private getIndicesOf(searchStr: string, str: string) {
    var searchStrLen: number = searchStr.length;
    if (searchStrLen == 0) {
      return [];
    }
    var startIndex: number = 0;
    var index: number = 0;
    let indices: number[] = [];
    str = str.toLowerCase();
    searchStr = searchStr.toLowerCase();
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
      indices.push(index);
      startIndex = index + searchStrLen;
    }
    return indices;
  }

  private addTooltips(arrayRef: string[], keyword: string, infoText: string): string[] {
    let tempDict: { [id: number]: string[] } = {};
    for (var i = 0; i < arrayRef.length; i++) {
      if (typeof arrayRef[i] === 'string') {
        let indices: number[] = this.getIndicesOf(keyword, arrayRef[i]);
        if (indices.length > 0) {
          tempDict[i] = [];
          var lastAddedIndex: number = 0;
          indices.forEach((index) => {
            tempDict[i].push(arrayRef[i].substr(lastAddedIndex, index - lastAddedIndex));
            tempDict[i].push('`' + keyword + '`');
            lastAddedIndex = index + keyword.length;
          });
          tempDict[i].push(arrayRef[i].substr(lastAddedIndex, arrayRef[i].length - lastAddedIndex));
        } else {
          tempDict[i] = [arrayRef[i]];
        }
      } else {
        tempDict[i] = [arrayRef[i]];
      }
    }
    let returnArray: string[] = [];
    for (var i = 0; i < Object.keys(tempDict).length; i++) {
      tempDict[i].forEach((object) => returnArray.push(object));
    }
    return returnArray;
  }

  private configureContent(currentNode: MMNode, currentInput: any) {
    let lines: string[] = currentInput['data']['note'].split('\n');
    if (lines[0].includes('{ICON:')) {
      currentNode.icon = <DynamicFaIcon name={lines[0].substring(6, lines[0].length - 1)} />;
      lines.splice(0, 1);
    }
    var infoText = lines.join('\n');
    var infoArray: string[] = [infoText];
    Glossary.forEach((valuePair) => {
      infoArray = this.addTooltips(infoArray, valuePair.Name, valuePair.Text);
    });
    currentNode.info = infoArray.join('');
  }

  private traverseMindMap(currentInput: any): MMNode {
    let currentNode: MMNode = { title: currentInput['data']['text'], id: currentInput['data']['id'], type: 'default' };

    if (currentInput.data.hasOwnProperty('note')) {
      this.configureContent(currentNode, currentInput);
    }

    if (currentInput.data.hasOwnProperty('priority')) {
      if (currentInput.data['priority'] == 1) {
        currentNode.type = 'NOANSWERD';
      } else if (currentInput.data['priority'] == 3) {
        currentNode.type = 'YESANSWERD';
      }
    }

    if (Array.isArray(currentInput['children']) && currentInput['children'].length != 0) {
      currentNode.children = [];
      for (let child of currentInput['children']) {
        if (child['data']['id'] in this.nodes) {
          // FIx reappearing IDs
          child['data']['id'] += 'X';
        }

        this.parent[child['data']['id']] = currentNode;
        let childObject: MMNode = this.traverseMindMap(child);
        currentNode.children.push(childObject);
      }
    }

    this.nodes[currentNode.id] = currentNode;
    return currentNode;
  }
}
