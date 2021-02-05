const path = require('path');
const { transformFile, version, jsonStringify, apiDocsDir } = require('./dist/util');

function updateRootPackageJson() {
  transformFile(path.resolve('package.json'), packageJson =>
    jsonStringify({
      ...JSON.parse(packageJson),
      version: `${version}`
    })
  );
}

function updateDocumentationMd() {
  transformFile(path.resolve('DOCUMENTATION.md'), documentation =>
    documentation
      .split('\n')
      .map(line =>
        line.startsWith('## Version:') ? `## Version: ${version}` : line
      )
      .join('\n')
  );
}

function updateTypeDocConfig() {
  transformFile('tsconfig.typedoc.json', config => {
    const parsedConfig = JSON.parse(config);
    return jsonStringify({
      ...parsedConfig,
      typedocOptions: {
        ...parsedConfig.typedocOptions,
        out: `${path.relative(path.resolve(), apiDocsDir)}/${version}`
      }
    });
  });
}

function updateDocsVersions() {
  transformFile(path.resolve('docs', 'api', 'versions.json'), versionsJson => {
    const versions = JSON.parse(versionsJson);
    return versions.includes(version)
      ? versionsJson
      : jsonStringify([version, ...versions]);
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
  ].join(['', '', '-', '', ''].join('\n'))
].join('\n');

function transformChangeLog(changelog) {
  const [comments, versionSections] = changelog.split('\n# Next');
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
    'Release Date: TBD<br>',
    `API Docs: https://sap.github.io/cloud-sdk/api/${version}<br>`,
    'Blog: TBD<br>',
    '',
    ...usedCategories,
    ...previousVersionSections.map(section => `# ${section}`)
  ].join('\n');
}

function updateChangelog() {
  transformFile(path.resolve('CHANGELOG.md'), changelog =>
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
