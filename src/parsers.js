import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  yml: yaml.safeLoad,
};

export default (content, format) => parsers[format](content);
