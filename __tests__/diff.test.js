import genDiff from '../src/index.js';
import path from 'path';
import fs from 'fs';

test('should work', () => {
  const afterPath = path.join(__dirname, '..', '__fixtures__', 'after.json');
  const beforePath = path.join(__dirname, '..', '__fixtures__', 'before.json');
  const expected = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`
  expect(genDiff(beforePath, afterPath)).toEqual(expected);
});
