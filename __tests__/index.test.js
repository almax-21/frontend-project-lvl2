import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('stylish formatter test', () => {
  const before = getFixturePath('before.yaml');
  const after = getFixturePath('after.json');
  const actual = genDiff(before, after);
  const expected = readFile('expected.stylish.txt');

  expect(actual).toBe(expected);
});

test('plain formatter test', () => {
  const before = getFixturePath('before.json');
  const after = getFixturePath('after.json');
  const actual = genDiff(before, after, 'plain');
  const expected = readFile('expected.plain.txt');

  expect(actual).toBe(expected);
});

test('json formatter test', () => {
  const before = getFixturePath('before.yaml');
  const after = getFixturePath('after.yml');
  const actual = genDiff(before, after, 'json');
  const expected = readFile('expected.json.txt');

  expect(actual).toBe(expected);
});
