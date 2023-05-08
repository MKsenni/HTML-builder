import { readdir} from 'node:fs/promises';
import * as fs from 'node:fs';
import { promises } from 'node:fs';
import path from 'node:path';

const pathStyles = path.join('05-merge-styles', 'styles');
const pathProjectDist = path.join('05-merge-styles', 'project-dist', 'bundle.css');
const output = fs.createWriteStream(pathProjectDist);

promises.readdir(pathStyles, {withFileTypes: true}, (files) => {
  files.forEach(file => {
    if (file.isFile()) {
      const pathFile = path.join(pathStyles, file.name);
      const info = path.parse(pathFile);

      if (info.ext === '.css') {
        const input = fs.createReadStream(pathFile);
        input.on('data', chunk => output.write(chunk.toString() + '\n'))
      }
    }
  })
})

