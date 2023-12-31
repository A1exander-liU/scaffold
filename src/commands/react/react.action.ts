import chalk from 'chalk';
import { getInfo } from './react.input.js';
import { execWithPromise } from '../../util/wrappers.js';
import task, { Task } from 'tasuku';
import path from 'path';
import {
  generateMuiFiles,
  generateTemplate,
  initializeGit,
} from '../../util/templater.js';

export async function handleReactTemplates(appName: string) {
  console.log(chalk.white('App Name:'), chalk.cyan(appName));
  const { usingMui, language } = await getInfo();

  const destination = path.join(process.cwd(), appName);

  task(`Scaffolding project in ${destination}`, async ({ task }) => {
    await task(`Generating initial template files`, async () => {
      await generateTemplate(`react-${language}-base`, destination);
    });

    await task('Initializing git repository', async () => {
      await initializeGit(appName);
    });

    if (usingMui) {
      await task('Setting up React MUI', async ({ task }) => {
        await task('Installing dependencies', async () => {
          await installMui(appName, language);
        });

        await task('Generating starter files', async () => {
          await generateBaseMui(destination, language);
        });
      });
    }
  });
}

async function installMui(appName: string, language: string) {
  await execWithPromise(
    `cd ${appName} && npm install @mui/material @emotion/react @emotion/styled @mui/icons-material js-cookie`,
  );

  if (language === 'ts') {
    await execWithPromise(
      `cd ${appName} && npm install --save @types/js-cookie`,
    );
  }
}

async function generateBaseMui(dest: string, language: string) {
  await generateMuiFiles(dest, language);
}
