import genDiff from '../src/index.js';

test("gendiff's main flow", () => { // trial version!!!
  expect(genDiff('/home/max/Projects/tmp/file1.json', '/home/max/Projects/tmp/file2.json')).toBeTruthy();
});
