import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import path from 'path';

export default (path1, path2) => {
  const formatOfPath1 = path.extname(path1);
  const formatOfPath2 = path.extname(path2);
  let parse;
  if (formatOfPath1 && formatOfPath2 === '.json') {
    parse = JSON.parse;
  } else if (formatOfPath1 && formatOfPath2 === '.yml') {
    parse = yaml.safeLoad;
  } else if (formatOfPath1 && formatOfPath2 === '.ini') {
    parse = ini.parse;
  }
  const firstFileData = parse(fs.readFileSync(path1, 'utf-8'));
  const secondFileData = parse(fs.readFileSync(path2, 'utf-8'));
  return [firstFileData, secondFileData];
};
