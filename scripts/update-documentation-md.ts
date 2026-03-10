import { resolve } from 'node:path';
import { transformFile } from './util';
import { exit } from 'node:process';

async function updateDocumentationMd() {
  if (!process.env.NEXT_PACKAGE_VERSION) {
    throw new Error('NEXT_PACKAGE_VERSION is not set!');
  }
  await transformFile(resolve('DOCUMENTATION.md'), documentation =>
    documentation
      .split('\n')
      .map(line =>
        line.startsWith('## Version:')
          ? `## Version: ${process.env.NEXT_PACKAGE_VERSION}`
          : line
      )
      .join('\n')
  );
}

updateDocumentationMd().catch(err => {
  console.error(err);
  exit(1);
});
