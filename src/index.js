import _ from 'lodash';
import buildData from './buildData.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = buildData(filepath1);
  const data2 = buildData(filepath2);

  const keys = _.union(_.keys(data1), _.keys(data2));
  const sortedKeys = keys.sort();

  const diffColl = sortedKeys.reduce((acc, key) => {
    if (!_.has(data1, key)) {
      const addedKey = `+ ${key}: ${data2[key]}`;
      acc.push(addedKey);
    } else if (!_.has(data2, key)) {
      const deletedKey = `- ${key}: ${data1[key]}`;
      acc.push(deletedKey);
    } else if (data1[key] !== data2[key]) {
      const originalKey = `- ${key}: ${data1[key]}`;
      const changedKey = `+ ${key}: ${data2[key]}`;
      acc.push(originalKey, changedKey);
    } else {
      const unchangedKey = `  ${key}: ${data2[key]}`;
      acc.push(unchangedKey);
    }

    return acc;
  }, []);

  const diffString = diffColl.join('\n');

  return `{\n${diffString}\n}`;
};

export default genDiff;
