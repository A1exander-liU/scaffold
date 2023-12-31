import fs from 'fs-extra';
import path from 'path';
import { recursiveCopy } from './fileio.js';
import { execWithPromise } from './wrappers.js';
import { fileURLToPath } from 'url';

export const excluded = ['node_modules', 'dist'];

export function templatePath() {
  const current = fileURLToPath(import.meta.url);
  const templatePath = path.join(current, '../../../templates');
  return templatePath;
}

export async function generateTemplate(template: string, dest: string) {
  const pathToTemplate = path.join(templatePath(), template);
  await recursiveCopy(pathToTemplate, dest, { excluded });

  /* 
    the .gitignore are ignore from npm publishing, had to be renamed to .gitignore.template,
    so when copying the template files they should be renamed back to .gitignore 
  */
  await fs.rename(
    path.join(dest, '.gitignore.template'),
    path.join(dest, '.gitignore'),
  );
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

export async function generatePrismaFiles(dest: string) {
  const template = templatePath();
  const prismaDirectory = path.join(template, 'nest/prisma');

  await recursiveCopy(prismaDirectory, path.join(dest, 'src/prisma'));
}

export async function initializeGit(appName: string) {
  await execWithPromise(`cd ${appName} && git init`);
}
