/* eslint-disable jsdoc/require-jsdoc */
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { setFailed, info } from '@actions/core';
import { getPackages } from '@manypkg/get-packages';

const messageTypes = [
  {
    name: 'compat',
    title: 'Compatibility Notes',
    alternatives: ['compatibility', 'compatibility note', 'compat']
  },
  {
    name: 'feat',
    title: 'New Features',
    alternatives: ['new', 'new functionality', 'feat']
  },
  {
    name: 'fix',
    title: 'Fixed Issues',
    alternatives: ['bug', 'bug fix', 'fixed issue', 'fix', 'fix issue']
  },
  {
    name: 'impr',
    title: 'Improvements',
    alternatives: ['improvement', 'improv']
  },
  {
    name: 'dep',
    title: 'Updated Dependencies',
    alternatives: ['dependency', 'dependency update']
  }
];

type MessageType = (typeof messageTypes)[number];

interface Change {
  packageNames: string[];
  commit: string;
  type: MessageType;
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

function getMessageType(matchedType: string | undefined): MessageType {
  if (!matchedType) {
    throw new Error('Missing message type');
  }
  const type = messageTypes.find(({ name, alternatives }) =>
    [name, ...alternatives].includes(matchedType.toLowerCase())
  );
  if (!type) {
    throw new Error(`Invalid message type: ${matchedType}`);
  }
  return type;
}

function getSummary(matchedSummary: string | undefined): string {
  const summary = matchedSummary?.trim();
  if (!summary) {
    throw new Error('Empty or missing summary');
  }
  return summary;
}

function parseContent(
  content: string,
  version: string,
  packageName: string
): Change[] {
  // Explanation: https://regex101.com/r/ikvIaa/2
  const contentRegex =
    /- ((?<commit>.*):) (\[(?<type>.*?)\])? ?(?<summary>[^]*?)(?=(\n- |\n### |$))/g;

  info(`parsing content for ${packageName} v${version}`);

  return [...content.matchAll(contentRegex)].map(({ groups }) => {
    const type = getMessageType(groups?.type);
    const summary = getSummary(groups?.summary);
    return {
      version,
      summary,
      packageNames: [packageName],
      // TODO: add link to commit
      commit: groups.commit ? `(${groups.commit})` : '',
      type
    };
  });
}

function parseChangelog(changelog: string): Change[] {
  const packageName = getPackageName(changelog);
  const [latest] = splitByVersion(changelog);
  return parseContent(latest.content, latest.version, packageName).flat();
}

function formatMessagesOfType(messages: Change[], type: MessageType): string {
  const formattedMessages = messages
    .filter(msg => msg.type.name === type.name)
    .map(
      msg =>
        `- [${msg.packageNames.join(', ')}] ${msg.summary} ${msg.commit}${
          msg.dependencies || ''
        }`
    )
    .join('\n');

  return `## ${type.title}\n\n${formattedMessages}`;
}

function mergeMessages(parsedMessages: Change[]): Change[] {
  return parsedMessages.reduce((prev, curr) => {
    const sameMessage = prev.find(
      msg =>
        msg.summary === curr.summary &&
        msg.dependencies === curr.dependencies &&
        msg.version === curr.version &&
        msg.type.name === curr.type.name
    );
    if (sameMessage) {
      sameMessage.packageNames.push(curr.packageNames[0]);
      return prev;
    }
    return [...prev, curr];
  }, [] as Change[]);
}

async function formatChangelog(messages: Change[]): Promise<string> {
  if (!messages.length) {
    throw new Error('No messages found in changelogs');
  }
  return messageTypes.filter(type => messages.some(msg => msg.type.name === type.name))
    .map(type => formatMessagesOfType(messages, type))
    .join('\n\n');
}

async function getPublicChangelogs() {
  const { packages } = await getPackages(process.cwd());
  const pathsToPublicLogs = packages
    .filter(({ packageJson }) => !packageJson.private)
    .map(({ relativeDir }) => resolve(relativeDir, 'CHANGELOG.md'));

  info(`changelogs to merge: ${pathsToPublicLogs.join(', ')}`);

  return Promise.all(
    pathsToPublicLogs.map(async file => readFile(file, { encoding: 'utf8' }))
  );
}

async function writeChangelog(changelog: string): Promise<void> {
  if (!changelog) {
    throw new Error('CHANGELOG environment variable not set.');
  }
  if (!process.env.VERSION) {
    throw new Error('VERSION environment variable not set.');
  }
  const unifiedChangelog = await readFile('CHANGELOG.md', { encoding: 'utf8' });
  await writeFile(
    'CHANGELOG.md',
    unifiedChangelog.split('\n').slice(0, 30).join('\n') +
      '\n' +
      `# ${process.env.VERSION}` +
      '\n' +
      changelog +
      unifiedChangelog.split('\n').slice(30).join('\n'),
    { encoding: 'utf8' }
  );
}

export async function mergeChangelogs(): Promise<void> {
  const changelogs = await getPublicChangelogs();
  const mergedChangelog = await formatChangelog(
    mergeMessages(changelogs.map(log => parseChangelog(log)).flat())
  );
  await writeChangelog(mergedChangelog);
}

mergeChangelogs().catch(error => {
  setFailed(error.message);
});
