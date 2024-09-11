const fs = jest.createMockFromModule('fs');
const path = require('path');
const { convertBibToJson } = require('./organize-metadata.js');

test('convertBibToJson function is defined', () => {
  console.log('Running test: convertBibToJson function is defined');
  expect(typeof convertBibToJson).toEqual('function');
});

test('convertBibToJson creates metadata.json file', () => {
  console.log('Running test: convertBibToJson creates metadata.json file');
  fs.readFileSync = jest.fn().mockReturnValue('@article{dummy, title={dummy title}}');
  fs.writeFileSync = jest.fn();
  fs.readFileSync = jest.fn().mockReturnValue('@article{dummy, title={dummy title}}');
  convertBibToJson();
  expect(fs.writeFileSync).toHaveBeenCalled();
});
