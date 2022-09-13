import { readFile as rf, writeFile as wf } from 'fs';
import { promisify } from 'util';
import { resolve } from 'path';
import { cli } from './src/options';

const readFile = promisify(rf);
const writeFile = promisify(wf);

writeReadMe();

const infoNoManualEdit =
  '<!-- This block is inserted by generate-readme.ts. Do not adjust it manually. -->';

async function writeReadMe() {
  const file = await readFile(resolve(__dirname, 'README.md'), {
    encoding: 'utf-8'
  });

  await writeFile(
    resolve(__dirname, 'README.md'),
    replaceContentUsingTags(
      '<!-- commands -->',
      '<!-- commandsstop -->',
      '```\n' +
        (await cli(['--input', 'test', '--outputDir', 'test']).getHelp()) +
        '\n```',
      file
    )
  );
}

function replaceContentUsingTags(
  startTag: string,
  endTag: string,
  replacement: string,
  fileContent: string
) {
  return fileContent.replace(
    new RegExp(`${startTag}(?:.|\n)*${endTag}`),
    `${startTag}\n${infoNoManualEdit}\n${replacement}\n${endTag}`
  );
}
