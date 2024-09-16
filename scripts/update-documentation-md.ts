import { resolve } from 'node:path';
import { unixEOL } from '@sap-cloud-sdk/util';
import { transformFile } from './util';
import { exit } from 'node:process';

async function updateDocumentationMd() {
  if (!process.env.NEXT_PACKAGE_VERSION) {
    throw new Error('NEXT_PACKAGE_VERSION is not set!');
  }
  await transformFile(resolve('DOCUMENTATION.md'), documentation =>
    documentation
      .split(unixEOL)
      .map(line =>
        line.startsWith('## Version:')
          ? `## Version: ${process.env.NEXT_PACKAGE_VERSION}`
          : line
      )
      .join(unixEOL)
  );
}

updateDocumentationMd().catch(err => {
  console.error(err);
  exit(1);
});
