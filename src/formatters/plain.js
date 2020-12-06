import _ from 'lodash';

const formatValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  if (_.isObject(value)) {
    return '[complex value]';
  }

  return value;
};

const plain = (tree) => {
  const iter = (nodes, path) => {
    const filteredNodes = nodes.filter((node) => node.status !== 'unchanged');

    return filteredNodes.map((node) => {
      const { name, value, status } = node;
      const pathName = `${path}${name}`;

      switch (status) {
        case 'added':
          return `Property '${pathName}' was added with value: ${formatValue(value)}`;
        case 'deleted':
          return `Property '${pathName}' was removed`;
        case 'updated':
          return `Property '${pathName}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(value)}`;
        case 'changed':
          return iter(node.children, `${pathName}.`);
        default:
          throw new Error();
      }
    }).join('\n');
  };

  return iter(tree, '');
};

export default plain;
