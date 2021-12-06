import React from 'react';
import * as IconsFa from 'react-icons/fa';
import { DynamicFaIcon, MMGraph } from '../KMParser';
import { FaLandmark } from 'react-icons/fa';
import ReactDOM from 'react-dom';

test.skip('Check Dynamic Icon generation', () => {
  const testIcon = 'FaLandmark';

  const div1 = document.createElement('div');
  const div2 = document.createElement('div');
  ReactDOM.render(IconsFa[testIcon]({ size: '3em' }), div1);
  ReactDOM.render(DynamicFaIcon({ name: testIcon, size: '3em' }), div2);
  expect(div1).toMatchObject(div2);
});

const testGraph = new MMGraph();

const testData = {
  root: {
    data: {
      id: 'bopmq7968674',
      created: 1633091151499,
      text: 'Solution Explorer',
    },
    children: [
      {
        data: {
          id: 'ceppclbpk3s0',
          created: 1633257177722,
          text: 'Wohnen',
          icon: 'FaHome',
        },
        children: [
          {
            data: {
              id: 'ceppclbpk3s0',
              created: 1633257177722,
              text: 'Wohnen dupplicat',
              icon: 'FaHome',
            },
          },
        ],
      },
    ],
  },
};

test('Initialize MindMap', () => {
  expect(() => testGraph.initialize(testData['root'])).not.toThrow();
});

test('Check if data was read', () => {
  expect(testGraph.getNode('ceppclbpk3s0').title).toBe('Wohnen');
});

test('Check if duplicates are handled correctly', () => {});
