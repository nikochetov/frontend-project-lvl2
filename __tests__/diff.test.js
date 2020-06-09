import fs from 'fs';
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

test.each(table)(
  'compare 2 files(%s, %s)', (type, format) => {
    const before = `./__fixtures__/before.${type}`;
    const after = `./__fixtures__/after.${type}`;
    const result = fs.readFileSync(`./__fixtures__/${format}.txt`, 'utf-8');
    expect(genDiff(before, after, format)).toEqual(result);
  },
);