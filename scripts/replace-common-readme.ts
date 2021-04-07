import { resolve } from 'path';
import { promises, readFileSync } from 'fs';
import { unixEOL } from '@sap-cloud-sdk/util'
import { createLogger } from '@sap-cloud-sdk/util';
import { getProductiveLernaModules } from './util';

const startTagCommonReadme = '<!-- sap-cloud-sdk-common-readme -->';
const endTagCommonReadme = '<!-- sap-cloud-sdk-common-readme-stop -->';
const startTagLogo = '<!-- sap-cloud-sdk-logo -->';
const endTagLogo = '<!-- sap-cloud-sdk-logo-stop -->';

const logoContent = `<a href="https://sap.com/s4sdk"><img src="https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/logo-with-js.svg" alt="SAP Cloud SDK for JavaScript Logo" height="122.92" width="226.773"/></a>${unixEOL}`;
const infoNoManualEdit =
  '<!-- This block is inserted by scripts/replace-common-readme.ts and not oclif like the commands block. Do not adjust it manually. -->';

const logger = createLogger('check-licenses');

const genericContent = readFileSync(
  resolve(__dirname, 'COMMON-README-PART.md'),
  { encoding: 'utf8' }
);

function insertCommonContent(oldFileContent: string): string {
  const newFileContent = replaceContentUsingTags(
    startTagCommonReadme,
    endTagCommonReadme,
    genericContent,
    oldFileContent
  );
  return replaceContentUsingTags(
    startTagLogo,
    endTagLogo,
    logoContent,
    newFileContent
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
    `${startTag}${unixEOL}${infoNoManualEdit}${unixEOL}${replacement}${endTag}`
  );
}

async function updateReadmeFile(pathModule: string) {
  const pathReadme = resolve(pathModule, 'README.md');
  const oldFileContent = await promises.readFile(pathReadme, {
    encoding: 'utf8'
  });
  const newFileContent = insertCommonContent(oldFileContent);
  await promises.writeFile(pathReadme, newFileContent, { encoding: 'utf8' });
  logger.info(`File ${pathReadme} finished.`);
}

async function updateReadmeFiles() {
  logger.info('Generic content is added to README.md files in packages.');
  const packages = await getProductiveLernaModules();
  await Promise.all(packages.map(module => updateReadmeFile(module.location)));
}

updateReadmeFiles();
