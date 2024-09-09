const { convertBibToJson } = require('./organize-metadata');

test('convertBibToJson function is defined', () => {
  expect(typeof convertBibToJson).toEqual('function');
});
