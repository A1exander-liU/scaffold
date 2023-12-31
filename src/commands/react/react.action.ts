import chalk from 'chalk';
import { getInfo } from './react.input.js';
import { execWithPromise } from '../../util/wrappers.js';
import task, { Task } from 'tasuku';
import path from 'path';
import { generateTemplate, initializeGit } from '../../util/templater.js';
import figlet from 'figlet';

export async function handleReactTemplates(appName: string) {
  console.log(chalk.white('App Name:'), chalk.cyan(appName));
  const { usingMui, language } = await getInfo();

  const destination = path.join(process.cwd(), appName);

  task(
    `Scaffolding project in ${path.join(process.cwd(), appName)}`,
    async ({ task }) => {
      await task(`Generating initial template files`, async () => {
        await generateTemplate(`react-${language}-base`, destination);
      });

      await task('Initializing git repository', async () => {
        await initializeGit(appName);
      });

      if (usingMui) {
        await task('Setting up React MUI', async ({ task }) => {
          await task('Installing dependencies', async () => {
            await installMui(appName);
          });
        });
      }
    },
  );
}

async function installMui(appName: string) {
  await execWithPromise(
    `cd ${appName} && npm install @mui/material @emotion/react @emotion/styled @mui/icons-material`,
  );
}
