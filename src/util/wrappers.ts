import { exec } from 'child_process';

export const execWithPromise = (command) =>
  new Promise((resolve, reject) => {
    exec(command, (err, stout, sterr) => {
      if (err) {
        reject(sterr);
      } else {
        resolve(stout);
      }
    });
  });
