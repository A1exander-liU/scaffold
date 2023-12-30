import fs from 'fs-extra';
import path from 'path';
import { recursiveCopy } from './fileio.js';
import { execWithPromise } from './wrappers.js';

export const excluded = ['node_modules'];

export async function generateTemplate(template: string, dest: string) {
  const current = import.meta.url.replace(/^file:\/\/\//, '');
  const templatePath = path.join(current, '../../../src/templates', template);
  await recursiveCopy(templatePath, dest, { excluded });
}

export async function initializeGit(appName: string) {
  await execWithPromise(`cd ${appName} && git init`);
}
