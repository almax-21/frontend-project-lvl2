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

const formatInPlain = (tree) => {
  const iter = (nodes, ancestors) => nodes.flatMap((node) => {
    const { name, value, type } = node;
    const ancestryLine = [...ancestors, name].join('.');

    switch (type) {
      case 'added':
        return `Property '${ancestryLine}' was added with value: ${formatValue(value)}`;
      case 'deleted':
        return `Property '${ancestryLine}' was removed`;
      case 'updated':
        return `Property '${ancestryLine}' was updated. From ${formatValue(node.replacedValue)} to ${formatValue(value)}`;
      case 'nested':
        return iter(node.children, [...ancestors, name]);
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unexpected ${type} node type`);
    }
  }).join('\n');

  return iter(tree, []);
};

export default formatInPlain;
