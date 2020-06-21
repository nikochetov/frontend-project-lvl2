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
    const rendering = idiff.map((node) => {
      switch (node.status) {
        case 'modified':
          return `${spaces}- ${node.name}: ${stringify(node.before)}\n${spaces}+ ${node.name}: ${stringify(node.after)}`;
        case 'removed':
          return `${spaces}- ${node.name}: ${stringify(node.value)}`;
        case 'added':
          return `${spaces}+ ${node.name}: ${stringify(node.value)}`;
        case 'unchanged':
          return `${spaces}  ${node.name}: ${stringify(node.value)}`;
        case 'parent':
          return `${spaces}  ${node.name}: {\n${iter(node.children, depth + 4)}\n${spaces}  }`;
        default:
          throw new Error(`Error! '${node.status}' is invalid`);
      }
    }, []);
    return `${rendering.join('\n')}`;
  };
  return `{\n${iter(diff, 2)}\n}`;
};
