import fs from 'fs';
import path from 'path';
import getParser from './parsers.js';

const buildData = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const content = fs.readFileSync(fullPath, 'utf-8');
  const format = path.extname(filepath);
  const parse = getParser(format);

  return parse(content);
};

export default buildData;
