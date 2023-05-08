import { createReadStream } from 'fs';
import { join } from 'path';

const { stdout } = process;

const readableStream = createReadStream(join('01-read-file', './text.txt'),
'utf-8');

readableStream.on('data', data => {
  stdout.write(data);
});