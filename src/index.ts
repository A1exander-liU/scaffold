#!/usr/bin/env node

import figlet from 'figlet';
import { Command } from 'commander';
import { strings } from './util/strings.js';
import react from './commands/react/react.command.js';

const program = new Command();

console.log(figlet.textSync(strings.title));

program
  .version('1.0.0', '-v, --version', 'Get the current Scaffold version')
  .description('Personal CLI for creating project templates');

program.addCommand(react);

program.parseAsync(process.argv);

export default program;
