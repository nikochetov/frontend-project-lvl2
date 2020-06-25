import _ from 'lodash';

export default (beforeData, afterData) => {
  const beforeDataKeys = Object.keys(beforeData);
  const afterDataKeys = Object.keys(afterData);
  const commonKeys = _.union(beforeDataKeys, afterDataKeys);
  const buildDiff = commonKeys.map((key) => {
    const hasChildBoth = _.isObject(beforeData[key]) && _.isObject(afterData[key]);
    if (!_.has(afterData, key)) {
      return { name: key, status: 'removed', value: beforeData[key] };
    }
    if (!_.has(beforeData, key)) {
      return { name: key, status: 'added', value: afterData[key] };
    }
    if (hasChildBoth) {
      return {
        name: key, status: 'parent', children: genDiff(beforeData[key], afterData[key]),
      };
    }
    if (beforeData[key] !== afterData[key]) {
      return {
        name: key, status: 'modified', valueBefore: beforeData[key], valueAfter: afterData[key],
      };
    }
    return { name: key, status: 'unchanged', value: afterData[key] };
  });
  return buildDiff;
};
