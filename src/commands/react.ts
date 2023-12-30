import { Command } from 'commander';
import { ReactOptions } from '../types.js';
import chalk from 'chalk';

const react = new Command('react');
react
  .description('Creates react-ts template using vite with React MUI')
  .argument('<name>', 'name of your application')
  .option('--no-mui,', 'add MUI library', false) // with --mui, -m will generate option name of mui as well
  .option('--js', 'Use JS intead of TS', false)
  .action((appName: string, options: ReactOptions) => {
    // callback(argument, options) note that option names will be camel cased
    console.log(
      chalk.white(
        `Created react app => ${process.cwd()}\\${chalk.blue(appName)}`,
      ),
    );
    console.log();
    console.log(chalk.white('Starting steps:'));
    console.log(chalk.white(`1. cd ${appName}`));
    console.log(chalk.white(`1. npm install`));
    console.log(chalk.white(`1. npm run dev`));
  });

export default react;
