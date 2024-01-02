import chalk from 'chalk';
import { getInfo } from './nest.input.js';
import path from 'path';
import task from 'tasuku';
import {
  generatePrismaFiles,
  generateTemplate,
  initializeGit,
} from '../../util/templater.js';
import { execWithPromise } from '../../util/wrappers.js';
import { addIdentifierToDecoratorArray, addImport } from '../../util/ast.js';
import { ParserOptions } from '@babel/parser';
import fs from 'fs-extra';

export async function handleNestTemplates(appName: string) {
  console.log(chalk.white('App Name:'), chalk.cyan(appName));
  const { usingPrisma, datasourceProvider, shouldInitGit } = await getInfo();

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
            await initializePrisma(appName, datasourceProvider);
          } catch (err) {
            setError(err);
          }
        });

        await task('Generating starter files', async () => {
          try {
            await setupPrismaBase(destination);
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

async function initializePrisma(appName: string, datasourceProvider: string) {
  await execWithPromise(
    `cd ${appName} && npx prisma init --datasource-provider ${datasourceProvider}`,
  );
}

async function setupPrismaBase(dest: string) {
  await generatePrismaFiles(dest);

  const options: ParserOptions = {
    sourceType: 'module',
    plugins: ['typescript', 'decorators'],
  };

  const newImport = "import { PrismaModule } from './prisma/prisma.module'";

  let newContent = await addIdentifierToDecoratorArray(
    path.join(dest, 'src/app.module.ts'),
    options,
    'imports',
    'PrismaModule',
  );

  newContent = await addImport(newContent, options, newImport);

  await fs.writeFile(path.join(dest, 'src/app.module.ts'), newContent);
}
