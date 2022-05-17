import { readFile } from 'fs/promises';
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
  packageName: string;
  commit: string;
  type: typeof validMessageTypes[number];
  version: string;
  message: string;
}

async function getChangelog(): Promise<void> {
  const files = new GlobSync('packages/*/CHANGELOG.md').found;
  for (const file of files) {
    const text = await readFile(file, { encoding: 'utf8' });
    console.log(parseChangelog(text));
  }
}

function getPackageName(changelog: string): string {
  const packageNameRegex = /^# @sap-cloud-sdk\/(.+)$/m;
  const title = changelog.match(packageNameRegex);

  if (!changelog.startsWith('# @sap-cloud-sdk/') || !title || !title[1]) {
    throw new Error('Changelog should have package name on first line');
  }

  return title[1];
}

function splitByVersion(changelog: string): any[] {
  // Explaination: https://regex101.com/r/wCKs2A/2
  const versionRegex = /## ([0-9]+\.[0-9]+\..+)([^]*?)(?=(\n## |$))/g;
  const matches = changelog.matchAll(versionRegex);
  const results: any[] = [];
  for (const match of matches) {
    results.push({
      version: match[1],
      content: match[2].trim()
    });
  }
  return results;
}

function parseContent(
  content: string,
  version: string,
  packageName: string
): Message[] {
  // I'm sorry... explaination: https://regex101.com/r/9UhEwo/1
  const contentRegex =
    /- ((?<commit>.*):) (\[(?<type>.*?)\]) (?<message>[^]*?)(?=(\n- |\n### |$))|- Updated dependencies \[(?<depsCommit>.*)\]\n(?<deps>[^]*?)\n*(?=(\n- |\n### |$))/g;
  const results: Message[] = [];
  for (const message of content.matchAll(contentRegex)) {
    if (!message.groups?.commit && !message.groups?.depsCommit) {
      throw new Error(
        `No commit hash found for change set in ${packageName} for version ${version}!`
      );
    }
    if (
      !validMessageTypes.includes(message.groups?.type as any) &&
      !message[0].includes('Updated dependencies')
    ) {
      throw new Error(
        `Change set has an incorrect or missing type for change set in ${packageName} for version ${version}!`
      );
    }
    results.push({
      packageName,
      version,
      commit: message.groups?.commit || message.groups?.depsCommit,
      type: (message.groups?.type as any) || 'Updated Dependencies',
      message: message.groups?.message || message.groups?.deps
    });
  }
  return results;
}

function parseChangelog(changelog: string): any[] {
  const packageName = getPackageName(changelog);
  const versions = splitByVersion(changelog);
  return versions
    .map(({ version, content }) => parseContent(content, version, packageName))
    .flat();
}

getChangelog();
