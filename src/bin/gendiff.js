#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstconfig> <secondConfig>')
  .version('0.0.1')
  .option('-f, --format [type]', 'output format')
  .action((firstconfig, secondConfig) => {
    console.log(genDiff(firstconfig, secondConfig));
  })
  .parse(process.argv);
