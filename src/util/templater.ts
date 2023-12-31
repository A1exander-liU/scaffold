import fs from 'fs-extra';
import path from 'path';
import { recursiveCopy } from './fileio.js';
import { execWithPromise } from './wrappers.js';

export const excluded = ['node_modules'];

function templatePath() {
  const current = import.meta.url.replace(/^file:\/\/\//, '');
  const templatePath = path.join(current, '../../../templates');
  return templatePath;
}

export async function generateTemplate(template: string, dest: string) {
  const pathToTemplate = path.join(templatePath(), template);
  await recursiveCopy(pathToTemplate, dest, { excluded });
}

export async function generateMuiFiles(dest: string, language: string) {
  const template = templatePath();
  const appFile = path.join(template, `mui/${language}/App.${language}x`);
  const mainFile = path.join(template, `mui/${language}/main.${language}x`);
  const topbarFile = path.join(template, `mui/${language}/topbar.${language}x`);

  await fs.ensureFile(path.join(dest, 'src/components', `topbar.${language}x`));

  await Promise.all([
    recursiveCopy(appFile, path.join(dest, 'src', `App.${language}x`)),
    recursiveCopy(mainFile, path.join(dest, 'src', `main.${language}x`)),
    recursiveCopy(
      topbarFile,
      path.join(dest, 'src', 'components', `topbar.${language}x`),
    ),
  ]);
}

export async function initializeGit(appName: string) {
  await execWithPromise(`cd ${appName} && git init`);
}
