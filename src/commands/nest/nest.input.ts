import { Separator, confirm, select } from '@inquirer/prompts';
import { getInitGit } from '../../util/input.js';
import { strings } from '../../util/strings.js';

const databaseProviders = [
  { name: 'PostgreSQL', value: 'postgresql' },
  { name: 'SQLite', value: 'sqlite' },
  { name: 'MySQL', value: 'mysql' },
  { name: 'SQL Server', value: 'sqlserver' },
  { name: 'MongoDB', value: 'mongodb' },
  { name: 'CockroachDB', value: 'cockroachdb' },
];

export async function getInfo() {
  const usingPrisma = await getUsingPrisma();
  let databaseProvider;
  if (usingPrisma) {
    databaseProvider = await selectDatabaseProvider();
  }
  const shouldInitGit = await getInitGit();

  return { usingPrisma, databaseProvider, shouldInitGit };
}

async function getUsingPrisma() {
  try {
    return await confirm({
      message: strings.nest.confirmPrisma,
      default: true,
    });
  } catch (err) {
    return;
  }
}

async function selectDatabaseProvider() {
  try {
    return await select({
      message: strings.nest.selectDatabase,
      choices: databaseProviders,
    });
  } catch (err) {
    return;
  }
}
