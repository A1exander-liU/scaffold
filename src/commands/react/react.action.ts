import chalk from 'chalk';
import { getInfo } from './react.input.js';
import { execWithPromise } from '../../util/wrappers.js';
import task from 'tasuku';

export async function handleReactTemplates(appName: string) {
  console.log(chalk.white('App Name:'), chalk.cyan(appName));
  const { usingMui, language } = await getInfo();
  if (!usingMui) {
    return;
  }
  // const current = import.meta.url.replace(/^file:\/\/\//, '');

  console.log(process.cwd());

  if (language === 'ts') {
    task(`Scaffolding project`, async ({ setTitle }) => {
      await execWithPromise(
        `npm create vite@latest ${appName} -- --template react-ts`,
      );
      setTitle('Scaffoling project complete');
    });
  }
}
