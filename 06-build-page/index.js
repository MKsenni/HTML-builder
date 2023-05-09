import * as fs from 'node:fs';
import { promises } from 'node:fs';
import path from 'node:path';
import { mkdir} from 'node:fs/promises';

const pathAssets = path.join('06-build-page', 'assets');
const pathComponents = path.join('06-build-page', 'components');
const pathStyles = path.join('06-build-page', 'styles');
const pathProjectDist = path.join('06-build-page', 'project-dist');
const pathAssetsProjectDist = path.join('06-build-page', 'project-dist', 'assets');
const pathProjectDistTemplate = path.join('06-build-page', 'template.html');
const htmlProjectDist = path.join('06-build-page','project-dist', 'index.html');
const stylesProjectDist = path.join('06-build-page','project-dist', 'style.css');

const createStylesFile = () => {
  const output = fs.createWriteStream(stylesProjectDist);

  promises.readdir(pathStyles, {withFileTypes: true}).then((files) => {
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
}

const copyDir = () => {
  fs.readdir('./06-build-page/assets/', {withFileTypes: true}, async (err, files) => {
    if (err) throw err.message;

    for (let file of files) {
      const pathFile = path.join('./06-build-page/assets/', file.name);
      const pathCopyFile = path.join('./06-build-page/project-dist/assets/', file.name);
      if (!file.isFile()) {
        promises.copyFile(pathFile, pathCopyFile);

      }
    }
  })
}

try {
  const projectFolder = new URL('project-dist', import.meta.url);
  const createDir = await mkdir(projectFolder, { recursive: true });
  console.log(`created ${createDir}`);
  console.log('Files was copied');
  createStylesFile();
  copyDir();
} catch (err) {
  console.error(err.message);
}