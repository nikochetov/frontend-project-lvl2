import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (format) => {
  let render;
  if (format === 'json') {
    render = json;
  } else if (format === 'stylish') {
    render = stylish;
  } else if (format === 'plain') {
    render = plain;
  }
  return render;
};
