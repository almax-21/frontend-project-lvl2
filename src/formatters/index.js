import formatInStylish from './stylish.js';
import formatInPlain from './plain.js';
import formatInJson from './json.js';

const format = (formatName, tree) => {
  switch (formatName) {
    case 'stylish':
      return formatInStylish(tree);
    case 'plain':
      return formatInPlain(tree);
    case 'json':
      return formatInJson(tree);
    default:
      throw new Error(`Unexpected '${formatName}' formatter name`);
  }
};

export default format;
