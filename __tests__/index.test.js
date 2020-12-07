import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const cases = [
  ['stylish', 'expected_stylish.txt'],
  ['plain', 'expected_plain.txt'],
  ['json', 'expected_json.txt'],
];

test.each(cases)(
  '%p formatter test',
  (formatName, filepath) => {
    const file1 = getFixturePath('file1.yaml');
    const file2 = getFixturePath('file2.json');
    const actual = genDiff(file1, file2, formatName);
    const expected = readFile(filepath);

    expect(actual).toBe(expected);
  },
);

test('default formatter', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.yml');
  const actual = genDiff(file1, file2);
  const expected = readFile('expected_stylish.txt');

  expect(actual).toBe(expected);
});
