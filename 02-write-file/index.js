import { createWriteStream } from 'fs';
import { join } from 'path';

const { stdout, stdin  } = process;

const writeFile = createWriteStream(join('02-write-file','./text.txt'),'utf-8');

stdout.write('Please, write some text!\n');

stdin.on('data', data => {
  const str = data.toString().trim();
  if (str === 'exit') {
    process.exit();
  }
  writeFile.write(data);
});

process.on('SIGINT', () => {
  stdout.write('Buy!');
  process.exit();
});