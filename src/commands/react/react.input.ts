import { confirm, select } from '@inquirer/prompts';
import { strings } from '../../strings.js';

export async function getInfo() {
  const usingMui = await getUsingMui();
  const language = await getLanguage();

  return { usingMui, language };
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
