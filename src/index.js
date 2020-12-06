import buildData from './buildData.js';
import buildTree from './buildTree.js';
import formatTree from './formatTree.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = buildData(filepath1);
  const data2 = buildData(filepath2);
  const tree = buildTree(data1, data2);

  return formatTree(tree);
};

export default genDiff;
