import chalk from 'chalk';
import { getInfo } from './react.input.js';
import { execWithPromise } from '../../util/wrappers.js';
import task from 'tasuku';
import path from 'path';

export async function handleReactTemplates(appName: string) {
  console.log(chalk.white('App Name:'), chalk.cyan(appName));
  const { usingMui, language } = await getInfo();
  if (!usingMui) {
    return;
  }
  // const current = import.meta.url.replace(/^file:\/\/\//, '');

  task(
    `Scaffolding project in ${path.join(process.cwd(), appName)}`,
    async ({ task }) => {
      await task(`Generating initial template files`, async () => {
        await execWithPromise(
          `npm create vite@latest ${appName} -- --template react${
            language === 'ts' ? '-ts' : ''
          }`,
        );
      });
    },
  );
}
