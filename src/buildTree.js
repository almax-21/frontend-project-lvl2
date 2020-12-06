import _ from 'lodash';

const buildTree = (data1, data2) => {
  const iter = (obj1, obj2, depth) => {
    const keys = _.union(_.keys(obj1), _.keys(obj2));
    const sortedKeys = keys.sort();

    return sortedKeys.flatMap((key) => {
      const basicProperties = { name: key, depth };

      if (!_.has(obj1, key)) {
        return { ...basicProperties, status: 'added', value: obj2[key] };
      }

      if (!_.has(obj2, key)) {
        return { ...basicProperties, status: 'deleted', value: obj1[key] };
      }

      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        return {
          ...basicProperties,
          status: 'changed',
          value: 'nested',
          children: iter(obj1[key], obj2[key], depth + 1),
        };
      }

      if (obj1[key] !== obj2[key]) {
        return {
          ...basicProperties,
          status: 'updated',
          value: obj2[key],
          oldValue: obj1[key],
        };
      }

      return { ...basicProperties, status: 'unchanged', value: obj2[key] };
    });
  };

  return iter(data1, data2, 1);
};

export default buildTree;
