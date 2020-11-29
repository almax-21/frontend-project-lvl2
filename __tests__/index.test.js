import genDiff from '../src/index.js';

test("gendiff's main flow", () => { // trial version!!!
  expect(genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json')).toBeTruthy();
});
