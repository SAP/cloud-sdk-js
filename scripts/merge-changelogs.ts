import { writeFile, readFile } from 'fs/promises';
import { resolve } from 'path';

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
  type: typeof validMessageTypes[number];
  version: string;
  summary: string;
  dependencies?: string;
}

interface ContentByVersion {
  version: string;
  content: string;
}

function getPackageName(changelog: string): string {
  // Get package name without the @sap-cloud-sdk scope
  const packageNameRegex = /^# @sap-cloud-sdk\/(?<packageName>.+)$/;
  const firstLine = changelog.split('\n')[0];
  const packageNameMatch = firstLine.match(packageNameRegex);

  if (!packageNameMatch?.groups?.packageName) {
    throw new Error('Changelog should have package name on first line');
  }

  return packageNameMatch.groups.packageName;
}

function splitByVersion(changelog: string): ContentByVersion[] {
  return changelog.split('\n## ').map(h2 => {
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
  type: typeof validMessageTypes[number];
} {
  if (!validMessageTypes.includes(groups?.type as any)) {
    console.error(
      groups?.type
        ? `Error: Type [${groups?.type}] is not valid (${groups?.commit})`
        : `Error: No type was provided for "${groups?.summary} (${groups?.commit})"`
    );
    throw new Error(
      `Incorrect or missing type in CHANGELOG.md in ${packageName} for v${version}!`
    );
  }
  if (typeof groups?.summary !== 'string' || groups?.summary.trim() === '') {
    console.error(
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
  const versions = splitByVersion(changelog);
  return versions
    .map(({ version, content }) => parseContent(content, version, packageName))
    .flat();
}

function writeHeader(version: string) {
  return `
# ${version}

API Docs: https://sap.github.io/cloud-sdk/api/${version}`;
}

function writeMessagesOfType(
  messages: Change[],
  type: typeof validMessageTypes[number]
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

function createNewSection(version: string, messages: Change[]): string {
  return (
    writeHeader(version) +
    writeMessagesOfType(messages, 'Known Issue') +
    writeMessagesOfType(messages, 'Compatibility Note') +
    writeMessagesOfType(messages, 'New Functionality') +
    writeMessagesOfType(messages, 'Improvement') +
    writeMessagesOfType(messages, 'Fixed Issue') +
    writeMessagesOfType(messages, 'Updated Dependencies') +
    '\n\n'
  );
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

async function formatChangelog(parsedChangelogs: Change[]): Promise<string> {
  const unifiedChangelog = await readFile('CHANGELOG.md', { encoding: 'utf8' });
  const missingFromUnifiedChangelog = parsedChangelogs.filter(
    summary => !unifiedChangelog.includes(`# ${summary.version}`)
  );
  const versions = [
    ...new Set(missingFromUnifiedChangelog.map(msg => msg.version))
  ];
  return versions.reduce((changelog, version) => {
    const newSection = createNewSection(
      version,
      missingFromUnifiedChangelog.filter(msg => msg.version === version)
    );
    return (
      changelog.split('\n').slice(0, 30).join('\n') +
      newSection +
      changelog.split('\n').slice(30).join('\n')
    );
  }, unifiedChangelog);
}

export async function mergeChangelogs(): Promise<void> {
  const workspaces: string[] = JSON.parse(
    await readFile('package.json', { encoding: 'utf8' })
  ).workspaces;
  const workspacesWithVisibility = await Promise.all(
    workspaces.map(async workspace => {
      const packageJson = await readFile(resolve(workspace, 'package.json'), {
        encoding: 'utf8'
      });
      return [!JSON.parse(packageJson).private, workspace] as const;
    })
  );
  const pathsToPublicLogs = workspacesWithVisibility
    .filter(([isPublic]) => isPublic)
    .map(([, workspace]) => resolve(workspace, 'CHANGELOG.md'));
  const changelogs = await Promise.all(
    pathsToPublicLogs.map(async file => readFile(file, { encoding: 'utf8' }))
  );
  const newChangelog = await formatChangelog(
    mergeMessages(changelogs.map(log => parseChangelog(log)).flat())
  );
  await writeFile('CHANGELOG.md', newChangelog);
}
