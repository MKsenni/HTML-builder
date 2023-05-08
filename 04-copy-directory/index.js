import { mkdir} from 'node:fs/promises';
import * as fs from 'node:fs';
import { promises } from 'node:fs';
import path from 'node:path';

const copyDir = () => {
  fs.readdir('./04-copy-directory/files/', {withFileTypes: true}, (err, files) => {
    if (err) throw err.message;

    for (let file of files) {
      if (file.isFile()) {
        const pathFile = path.join('./04-copy-directory/files/', file.name);
        const pathCopyFile = path.join('./04-copy-directory/files-copy/', file.name);

        promises.copyFile(pathFile, pathCopyFile)
      }
    }
  })
}

const removeFile = () => {
  fs.readdir('./04-copy-directory/files-copy/', (err, files) => {
    if (err) throw err.message;

    for (let file of files) {
      promises.unlink(path.join('./04-copy-directory/files-copy/', file))
    }
  })
}

try {
  const projectFolder = new URL('./files-copy/', import.meta.url);
  const createDir = await mkdir(projectFolder, { recursive: true });
  console.log(`created ${createDir}`);
  removeFile();
  copyDir();
  console.log('Files was copied');
} catch (err) {
  console.error(err.message);
}
