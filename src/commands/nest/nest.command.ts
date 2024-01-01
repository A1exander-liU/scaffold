import { Command } from 'commander';
import { handleNestTemplates } from './nest.action.js';

const nest = new Command('nest');
nest
  .description('Creates a NestJS template')
  .argument('<name>', 'name of your application')
  .action((appName: string) => {
    handleNestTemplates(appName);
  });

export default nest;
