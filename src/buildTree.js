import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));
  const sortedKeys = _.sortBy(keys);

  return sortedKeys.flatMap((key) => {
    if (!_.has(data1, key)) {
      return { name: key, type: 'added', value: data2[key] };
    }

    if (!_.has(data2, key)) {
      return { name: key, type: 'deleted', value: data1[key] };
    }

    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { name: key, type: 'nested', children: buildTree(data1[key], data2[key]) };
    }

    if (data1[key] !== data2[key]) {
      return {
        name: key,
        type: 'updated',
        value: data2[key],
        replacedValue: data1[key],
      };
    }

    return { name: key, type: 'unchanged', value: data2[key] };
  });
};

export default buildTree;
