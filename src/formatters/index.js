import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (format) => {
  switch (format) {
    case 'json':
      return json;
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    default:
      throw new Error(`Invalid format: ${format}`);
  }
};
