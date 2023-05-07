const fs = require('fs');
const path = require('path');

const { stdout, stdin  } = process;

const writeFile = fs.createWriteStream(
  path.join(__dirname,'./text.txt'),'utf-8'
);


stdout.write('Please, write some text!\n');

stdin.on('data', data => {
  const str = data.toString().trim();
  if (str === 'exit') {
    process.exit();
  }
  writeFile.write(data);
});

process.on('exit', () => stdout.write('Buy!'));