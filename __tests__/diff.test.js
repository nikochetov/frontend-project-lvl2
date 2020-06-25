import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const table = [
  ['json', 'stylish'],
  ['json', 'plain'],
  ['json', 'json'],
  ['yml', 'stylish'],
  ['yml', 'plain'],
  ['yml', 'json'],
  ['ini', 'stylish'],
  ['ini', 'plain'],
  ['ini', 'json'],
];

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test.each(table)(
  'compare 2 files(%s, %s)', (type, format) => {
    const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
    const before = getFixturePath(`before.${type}`);
    const after = getFixturePath(`after.${type}`);
    const result = readFile(`${format}.txt`);
    expect(genDiff(before, after, format)).toEqual(result);
  },
);
