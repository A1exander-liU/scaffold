import chalk from 'chalk';
import { getInfo } from './react.input.js';
import { execWithPromise } from '../../util/wrappers.js';
import task from 'tasuku';
import path from 'path';
import {
  generateMuiFiles,
  generateTemplate,
  initializeGit,
} from '../../util/templater.js';

export async function handleReactTemplates(appName: string) {
  console.log(chalk.white('App Name:'), chalk.cyan(appName));
  const { usingMui, language, shouldInitGit } = await getInfo();

  const destination = path.join(process.cwd(), appName);

  task(`Scaffolding project in ${destination}`, async ({ task, setError }) => {
    await task(`Generating initial template files`, async () => {
      try {
        await generateTemplate(`react-${language}-base`, destination);
      } catch (err) {
        setError(err);
      }
    });

    if (shouldInitGit) {
      await task('Initializing git repository', async () => {
        await initializeGit(appName);
      });
    }

    if (usingMui) {
      await task('Setting up React MUI', async ({ task }) => {
        await task('Installing dependencies', async ({ setError }) => {
          try {
            await installMui(appName, language);
          } catch (err) {
            setError(err);
          }
        });

        await task('Generating starter files', async ({ setError }) => {
          try {
            await generateBaseMui(destination, language);
          } catch (err) {
            setError(err);
          }
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
