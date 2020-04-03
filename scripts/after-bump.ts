/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import * as path from 'path';
import {
  transformFile,
  version,
  jsonStringify,
  apiDocsDir
} from './util';

function updateTypeDocConfig() {
  transformFile('typedoc.json', config =>
    jsonStringify({
      ...JSON.parse(config),
      out: `${path.relative(path.resolve(), apiDocsDir)}/${version}`
    })
  );
}

function updateDocsVersions() {
  transformFile(
    path.resolve('docs', '_data', 'versions.json'),
    versionsJson => {
      const versions: string[] = JSON.parse(versionsJson);
      return versions.includes(version)
        ? versionsJson
        : jsonStringify([version, ...versions]);
    }
  );
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
  ].join(['', '', '-', '', ''].join('\n'))
].join('\n');

function transformChangeLog(changeLog) {
  const [comments, versionSections] = changeLog.split('\n# Next');
  const [
    latestVersionSection,
    ...previousVersionSections
  ] = versionSections.split('\n# ');
  const [_, ...changelogCategories] = latestVersionSection.split('\n## ');
  const usedCategories = changelogCategories
    .map(category => {
      const [title, ...logLines] = category.split('\n');
      const logs = logLines.filter(line => line && line !== '-');
      if (logs.length) {
        return [`## ${title}`, '', ...logs, ''].join('\n');
      }
    })
    .filter(category => category);

  return [
    comments,
    nextChangelogTemplate,
    `# ${version}`,
    '',
    'Release Date: TBD',
    `API Docs: https://sap.github.io/cloud-sdk/api/${version}`,
    'Blog: TBD',
    '',
    ...usedCategories,
    ...previousVersionSections.map(section => `# ${section}`)
  ].join('\n');
}

function updateChangelog() {
  transformFile(path.resolve('CHANGELOG.md'), changeLog =>
    transformChangeLog(changeLog)
  );
}

function afterBump() {
  updateTypeDocConfig();
  updateDocsVersions();
  updateChangelog();
}

afterBump();
