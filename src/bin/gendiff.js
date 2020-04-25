#!/usr/bin/env node

import { program } from 'commander';

program
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstconfig> <secondConfig>')
  .version('0.0.1')
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);
