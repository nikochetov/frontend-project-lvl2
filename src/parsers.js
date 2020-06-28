import yaml from 'js-yaml';
import ini from 'ini';

export default (extension, data) => {
  switch (extension) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.safeLoad(data);
    case '.ini':
      return ini.parse(data);
    default:
      throw new Error(`Invalid extension: ${extension}`);
  }
};
