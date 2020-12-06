#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .version('0.9.0')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const formatName = program.format;
    const diff = genDiff(filepath1, filepath2, formatName);
    console.log(diff);
  });

program.parse(process.argv);
