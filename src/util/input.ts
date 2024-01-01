import { confirm } from '@inquirer/prompts';
import { strings } from './strings.js';

export async function getInitGit() {
  try {
    return await confirm({
      message: strings.common.confirmInitGit,
      default: true,
    });
  } catch (err) {
    return;
  }
}
