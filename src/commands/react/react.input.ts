import { confirm, select } from '@inquirer/prompts';
import { strings } from '../../util/strings.js';

export async function getInfo() {
  const language = await getLanguage();
  const usingMui = await getUsingMui();
  const shouldInitGit = await getInitGit();

  return { language, usingMui, shouldInitGit };
}

async function getUsingMui() {
  try {
    return await confirm({ message: strings.react.confirmMui, default: true });
  } catch (err) {
    return;
  }
}

async function getLanguage() {
  try {
    return await select({
      message: strings.react.selectLanguage,
      choices: [
        {
          name: 'TS',
          value: 'ts',
        },
        {
          name: 'JS',
          value: 'js',
        },
      ],
    });
  } catch (err) {
    return;
  }
}

async function getInitGit() {
  try {
    return await confirm({
      message: strings.react.confirmInitGit,
      default: true,
    });
  } catch (err) {
    return;
  }
}
