const fs = jest.createMockFromModule('fs');
const path = require('path');
const bibtexParse = require('bibtex-parse-js');
const { convertBibToJson } = require('./organize-metadata.js');

test('convertBibToJson function is defined', () => {
  console.log('Running test: convertBibToJson function is defined');
  expect(typeof convertBibToJson).toEqual('function');
});

test('convertBibToJson creates metadata.json file', () => {
  console.log('Running test: convertBibToJson creates metadata.json file');
  fs.writeFileSync = jest.fn();
  fs.readFileSync.mockReturnValueOnce('@article{expectedDummy,\n  title={expected dummy title},\n}\n@book{dummyBook,\n  title={dummy book title},\n}');
  convertBibToJson();
  expect(fs.writeFileSync).toHaveBeenCalled();
});
