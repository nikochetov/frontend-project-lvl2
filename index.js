import path from 'path';
import fs from 'fs';
import genDiff from './src/genDiff.js';
import getParser from './src/parsers.js';
import getRender from './src/formatters/index.js';

const readFile = (pathToFile) => {
  const fullPath = path.resolve(process.cwd(), pathToFile);
  const fileData = fs.readFileSync(fullPath, 'utf-8');
  return fileData;
};
const makeParsing = (pathToFile) => getParser(pathToFile, readFile(pathToFile));

export default (path1, path2, format) => {
  const beforeFileData = makeParsing(path1);
  const afterFileData = makeParsing(path2);
  const diff = genDiff(beforeFileData, afterFileData);
  const makeRender = getRender(format);
  return makeRender(diff);
};
