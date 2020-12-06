import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expected = readFile('expected.stylish.txt');

test('stylish formatter test', () => {
  const before = getFixturePath('before.json');
  const after = getFixturePath('after.yml');
  const actual = genDiff(before, after);

  expect(actual).toBe(expected);
});
