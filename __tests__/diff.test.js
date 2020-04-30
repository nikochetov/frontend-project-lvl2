import genDiff from '../src/index.js';
import path from 'path';
import fs from 'fs';

describe('testing diff', () => {
  test('testing gendiff for JSON files', () => {
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
  test('testing gendiff for YAML files', () => {
    const afterPath = path.join(__dirname, '..', '__fixtures__', 'after.yml');
    const beforePath = path.join(__dirname, '..', '__fixtures__', 'before.yml');
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
});
