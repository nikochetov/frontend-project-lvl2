// import genDiff from '../genDiff.js';
// import _ from 'lodash';

export default (diff) => {
  const iter = (idiff, depth) => {
    const spaces = ' '.repeat(depth);
    const stringify = (value) => {
      if (typeof value === 'object') {
        const key = Object.keys(value);
        const objValue = Object.values(value);
        return `{\n ${spaces}     ${key}: ${objValue}\n${spaces}  }`;
      }
      return value;
    };
    const rendering = idiff.reduce((prev, current) => {
      if (current.type === 'node') {
        return [
          ...prev, `${spaces}  ${current.name}: {\n${iter(current.children, depth + 4)}\n${spaces}  }`,
        ];
      }
      switch (current.status) {
        case 'modified':
          return [
            ...prev, `${spaces}- ${current.name}: ${stringify(current.before)}\n${spaces}+ ${current.name}: ${stringify(current.after)}`,
          ];
        case 'removed':
          return [...prev, `${spaces}- ${current.name}: ${stringify(current.value)}`];
        case 'added':
          return [...prev, `${spaces}+ ${current.name}: ${stringify(current.value)}`];
        case 'unchanged':
          return [...prev, `${spaces}  ${current.name}: ${stringify(current.value)}`];
        default:
          return [...prev];
      }
    }, []);
    return `${rendering.join('\n')}`;
  };
  return `{\n${iter(diff, 2)}\n}`;
};
