import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormatter = (formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    case 'json':
      return json;
    default:
      throw new Error(`Unexpected '${formatName}' formatter name`);
  }
};

export default getFormatter;
