import { writeFile, readFile } from 'fs/promises';
import { GlobSync } from 'glob';

const validMessageTypes = [
  'Known Issue',
  'Compatibility Note',
  'New Functionality',
  'Improvement',
  'Fixed Issue',
  'Updated Dependencies'
] as const;

interface Message {
  packageNames: string[];
  commit: string;
  type: typeof validMessageTypes[number];
  version: string;
  message: string;
}

interface ContentByVersion {
  version: string;
  content: string;
}

function getPackageName(changelog: string): string {
  // Get package name without the @sap-cloud-sdk scope
  const packageNameRegex = /^# @sap-cloud-sdk\/(?<packageName>.+)$/m;
  const firstLine = changelog.split('\n')[0];
  const packageNameMatch = firstLine.match(packageNameRegex);

  if (!packageNameMatch?.groups?.packageName) {
    throw new Error('Changelog should have package name on first line');
  }

  return packageNameMatch.groups.packageName;
}

function splitByVersion(changelog: string): ContentByVersion[] {
  // Explanation: https://regex101.com/r/wCKs2A/3
  const versionRegex =
    /## (?<version>[0-9]+\.[0-9]+\..+)(?<content>[^]*?)(?=(\n## |$))/g;
  const matches = changelog.matchAll(versionRegex);
  const results: any[] = [];
  for (const match of matches) {
    results.push({
      version: match.groups?.version,
      content: match.groups?.content.trim()
    });
  }
  return results;
}

function parseContent(
  content: string,
  version: string,
  packageName: string
): Message[] {
  // I'm sorry... Explanation: https://regex101.com/r/9UhEwo/2
  const contentRegex =
    /- ((?<commit>.*):) (\[(?<type>.*?)\]) (?<message>[^]*?)(?=(\n- |\n### |$))|- Updated dependencies \[(?<depsCommit>.*)\](?<deps>[^]*?)\n*(?=(\n- |\n### |$))/g;
  const results: Message[] = [];
  for (const match of content.matchAll(contentRegex)) {
    if (!match.groups?.commit && !match.groups?.depsCommit) {
      throw new Error(
        `No commit hash found for change set in ${packageName} for version ${version}!`
      );
    }
    if (
      !validMessageTypes.includes(match.groups?.type as any) &&
      !match[0].includes('Updated dependencies')
    ) {
      throw new Error(
        `Change set has an incorrect or missing type for change set in ${packageName} for version ${version}!`
      );
    }
    const message = match.groups?.message?.trim() || match.groups?.deps?.trim();
    if (message) {
      results.push({
        version,
        message,
        packageNames: [packageName],
        commit: match.groups?.commit || match.groups?.depsCommit,
        type: (match.groups?.type as any) || 'Updated Dependencies'
      });
    }
  }
  return results;
}

function parseChangelog(changelog: string): Message[] {
  const packageName = getPackageName(changelog);
  const versions = splitByVersion(changelog);
  return versions
    .map(({ version, content }) => parseContent(content, version, packageName))
    .flat();
}

function writeMessagesOfType(
  messages: Message[],
  type: typeof validMessageTypes[number]
): string {
  return messages.some(msg => msg.type === type)
    ? `## ${type}

${messages
  .filter(msg => msg.type === type)
  .map(
    msg => `- [${msg.packageNames.join(', ')}] ${msg.message} (${msg.commit})`
  )
  .join('\n')}`
    : '';
}

function mergeMessages(parsedMessages: Message[]): Message[] {
  return parsedMessages.reduce((prev, curr) => {
    const sameMessage = prev.find(
      msg =>
        msg.message === curr.message &&
        msg.version === curr.version &&
        msg.type === curr.type
    );
    if (sameMessage) {
      sameMessage.packageNames.push(curr.packageNames[0]);
      return prev;
    }
    return [...prev, curr];
  }, [] as Message[]);
}

function createNewSection(version: string, messages: Message[]): string {
  return `
# ${version}

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/${version}<br>
Blog: TBD<br>

${writeMessagesOfType(messages, 'Compatibility Note')}

${writeMessagesOfType(messages, 'New Functionality')}

${writeMessagesOfType(messages, 'Improvement')}

${writeMessagesOfType(messages, 'Fixed Issue')}

${
  messages.filter(msg => msg.type === 'Updated Dependencies')
    ? '## Updated Dependencies\n'
    : ''
}
${messages
  .filter(msg => msg.type === 'Updated Dependencies')
  .map(
    msg =>
      `- [${msg.packageNames.join(', ')}] Updated Dependencies (${
        msg.commit
      })\n  ${msg.message}`
  )
  .join('\n')}
`;
}

async function formatChangelog(parsedChangelog: Message[]): Promise<string> {
  let unifiedChangelog = await readFile('CHANGELOG.md', { encoding: 'utf8' });
  const relevantMessages = parsedChangelog.filter(
    message => !unifiedChangelog.includes(`# ${message.version}`)
  );
  const versions = [...new Set(relevantMessages.map(msg => msg.version))];

  for (const version of versions) {
    const newContent = createNewSection(
      version,
      relevantMessages.filter(msg => msg.version === version)
    );
    unifiedChangelog =
      unifiedChangelog.split('\n').slice(0, 30).join('\n') +
      newContent +
      unifiedChangelog.split('\n').slice(30).join('\n');
  }

  return unifiedChangelog;
}

async function getChangelog(): Promise<void> {
  const files = new GlobSync('packages/*/CHANGELOG.md').found;
  const parsedLogs = (
    await Promise.all(
      files.map(async file => {
        const text = await readFile(file, { encoding: 'utf8' });
        return parseChangelog(text);
      })
    )
  ).flat();
  const newChangelog = await formatChangelog(mergeMessages(parsedLogs));
  await writeFile('CHANGELOG.md', newChangelog);
}

getChangelog();
