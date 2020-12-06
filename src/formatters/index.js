import stylish from './stylish.js';
import plain from './plain.js';

const getFormatter = (formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    default:
      throw new Error(`Unexpected '${formatName}' formatter name`);
  }
};

export default getFormatter;
