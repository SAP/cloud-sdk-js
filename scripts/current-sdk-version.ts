import { readFileSync } from 'fs';

export const currentSdkVersion = JSON.parse(
  readFileSync('package.json', 'utf8')
).version as string;
