import fs from 'fs-extra';
import path from 'path';

export async function recursiveCopy(
  src: string,
  dest: string,
  options?: { excluded: string[] },
) {
  try {
    await fs.copy(src, dest, {
      filter: (src, dest) => {
        if (options && options.excluded.includes(path.basename(src))) {
          return false;
        }
        return true;
      },
    });
  } catch (err) {
    console.log(err);
  }
}
