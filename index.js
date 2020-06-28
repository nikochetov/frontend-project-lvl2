import path from 'path';
import fs from 'fs';
import genDiff from './src/genDiff.js';
import parse from './src/parsers.js';
import getRender from './src/formatters/index.js';

const readFile = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  const fileData = fs.readFileSync(fullPath, 'utf-8');
  return fileData;
};
const getFileExtension = (filePath) => path.extname(filePath);
const getParsedData = (filePath) => parse(getFileExtension(filePath), readFile(filePath));

export default (path1, path2, format) => {
  const beforeFileData = getParsedData(path1);
  const afterFileData = getParsedData(path2);
  const diff = genDiff(beforeFileData, afterFileData);
  const render = getRender(format);
  return render(diff);
};
