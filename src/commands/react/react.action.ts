import chalk from 'chalk';
import { getInfo } from './react.input.js';
import { execWithPromise } from '../../util/wrappers.js';
import task from 'tasuku';
import path from 'path';
import { generateTemplate, initializeGit } from '../../util/templater.js';

export async function handleReactTemplates(appName: string) {
  console.log(chalk.white('App Name:'), chalk.cyan(appName));
  const { usingMui, language } = await getInfo();
  if (!usingMui) {
    return;
  }

  task(
    `Scaffolding project in ${path.join(process.cwd(), appName)}`,
    async ({ task }) => {
      await task(`Generating initial template files`, async () => {
        const destination = path.join(process.cwd(), appName);
        await generateTemplate(`react-${language}-base`, destination);
      });

      await task('Initializing git repository', async () => {
        await initializeGit(appName);
      });
    },
  );
}
