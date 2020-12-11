import _ from 'lodash';

const makeIndent = (depth) => ('  ').repeat(depth);

const formatValue = (obj, depth) => {
  const entries = Object.entries(obj);
  const parts = entries.flatMap((entrie) => {
    const [name, value] = entrie;
    const unchanged = `${makeIndent(depth * 2)}    ${name}: `;
    const value1 = _.isObject(value) ? '{' : value;
    const unchangedValue = `${unchanged}${value1}`;

    if (_.isObject(value)) {
      const innerValue = formatValue(value, depth + 1);
      return [unchangedValue, innerValue];
    }

    return unchangedValue;
  });

  parts.push(`${makeIndent(depth * 2)}}`);
  const result = parts.join('\n');

  return result;
};

const formatInStylish = (tree, depth = 1) => tree.reduce((acc, node, index) => {
  const { name, type } = node;
  const value = _.isObject(node.value) ? '{' : node.value;
  const indent = makeIndent(depth * 2);

  if (depth === 1 && index === 0) {
    acc.push('{');
  }

  if (type === 'added') {
    const added = `${indent.slice(0, -2)}+ ${name}: `;
    acc.push(`${added}${value}`);
  }

  if (type === 'deleted') {
    const deleted = `${indent.slice(0, -2)}- ${name}: `;
    acc.push(`${deleted}${value}`);
  }

  if (type === 'unchanged') {
    const unchanged = `${indent}${name}: `;
    acc.push(`${unchanged}${value}`);
  }

  if (type === 'nested') {
    const nested = `${indent}${name}: {`;
    const children = formatInStylish(node.children, depth + 1);
    acc.push(nested, children);
  }

  if (type === 'updated') {
    const deleted = `${indent.slice(0, -2)}- ${name}: `;
    const added = `${indent.slice(0, -2)}+ ${name}: `;

    if (_.isObject(node.replacedValue)) {
      const innerValue = formatValue(node.replacedValue, depth);
      acc.push(`${deleted}{`);
      acc.push(innerValue);
    } else {
      acc.push(`${deleted}${node.replacedValue}`);
    }
    acc.push(`${added}${value}`);
  }

  if (_.isObject(node.value)) {
    const innerValue = formatValue(node.value, depth);
    acc.push(innerValue);
  }

  if (index === tree.length - 1) {
    acc.push(`${indent.slice(0, -4)}}`);
  }

  return acc;
}, []).join('\n');

export default formatInStylish;
