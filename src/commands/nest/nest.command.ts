import { Command } from 'commander';

const nest = new Command('nest');
nest
  .description('Creates a NestJS template')
  .argument('<name>', 'name of your application')
  .action((appName: string) => {});

export default nest;
