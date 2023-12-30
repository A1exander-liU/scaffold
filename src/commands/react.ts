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
    const noMui = options.NoMui;
    const useJs = options.js;
    console.log(chalk.blue(`Created react app: ${appName}`));
    console.log(chalk.white(`Using MUI: ${!noMui}`));
    console.log(chalk.white(`Using ${useJs ? 'JS' : 'TS'}`));
  });

export default react;
