import chalk from 'chalk';
import { getInfo } from './nest.input.js';
import path from 'path';

export async function handleNestTemplates(appName: string) {
  console.log(chalk.white('App Name:'), chalk.cyan(appName));
  const { usingPrisma, databaseProvider, shouldInitGit } = await getInfo();

  const destination = path.join(process.cwd(), appName);
}
