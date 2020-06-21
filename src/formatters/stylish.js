import _ from 'lodash';

const stringify = (value, spaces) => {
  if (_.isObject(value)) {
    const key = Object.keys(value);
    const objValue = Object.values(value);
    return `{\n ${spaces}     ${key}: ${objValue}\n${spaces}  }`;
  }
  return value;
};

export default (diff) => {
  const iter = (idiff, depth) => {
    const spaces = ' '.repeat(depth);
    const makeRender = idiff.map((node) => {
      switch (node.status) {
        case 'modified':
          return `${spaces}- ${node.name}: ${stringify(node.before, spaces)}\n${spaces}+ ${node.name}: ${stringify(node.after, spaces)}`;
        case 'removed':
          return `${spaces}- ${node.name}: ${stringify(node.value, spaces)}`;
        case 'added':
          return `${spaces}+ ${node.name}: ${stringify(node.value, spaces)}`;
        case 'unchanged':
          return `${spaces}  ${node.name}: ${stringify(node.value, spaces)}`;
        case 'parent':
          return `${spaces}  ${node.name}: {\n${iter(node.children, depth + 4)}\n${spaces}  }`;
        default:
          throw new Error(`Error! '${node.status}' is invalid`);
      }
    });
    return `${makeRender.join('\n')}`;
  };
  return `{\n${iter(diff, 2)}\n}`;
};
