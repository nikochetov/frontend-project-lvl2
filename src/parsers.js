// import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import path from 'path';

export default (pathToFile, data) => {
  const format = path.extname(pathToFile);
  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.safeLoad(data);
    case '.ini':
      return ini.parse(data);
    default:
      throw new Error(`Invalid format: ${format}`);
  }
};
