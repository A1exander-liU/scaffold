import chalk from 'chalk';
import { getInfo } from './react.input.js';

export async function handleReactTemplates(appName: string) {
  console.log(chalk.white('App Name:'), chalk.cyan(appName));
  const { usingMui, language } = await getInfo();
  console.log(chalk.white(usingMui));
  console.log(chalk.white(language));
}
