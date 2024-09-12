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
  const mockBibContent = '@article{expectedDummy,\n  title={expected dummy title},\n}\n@book{dummyBook,\n title={dummy book   title},\n}';
  fs.readFileSync = jest.fn((filePath, encoding) => {
    if (filePath.endsWith('history.bib') && encoding === 'utf-8') {
      return mockBibContent;
    }
    return '';
  });
  const intermoduleDataDir = 'data';
  const bibPath = path.join(__dirname, `${intermoduleDataDir}/history.bib`);
  const jsonPath = path.join(__dirname, `${intermoduleDataDir}/metadata.json`);
  convertBibToJson(bibPath, jsonPath);
  expect(fs.writeFileSync).toHaveBeenCalled();
});

