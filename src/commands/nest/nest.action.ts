import chalk from 'chalk';
import { getInfo } from './nest.input.js';
import path from 'path';
import task from 'tasuku';
import { generateTemplate, initializeGit } from '../../util/templater.js';
import { execWithPromise } from '../../util/wrappers.js';

export async function handleNestTemplates(appName: string) {
  console.log(chalk.white('App Name:'), chalk.cyan(appName));
  const { usingPrisma, databaseProvider, shouldInitGit } = await getInfo();

  const destination = path.join(process.cwd(), appName);

  task(`Scaffolding project in ${destination}`, async ({ task, setError }) => {
    await task('Generating initial template files', async () => {
      try {
        await generateTemplate('nest-base', destination);
      } catch (err) {
        setError(err);
      }
    });

    if (shouldInitGit) {
      await task('Initializing git repository', async () => {
        await initializeGit(appName);
      });
    }

    if (usingPrisma) {
      await task('Setting up Prisma', async ({ task }) => {
        await task('Installing dependencies', async () => {
          try {
            await installPrisma(appName);
          } catch (err) {
            setError(err);
          }
        });

        await task('Initializing Prisma', async () => {
          try {
            await initializePrisma(appName, databaseProvider);
          } catch (err) {
            setError(err);
          }
        });
      });
    }
  });
}

async function installPrisma(appName: string) {
  await execWithPromise(
    `cd ${appName} && npm install prisma --save-dev && npm install @prisma/client`,
  );
}

async function initializePrisma(appName: string, databaseProvider: string) {
  await execWithPromise(
    `cd ${appName} && npx prisma init --database-provider ${databaseProvider}`,
  );
}
