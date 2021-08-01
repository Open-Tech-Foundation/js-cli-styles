import esCliStyles from '../lib/index.js';

describe('esCliStyles', () => {
  test('index', () => {
    expect(esCliStyles()).toMatch(/Hello World!/);
  });
});
