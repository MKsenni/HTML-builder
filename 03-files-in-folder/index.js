import * as fs from 'node:fs';
import * as path from 'node:path';

const { stdout } = process;

const folderPath = path.join('03-files-in-folder', 'secret-folder');

fs.readdir(folderPath, {withFileTypes: true}, (err, item) => {
  item.filter(file => file.isFile()).map(file => file.name).forEach(file => {
    fs.stat(path.join('03-files-in-folder', 'secret-folder', file), (err, info) =>{
      stdout.write(`${path.basename(file, path.extname(file))} - ${path.extname(file)} - ${info.size} kb\n`)
    })
  })
})