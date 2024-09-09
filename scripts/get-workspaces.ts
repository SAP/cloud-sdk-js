import { readFile } from 'fs/promises';

async function getWorkspaces() {
  const workspaces: string[] = JSON.parse(
    await readFile('package.json', { encoding: 'utf8' })
  ).workspaces;

  console.log(workspaces.join(','));
}

getWorkspaces();
