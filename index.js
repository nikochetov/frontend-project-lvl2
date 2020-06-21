import path from 'path';
import fs from 'fs';
import genDiff from './src/genDiff.js';
import toParse from './src/parsers.js';
import render from './src/formatters/index.js';

const readFile = (pathToFile) => {
  const fullPath = path.resolve(process.cwd(), pathToFile);
  const fileData = fs.readFileSync(fullPath, 'utf-8');
  return fileData;
};
const parsedFileData = (pathToFile) => toParse(pathToFile, readFile(pathToFile));

export default (path1, path2, format) => {
  const beforeFileData = parsedFileData(path1);
  const afterFileData = parsedFileData(path2);
  const diff = genDiff(beforeFileData, afterFileData);
  const doRender = render(format);
  return doRender(diff);
};
