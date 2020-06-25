import _ from 'lodash';

const genDiff = (beforeFile, afterFile) => {
  const beforeFileKeys = Object.keys(beforeFile);
  const afterFileKeys = Object.keys(afterFile);
  const commonKeys = _.union(beforeFileKeys, afterFileKeys);
  const buildDiff = commonKeys.map((key) => {
    const hasChildBoth = _.isObject(beforeFile[key]) && _.isObject(afterFile[key]);
    if (!_.has(afterFile, key)) {
      return { name: key, status: 'removed', value: beforeFile[key] };
    }
    if (!_.has(beforeFile, key)) {
      return { name: key, status: 'added', value: afterFile[key] };
    }
    if (hasChildBoth) {
      return {
        name: key, status: 'parent', children: genDiff(beforeFile[key], afterFile[key]),
      };
    }
    if (beforeFile[key] !== afterFile[key]) {
      return {
        name: key, status: 'modified', before: beforeFile[key], after: afterFile[key],
      };
    }
    return { name: key, status: 'unchanged', value: afterFile[key] };
  });
  return buildDiff;
};

export default genDiff;
