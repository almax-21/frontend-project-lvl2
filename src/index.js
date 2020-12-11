import fs from 'fs';
import path from 'path';
import parse from './parse.js';
import buildTree from './buildTree.js';
import format from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const content1 = fs.readFileSync(filepath1, 'utf-8');
  const format1 = path.extname(filepath1);
  const data1 = parse(content1, format1);

  const content2 = fs.readFileSync(filepath2, 'utf-8');
  const format2 = path.extname(filepath2);
  const data2 = parse(content2, format2);

  const diffTree = buildTree(data1, data2);
  const formattedDiff = format(formatName, diffTree);

  return formattedDiff;
};

export default genDiff;
