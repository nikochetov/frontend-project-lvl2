export default (diff) => {
  const iter = (idiff, path) => {
    const stringify = (value) => {
      if (typeof value === 'object') {
        return '[complex value]';
      }
      return `'${value}'`;
    };
    const rendering = idiff.reduce((prev, current) => {
      if (current.type === 'node') {
        return [...prev, iter(current.children, `${path}${current.name}.`)];
      }
      switch (current.status) {
        case 'modified':
          return [...prev, `Property '${path}${current.name}' was changed from ${stringify(current.before)} to ${stringify(current.after)}`];
        case 'removed':
          return [...prev, `Property '${path}${current.name}' was deleted`];
        case 'added':
          return [...prev, `Property '${path}${current.name}' was added with value: ${stringify(current.value)}`];
        default:
          return [...prev];
      }
    }, []);
    return rendering.join('\n');
  };
  return iter(diff, '');
};
