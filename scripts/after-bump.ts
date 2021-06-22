import { resolve, relative } from 'path';
import { formatJson, unixEOL } from '@sap-cloud-sdk/util';
import { apiDocsDir, transformFile, version } from './util';

function updateRootPackageJson() {
  transformFile(resolve('package.json'), packageJson =>
    formatJson({
      ...JSON.parse(packageJson),
      version: `${version}`
    })
  );
}

function updateDocumentationMd() {
  transformFile(resolve('DOCUMENTATION.md'), documentation =>
    documentation
      .split(unixEOL)
      .map(line =>
        line.startsWith('## Version:') ? `## Version: ${version}` : line
      )
      .join(unixEOL)
  );
}

function updateTypeDocConfig() {
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

function updateDocsVersions() {
  transformFile(resolve('docs', 'api', 'versions.json'), versionsJson => {
    const versions = JSON.parse(versionsJson);
    return versions.includes(version)
      ? versionsJson
      : formatJson([version, ...versions]);
  });
}

const nextChangelogTemplate = [
  '# Next',
  '',
  [
    '## Known Issues',
    '## Compatibility Notes',
    '## New Functionality',
    '## Improvements',
    '## Fixed Issues',
    ''
  ].join(['', '', '-', '', ''].join(unixEOL))
].join(unixEOL);

function transformChangeLog(changelog) {
  const [comments, versionSections] = changelog.split(`${unixEOL}# Next`);
  const [latestVersionSection, ...previousVersionSections] =
    versionSections.split(`${unixEOL}# `);
  const [, ...changelogCategories] = latestVersionSection.split(
    `${unixEOL}## `
  );
  const usedCategories = changelogCategories
    .map(category => {
      const [title, ...logLines] = category.split(unixEOL);
      const logs = logLines.filter(line => line && line !== '-');
      if (logs.length) {
        return [`## ${title}`, '', ...logs, ''].join(unixEOL);
      }
    })
    .filter(category => category);

  return [
    comments,
    nextChangelogTemplate,
    `# ${version}`,
    '',
    'Release Date: TBD<br>',
    `API Docs: https://sap.github.io/cloud-sdk/api/${version}<br>`,
    'Blog: TBD<br>',
    '',
    ...usedCategories,
    ...previousVersionSections.map(section => `# ${section}`)
  ].join(unixEOL);
}

function updateChangelog() {
  transformFile(resolve('CHANGELOG.md'), changelog =>
    transformChangeLog(changelog)
  );
}

function afterBump() {
  updateRootPackageJson();
  updateDocumentationMd();
  updateTypeDocConfig();
  updateDocsVersions();
  updateChangelog();
}

afterBump();
