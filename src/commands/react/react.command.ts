import { Command } from 'commander';
import { handleReactTemplates } from './react.action.js';

const react = new Command('react');
react
  .description('Creates react-ts template using vite with React MUI')
  .argument('<name>', 'name of your application')
  .action((appName: string) => {
    // callback(argument, options) note that option names will be camel cased
    handleReactTemplates(appName);
  });

export default react;
