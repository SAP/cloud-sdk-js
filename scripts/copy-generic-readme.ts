import { resolve } from 'path';
import { promises, readFileSync } from 'fs';
import { createLogger } from '@sap-cloud-sdk/util';
import { getNonTestLernaModules } from './util';

const startTag = '<!--genericPart-->';
const endTag = '<!--genericPartStop-->';

const logger = createLogger('check-licenses');

function insertGenericContent(fileContent: string): string {
  const genericContent = readFileSync(
    resolve(__dirname, 'GENERIC-README-PART.md'),
    { encoding: 'utf8' }
  );

  return fileContent.replace(
    new RegExp(`${startTag}(.|\n)*${endTag}`),
    `${startTag}\n${genericContent}${endTag}`
  );
}
async function updateReadmeFile(pathModule: string) {
  const pathReadme = resolve(pathModule, 'README.md');
  const oldFileContent = await promises.readFile(pathReadme, {
    encoding: 'utf8'
  });
  const newFileContent = insertGenericContent(oldFileContent);
  await promises.writeFile(pathReadme, newFileContent, { encoding: 'utf8' });
  logger.info(`File ${pathReadme} finished.`);
}

async function updateReadmeFiles() {
  logger.info('Generic content is added to README.md files in packages.');
  const packages = await getNonTestLernaModules();
  await Promise.all(packages.map(module => updateReadmeFile(module.location)));
}

updateReadmeFiles();
