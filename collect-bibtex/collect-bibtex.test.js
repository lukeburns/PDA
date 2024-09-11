const { processBibtexEntry } = require('./collect-bibtex.js');

test('processBibtexEntry function is defined', () => {
  expect(typeof processBibtexEntry).toEqual('function');
});

test('processBibtexEntry processes a bibtex entry', () => {
  // TODO: Replace this with a real test
  expect(processBibtexEntry('dummy entry')).toEqual('dummy entry');
});
