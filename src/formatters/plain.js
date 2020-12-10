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
    const filteredNodes = nodes.filter((node) => node.type !== 'unchanged');

    return filteredNodes.map((node) => {
      const { name, value, type } = node;
      const pathName = `${path}${name}`;

      switch (type) {
        case 'added':
          return `Property '${pathName}' was added with value: ${formatValue(value)}`;
        case 'deleted':
          return `Property '${pathName}' was removed`;
        case 'updated':
          return `Property '${pathName}' was updated. From ${formatValue(node.replacedValue)} to ${formatValue(value)}`;
        case 'nested':
          return iter(node.children, `${pathName}.`);
        default:
          throw new Error(`Unexpected ${type} node type`);
      }
    }).join('\n');
  };

  return iter(tree, '');
};

export default plain;
