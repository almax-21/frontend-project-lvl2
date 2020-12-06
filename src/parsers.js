import yaml from 'js-yaml';

export default (format) => {
  if (format === '.json') {
    return JSON.parse;
  }

  if (format === '.yaml' || format === '.yml') {
    return yaml.safeLoad;
  }

  throw new Error(`Unexpected ${format} file format`);
};
