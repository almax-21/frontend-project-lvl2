import buildData from './buildData.js';
import buildTree from './buildTree.js';
import getFormatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = buildData(filepath1);
  const data2 = buildData(filepath2);
  const tree = buildTree(data1, data2);
  const format = getFormatter(formatName);

  return format(tree);
};

export default genDiff;
