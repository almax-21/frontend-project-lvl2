import _ from 'lodash';

const makeIndent = (size, replacer = '  ') => replacer.repeat(size);

const spacesCount = 2;

const formatInnerValue = (value, depth) => {
  const iter = (currentValue, currentDepth) => {
    if (!_.isObject(currentValue)) {
      return currentValue.toString();
    }

    const indentSize = currentDepth * spacesCount;
    const currentIndent = makeIndent(indentSize + spacesCount);
    const bracketIndent = makeIndent(indentSize);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, currentDepth + 1)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, depth);
};

const formatInStylish = (tree) => {
  const iter = (nodes, depth) => {
    const indentSize = depth * spacesCount;
    const indent = makeIndent(indentSize);
    const signIndent = indent.slice(0, -2);
    const bracketIndent = makeIndent(indentSize - spacesCount);

    const lines = nodes.map((node) => {
      const { name, type } = node;
      const value = _.isObject(node.value) ? formatInnerValue(node.value, depth) : node.value;

      if (type === 'added') {
        return `${signIndent}+ ${name}: ${value}`;
      }

      if (type === 'deleted') {
        return `${signIndent}- ${name}: ${value}`;
      }

      if (type === 'updated') {
        const replacedValue = _.isObject(node.replacedValue)
          ? formatInnerValue(node.replacedValue, depth)
          : node.replacedValue;

        return [
          `${signIndent}- ${name}: ${replacedValue}`,
          `${signIndent}+ ${name}: ${value}`,
        ].join('\n');
      }

      if (type === 'nested') {
        return `${indent}${name}: ${iter(node.children, depth + 1)}`;
      }

      return `${indent}${name}: ${value}`;
    });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(tree, 1);
};

export default formatInStylish;
