#!/usr/bin/env node

import pkg from 'commander';
import genDiff from '../index.js';

const { program } = pkg;

program
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .version('0.0.1')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((firstconfig, secondConfig) => {
    console.log(genDiff(firstconfig, secondConfig, program.format));
  })
  .parse(process.argv);
