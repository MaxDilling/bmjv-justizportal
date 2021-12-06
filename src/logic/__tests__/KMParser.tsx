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

const testData = new MMGraph();

test('Initialize MindMap', () => {
  expect(() => testData.initialize()).not.toThrow();
});

test('Initialize MindMap', () => {});

test('Initialize MindMap', () => {});
