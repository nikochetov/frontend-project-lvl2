import fs from 'fs';
import _ from 'lodash';
import parser from './parsers.js';
import render from './formatters/index.js';

const genDiff = (path1, path2, format) => {
  const parse = parser(path1);
  const rendering = render(format);
  const firstFileData = parse(fs.readFileSync(path1, 'utf-8'));
  const secondFileData = parse(fs.readFileSync(path2, 'utf-8'));
  const iter = (beforeFile, afterFile) => {
    const beforeFileKeys = Object.keys(beforeFile);
    const afterFileKeys = Object.keys(afterFile);
    const commonKeys = _.union(beforeFileKeys, afterFileKeys);
    const buildDiff = commonKeys.reduce((prev, current) => {
      const hasChildBoth = (typeof beforeFile[current] === 'object') && (typeof afterFile[current] === 'object');
      if (_.has(beforeFile, current) && _.has(afterFile, current)) {
        if (_.isEqual(beforeFile[current], afterFile[current])) {
          return [...prev, { name: current, status: 'unchanged', value: afterFile[current] }];
        }
        if (!_.isEqual(beforeFile[current], afterFile[current]) && !hasChildBoth) {
          return [...prev, {
            name: current, status: 'modified', before: beforeFile[current], after: afterFile[current],
          }];
        }
        if (hasChildBoth) {
          return [...prev, {
            name: current, type: 'node', children: iter(beforeFile[current], afterFile[current], prev),
          }];
        }
      }
      if (_.has(beforeFile, current) && !_.has(afterFile, current)) {
        return [...prev, { name: current, status: 'removed', value: beforeFile[current] }];
      }
      return [...prev, { name: current, status: 'added', value: afterFile[current] }];
    }, []);
    return buildDiff;
  };
  return rendering(iter(firstFileData, secondFileData));
};

export default genDiff;
