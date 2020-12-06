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

const formatTree = (tree) => tree.reduce((acc, node, index) => {
  const { name, status, depth } = node;
  const value = _.isObject(node.value) ? '{' : node.value;
  const indent = makeIndent(depth * 2);

  if (depth === 1 && index === 0) {
    acc.push('{');
  }

  if (status === 'added') {
    const added = `${indent.slice(0, -2)}+ ${name}: `;
    acc.push(`${added}${value}`);
  }

  if (status === 'deleted') {
    const deleted = `${indent.slice(0, -2)}- ${name}: `;
    acc.push(`${deleted}${value}`);
  }

  if (status === 'unchanged') {
    const unchanged = `${indent}${name}: `;
    acc.push(`${unchanged}${value}`);
  }

  if (status === 'changed') {
    const changed = `${indent}${name}: {`;
    const children = formatTree(node.children);
    acc.push(changed, children);
  }

  if (status === 'updated') {
    const deleted = `${indent.slice(0, -2)}- ${name}: `;
    const added = `${indent.slice(0, -2)}+ ${name}: `;

    if (_.isObject(node.oldValue)) {
      const innerValue = formatValue(node.oldValue, depth);
      acc.push(`${deleted}{`);
      acc.push(innerValue);
    } else {
      acc.push(`${deleted}${node.oldValue}`);
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

export default formatTree;
