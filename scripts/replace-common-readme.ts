import { resolve } from 'path';
import { promises, readFileSync } from 'fs';
import { unixEOL, createLogger } from '@sap-cloud-sdk/util';
import { getProductiveLernaModules } from './util';

const startTagCommonReadme = '<!-- sap-cloud-sdk-common-readme -->';
const endTagCommonReadme = '<!-- sap-cloud-sdk-common-readme-stop -->';
const startTagLogo = '<!-- sap-cloud-sdk-logo -->';
const endTagLogo = '<!-- sap-cloud-sdk-logo-stop -->';
const startTagV2Announcement = '<!-- sap-cloud-sdk-2.0-announcement -->';
const endTagV2Announcement = '<!-- sap-cloud-sdk-2.0-announcement-stop -->';

const logoContent = `<a href="https://sap.com/s4sdk"><img src="https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/logo-with-js.svg" alt="SAP Cloud SDK for JavaScript Logo" height="122.92" width="226.773"/></a>${unixEOL}`;
const infoNoManualEdit =
  '<!-- This block is inserted by scripts/replace-common-readme.ts. Do not adjust it manually. -->';

const logger = createLogger('check-licenses');

const genericContent = readFileSync(
  resolve(__dirname, 'COMMON-README-PART.md'),
  { encoding: 'utf8' }
);

const version2AnnouncementContent = readFileSync(
  resolve(__dirname, '2.0-announcement.md'),
  { encoding: 'utf8' }
);

function insertCommonContent(oldFileContent: string): string {
  const withCommonReadme = replaceContentUsingTags(
    startTagCommonReadme,
    endTagCommonReadme,
    genericContent,
    oldFileContent
  );
  const withCommonReadmeAndLogo = replaceContentUsingTags(
    startTagLogo,
    endTagLogo,
    logoContent,
    withCommonReadme
  );
  return replaceContentUsingTags(
    startTagV2Announcement,
    endTagV2Announcement,
    version2AnnouncementContent,
    withCommonReadmeAndLogo
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
