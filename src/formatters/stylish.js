import _ from 'lodash';

const makeIndent = (size) => ('  ').repeat(size);

const spacesCount = 2;

const formatValue = (value, depth) => {
  const iter = (currentValue, currentDepth) => {
    if (_.isArray(currentValue)) {
      return `[${currentValue}]`;
    }

    if (!_.isPlainObject(currentValue)) {
      return currentValue;
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

    const lines = nodes.map(({
      name,
      type,
      value,
      children,
      replacedValue,
    }) => {
      const formattedValue = formatValue(value, depth);

      switch (type) {
        case 'added':
          return `${signIndent}+ ${name}: ${formattedValue}`;
        case 'deleted':
          return `${signIndent}- ${name}: ${formattedValue}`;
        case 'updated':
          return [
            `${signIndent}- ${name}: ${formatValue(replacedValue, depth)}`,
            `${signIndent}+ ${name}: ${formattedValue}`,
          ].join('\n');
        case 'nested':
          return `${indent}${name}: ${iter(children, depth + 1)}`;
        case 'unchanged':
          return `${indent}${name}: ${formattedValue}`;
        default:
          throw new Error(`Unexpected ${type} node type`);
      }
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
