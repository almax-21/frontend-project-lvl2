import fs from 'fs';
import path from 'path';

const getData = (filepath) => {
  const json = fs.readFileSync(path.resolve(process.cwd(), filepath));

  return JSON.parse(json);
};

export default getData;
