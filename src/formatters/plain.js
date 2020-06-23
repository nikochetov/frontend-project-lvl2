import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return `'${value}'`;
};

export default (diff) => {
  const iter = (idiff, path) => {
    const makeRender = idiff
      .filter((node) => node.status !== 'unchanged')
      .map((node) => {
        switch (node.status) {
          case 'modified':
            return `Property '${path}${node.name}' was changed from ${stringify(node.before)} to ${stringify(node.after)}`;
          case 'removed':
            return `Property '${path}${node.name}' was deleted`;
          case 'added':
            return `Property '${path}${node.name}' was added with value: ${stringify(node.value)}`;
          case 'parent':
            return iter(node.children, `${path}${node.name}.`);
          default:
            throw new Error(`Error! '${node.status}' is invalid for node ${node.name}`);
        }
      }, []);
    return makeRender.join('\n');
  };
  return iter(diff, '');
};
