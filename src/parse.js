import yaml from 'js-yaml';

const parse = (content, format) => {
  if (format === 'json') {
    return JSON.parse(content);
  }

  if (format === 'yaml' || format === 'yml') {
    return yaml.safeLoad(content);
  }

  throw new Error(`Unexpected ${format} format`);
};

export default parse;
