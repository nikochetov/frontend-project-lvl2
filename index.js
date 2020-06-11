import genDiff from './src/genDiff.js';
import parser from './src/parsers.js';
import render from './src/formatters/index.js';

export default (path1, path2, format) => {
  const [beforeFileData, afterFileData] = parser(path1, path2);
  const diff = genDiff(beforeFileData, afterFileData);
  const rendering = render(format);
  return rendering(diff);
};
