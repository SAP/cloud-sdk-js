import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { getPackageVersion } from './get-package-version';
import { readdir, readFile, writeFile } from 'node:fs/promises';

const execFileAsync = promisify(execFile);

const SHORT_SHA_AT_LINE_END_RE = /\(([0-9a-f]{7,12})\)$/;

/**
 * Gets the GitHub repository in the format "owner/repo" from the cwd's git configuration.
 * Handles both HTTPS and SSH remote URLs.
 * @returns The repository in "owner/repo" format.
 * @throws If the remote URL cannot be parsed or if git command fails.
 */
async function getRepo(): Promise<string> {
  const { stdout } = await execFileAsync('git', [
    'remote',
    'get-url',
    'origin'
  ]);
  // Handles both https://github.com/owner/repo(.git) and git@github.com:owner/repo(.git)
  const match = stdout.trim().match(/github\.com[:/](.+?)(?:\.git)?$/);
  if (!match)
    throw new Error(`Cannot parse repo from remote URL: ${stdout.trim()}`);
  return match[1];
}

async function expandSha(shortSha: string): Promise<string> {
  try {
    const { stdout } = await execFileAsync('git', ['rev-parse', shortSha]);
    return stdout.trim();
  } catch {
    return shortSha;
  }
}

export async function embedCommitLinks(
  markdown: string,
  repo: string
): Promise<string> {
  const lines = markdown.split('\n');
  return (
    await Promise.all(
      lines.map(async line => {
        const match = line.match(SHORT_SHA_AT_LINE_END_RE);
        if (!match || !line.trimStart().startsWith('- [')) {
          return line;
        }

        const sha = match[1];
        const full = await expandSha(sha);
        const replacement =
          full === sha
            ? `(${sha})`
            : `([${sha}](https://github.com/${repo}/commit/${full}))`;

        return line.replace(SHORT_SHA_AT_LINE_END_RE, replacement);
      })
    )
  ).join('\n');
}

async function getChangelogWithVersion(v?: string): Promise<string> {
  v = v || (await getPackageVersion());
  const [changelog, repo] = await Promise.all([
    readFile('CHANGELOG.md', { encoding: 'utf8' }),
    getRepo()
  ]);
  const [, olderLogs] = changelog.split(`\n# ${v}`);
  if (!olderLogs) {
    throw new Error(`Can not find version ${v} in CHANGELOG.md`);
  }
  let logs = olderLogs.split(`\n# `)[0];
  logs = '\n' + logs.slice(logs.indexOf(`\n##`) + 1);
  logs = logs.replace(/## /g, '### ');

  const date = new Date();
  const day = date.toLocaleString('default', { day: '2-digit' });
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  const headerWithVersion = `\n## ${v} [Core Modules] - ${month} ${day}, ${year}`;

  return await embedCommitLinks([headerWithVersion, logs].join('\n'), repo);
}

async function getReleaseNotesFilePath(): Promise<string> {
  const majorVersion = (await getPackageVersion()).split('.')[0];

  if (await isVersioned(majorVersion)) {
    return `./cloud-sdk/docs-js_versioned_docs/version-v${majorVersion}/release-notes.mdx`;
  }
  return './cloud-sdk/docs-js/release-notes.mdx';
}

async function isVersioned(majorVersion: string): Promise<boolean> {
  const versionedInDocusaurus = await readdir(
    './cloud-sdk/docs-js_versioned_docs/'
  );
  // The docusaurus folders are called version-v1, version-v2 so match regex for ends with v1, v2, ...
  return !!versionedInDocusaurus.find(folder =>
    folder.match(new RegExp(`v${majorVersion}$`))
  );
}

export async function addCurrentChangelog(): Promise<void> {
  const changelog = await getChangelogWithVersion();
  const releaseNotesFilePath = await getReleaseNotesFilePath();
  const releaseNotes = await readFile(releaseNotesFilePath, {
    encoding: 'utf8'
  });
  let releaseNotesArray = releaseNotes.split(
    `<!-- This line is used for our release notes automation -->\n`
  );
  const newContent = changelog + releaseNotesArray[1];
  releaseNotesArray[1] = newContent;
  const newReleaseNotes = releaseNotesArray.join(
    `<!-- This line is used for our release notes automation -->\n`
  );
  await writeFile(releaseNotesFilePath, newReleaseNotes);
}
