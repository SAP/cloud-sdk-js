import { resolve, relative } from 'path';
import { formatJson, unixEOL } from '@sap-cloud-sdk/util';
import { apiDocsDir, transformFile, nextSdkVersion } from './util';

function updateRootPackageJson(version: string) {
  transformFile(resolve('package.json'), packageJson =>
    formatJson({
      ...JSON.parse(packageJson),
      version: `${version}`
    })
  );
}

function updateDocumentationMd(version: string) {
  transformFile(resolve('DOCUMENTATION.md'), documentation =>
    documentation
      .split(unixEOL)
      .map(line =>
        line.startsWith('## Version:') ? `## Version: ${version}` : line
      )
      .join(unixEOL)
  );
}

function updateTypeDocConfig(version: string) {
  transformFile('tsconfig.typedoc.json', config => {
    const parsedConfig = JSON.parse(config);
    return formatJson({
      ...parsedConfig,
      typedocOptions: {
        ...parsedConfig.typedocOptions,
        out: `${relative(resolve(), apiDocsDir)}/${version}`
      }
    });
  });
}

function updateDocsVersions(version: string) {
  transformFile(resolve('docs', 'api', 'versions.json'), versionsJson => {
    const versions = JSON.parse(versionsJson);
    return versions.includes(version)
      ? versionsJson
      : formatJson([version, ...versions]);
  });
}

async function beforeBump() {
  const version = await nextSdkVersion();
  updateRootPackageJson(version);
  updateDocumentationMd(version);
  updateTypeDocConfig(version);
  updateDocsVersions(version);
}

beforeBump();
