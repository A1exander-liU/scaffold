import { Command } from 'commander';
import { ReactOptions } from '../../types.js';
import { handleReactTemplates } from './react.action.js';

const react = new Command('react');
react
  .description('Creates react-ts template using vite with React MUI')
  .argument('<name>', 'name of your application')
  .option('--no-mui,', 'add MUI library', false) // with --mui, -m will generate option name of mui as well
  .option('--js', 'Use JS intead of TS', false)
  .action((appName: string, options: ReactOptions) => {
    // callback(argument, options) note that option names will be camel cased
    handleReactTemplates(appName, options);
  });

export default react;
