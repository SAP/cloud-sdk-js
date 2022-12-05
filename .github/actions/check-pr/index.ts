import { setOutput, getInput, setFailed } from '@actions/core';
import { context } from '@actions/github';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const validCommitTypes = ['feat', 'fix', 'chore'];
interface ParsedTitle {
  commitType?: string;
  topic?: string;
  isBreaking: boolean;
  description?: string;
}

function parseTitle(title: string): ParsedTitle {
  const groups = title.match(
    /(?<commitType>\w+)(\((?<topic>\w+)\))?(?<isBreaking>!)?: (?<description>.*)/
  ).groups;
  if (groups) {
    return { ...groups, isBreaking: !!groups.isBreaking };
  } else {
    throw new Error('Could not parse PR title');
  }
}

function validateCommitType(commitType: string | undefined): void {
  if (!commitType || !validCommitTypes.includes(commitType)) {
    setFailed(
      `PR title does not adhere to conventional commit guidelines. Commit type found: ${commitType}. Should be one of ${validCommitTypes.join(
        ', '
      )}`
    );
  }
}

function validateDescription(description: string | undefined): void {
  if (!description) {
    setFailed(`PR title does not include a description.`);
  }

  if (description[0] === description[0].toLowerCase()) {
    setFailed(`PR title description should start with capital case.`);
  }
}

async function validateChangelog(allowedBumps: string[]): Promise<void> {
  const changedFiles = JSON.parse(getInput('changed-files'));
  const fileContents = await Promise.all(
    changedFiles.map(file => readFile(file, 'utf-8'))
  );
  fileContents.some(fileContent =>
    allowedBumps.some(bump =>
      new RegExp(`'@sap-cloud-sdk\/\w+': ${bump}/`).test(fileContent)
    )
  );
}

function getAllowedBumps(commitType: string, isBreaking: boolean): string[] {
  if (isBreaking) {
    return ['major'];
  }
  if (commitType === 'feat') {
    return ['minor'];
  }
  if (commitType === 'fix') {
    return ['minor', 'patch'];
  }
  return [];
}

const { commitType, isBreaking, description } = parseTitle(
  context.payload.pull_request.title
);

validateCommitType(commitType);
validateDescription(description);
validateChangelog(getAllowedBumps(commitType, isBreaking));
