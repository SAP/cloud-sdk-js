import { resolve } from 'path';
import { unixEOL } from '@sap-cloud-sdk/util';
import { transformFile } from './util';

async function updateDocumentationMd(version: string) {
  await transformFile(resolve('DOCUMENTATION.md'), documentation =>
    documentation
      .split(unixEOL)
      .map(line =>
        line.startsWith('## Version:') ? `## Version: ${version}` : line
      )
      .join(unixEOL)
  );
}

async function beforeBump() {
  if (process.env.NEXT_PACKAGE_VERSION) {
    return updateDocumentationMd(process.env.NEXT_PACKAGE_VERSION);
  }
  throw new Error('NEXT_PACKAGE_VERSION is not set!');
}

beforeBump();
