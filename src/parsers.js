import yaml from 'js-yaml';
import ini from 'ini';
import path from 'path';

export default (pathToFile) => {
  const format = path.extname(pathToFile);
  let parse;
  if (format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml') {
    parse = yaml.safeLoad;
  } else if (format === '.ini') {
    parse = ini.parse;
  }
  return parse;
};
