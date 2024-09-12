const fs = jest.createMockFromModule('fs');
const path = require('path');
const bibtexParse = require('bibtex-parse-js');
const { convertBibToJson } = require('./organize-metadata.js');

jest.mock('fs');

/*
test('convertBibToJson function is defined', () => {
  console.log('Running test: convertBibToJson function is defined');
  expect(typeof convertBibToJson).toEqual('function');
});
*/

test('convertBibToJson creates metadata.json file', () => {
  console.log('Running test: convertBibToJson creates metadata.json file');
  fs.writeFileSync = jest.fn();
  fs.readFileSync = jest.fn().mockReturnValue('@article{expectedDummy,\n  title={expected dummy title},\n}\n@book{dummyBook,\n title={dummy book   title},\n}');
  var mockValue = fs.readFileSync();
  console.log("Mock value: ", mockValue);
  convertBibToJson();
  expect(fs.writeFileSync).toHaveBeenCalled();
});

