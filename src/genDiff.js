import _ from 'lodash';

const genDiff = (beforeFile, afterFile) => {
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
          name: current, type: 'node', children: genDiff(beforeFile[current], afterFile[current]),
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

export default genDiff;
