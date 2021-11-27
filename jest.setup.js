/* eslint-disable */
import 'regenerator-runtime/runtime';
import { configure } from '@testing-library/react';

configure({ testIdAttribute: 'data-test-id' });

global.MutationObserver = class {
  constructor(callback) { }
  disconnect() { }
  observe(element, initObject) { }
};
/* eslint-enable */
