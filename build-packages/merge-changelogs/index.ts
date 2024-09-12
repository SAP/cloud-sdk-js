/* eslint-disable jsdoc/require-jsdoc */
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { setOutput, error, setFailed } from '@actions/core';
import { getPackages } from '@manypkg/get-packages';

export const validMessageTypes = [
  'Known Issue',
  'Compatibility Note',
  'New Functionality',
  'Improvement',
  'Fixed Issue',
  'Updated Dependencies'
] as const;

interface Change {
  packageNames: string[];
  commit: string;
  type: (typeof validMessageTypes)[number];
  version: string;
  summary: string;
  dependencies?: string;
}

interface ContentByVersion {
  version: string;
  content: string;
}

function getPackageName(changelog: string): string {
  return changelog.split('\n')[0].split('/')[1];
}

function splitByVersion(changelog: string): ContentByVersion[] {
  return changelog
    .split('\n## ')
    .slice(1)
    .map(h2 => {
      const [version, ...content] = h2.split('\n');
      return {
        version,
        content: content.join('\n').trim()
      };
    });
}

function assertGroups(
  groups: RegExpMatchArray['groups'] | undefined,
  packageName: string,
  version: string
): asserts groups is {
  summary: string;
  commit?: string;
  type: (typeof validMessageTypes)[number];
} {
  if (!validMessageTypes.includes(groups?.type as any)) {
    error(
      groups?.type
        ? `Error: Type [${groups?.type}] is not valid (${groups?.commit})`
        : `Error: No type was provided for "${groups?.summary} (${groups?.commit})"`
    );
    throw new Error(
      `Incorrect or missing type in CHANGELOG.md in ${packageName} for v${version}!`
    );
  }
  if (typeof groups?.summary !== 'string' || groups?.summary.trim() === '') {
    error(
      `Error: Empty or missing summary in CHANGELOG.md in ${packageName} for v${version}! (${groups?.commit})`
    );
    throw new Error(
      `Empty or missing summary in CHANGELOG.md in ${packageName} for v${version}!`
    );
  }
}

function parseContent(
  content: string,
  version: string,
  packageName: string
): Change[] {
  // Explanation: https://regex101.com/r/ikvIaa/2
  const contentRegex =
    /- ((?<commit>.*):) (\[(?<type>.*?)\])? ?(?<summary>[^]*?)(?=(\n- |\n### |$))/g;

  return [...content.matchAll(contentRegex)].map(({ groups }) => {
    assertGroups(groups, packageName, version);
    return {
      version,
      summary: groups.summary.trim(),
      packageNames: [packageName],
      commit: groups.commit ? `(${groups.commit})` : '',
      type: groups.type
    };
  });
}

function parseChangelog(changelog: string): Change[] {
  const packageName = getPackageName(changelog);
  const [latest] = splitByVersion(changelog);
  return parseContent(latest.content, latest.version, packageName).flat();
}

function formatHeader(version: string) {
  return `
# ${version}`;
}

function formatMessagesOfType(
  messages: Change[],
  type: (typeof validMessageTypes)[number]
): string {
  if (!messages.some(msg => msg.type === type)) {
    return '';
  }
  const formatted = messages
    .filter(msg => msg.type === type)
    .map(
      msg =>
        `- [${msg.packageNames.join(', ')}] ${msg.summary} ${msg.commit}${
          msg.dependencies || ''
        }`
    )
    .join('\n');

  const pluralizedType =
    type.slice(-1) === 'y' ? type.slice(0, -1) + 'ies' : type + 's';
  return `\n\n## ${pluralizedType}\n\n${formatted}`;
}

function mergeMessages(parsedMessages: Change[]): Change[] {
  return parsedMessages.reduce((prev, curr) => {
    const sameMessage = prev.find(
      msg =>
        msg.summary === curr.summary &&
        msg.dependencies === curr.dependencies &&
        msg.version === curr.version &&
        msg.type === curr.type
    );
    if (sameMessage) {
      sameMessage.packageNames.push(curr.packageNames[0]);
      return prev;
    }
    return [...prev, curr];
  }, [] as Change[]);
}

async function formatChangelog(messages: Change[]): Promise<string> {
  const version = messages[0].version;
  return (
    formatHeader(version) +
    formatMessagesOfType(messages, 'Known Issue') +
    formatMessagesOfType(messages, 'Compatibility Note') +
    formatMessagesOfType(messages, 'New Functionality') +
    formatMessagesOfType(messages, 'Improvement') +
    formatMessagesOfType(messages, 'Fixed Issue') +
    formatMessagesOfType(messages, 'Updated Dependencies') +
    '\n\n'
  );
}

export async function mergeChangelogs(): Promise<void> {
  const { packages } = await getPackages(process.cwd());
  const pathsToPublicLogs = packages
    .filter(({ packageJson }) => !packageJson.private)
    .map(({ relativeDir }) => resolve(relativeDir, 'CHANGELOG.md'));

  const changelogs = await Promise.all(
    pathsToPublicLogs.map(async file => readFile(file, { encoding: 'utf8' }))
  );

  const newChangelog = await formatChangelog(
    mergeMessages(changelogs.map(log => parseChangelog(log)).flat())
  );
  setOutput('changelog', newChangelog);
}

mergeChangelogs().catch(error => {
  setFailed(error.message);
});
