import fs from 'fs-extra';
import path from 'path';
import { recursiveCopy } from './fileio.js';
import { execWithPromise } from './wrappers.js';

export const excluded = ['node_modules'];

function templatePath() {
  const current = import.meta.url.replace(/^file:\/\/\//, '');
  const templatePath = path.join(current, '../../../src/templates');
  return templatePath;
}

export async function generateTemplate(template: string, dest: string) {
  const current = import.meta.url.replace(/^file:\/\/\//, '');
  const templatePath = path.join(current, '../../../src/templates', template);
  await recursiveCopy(templatePath, dest, { excluded });
}

export async function generateMuiFiles(dest: string) {
  const template = templatePath();
  const appFile = path.join(template, 'mui/App.tsx');
  const mainFile = path.join(template, 'mui/main.tsx');
  const topbarFile = path.join(template, 'mui/topbar.tsx');

  recursiveCopy(appFile, path.join(dest, 'src', 'App.tsx'));
  recursiveCopy(mainFile, path.join(dest, 'src', 'main.tsx'));
  recursiveCopy(topbarFile, path.join(dest, 'src', 'components', 'topbar.tsx'));
}

export async function initializeGit(appName: string) {
  await execWithPromise(`cd ${appName} && git init`);
}
