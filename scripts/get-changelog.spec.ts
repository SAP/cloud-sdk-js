jest.mock('fs', () => require('memfs').fs);
jest.mock('fs/promises', () => require('memfs').fs.promises);
jest.mock('node:fs', () => require('memfs').fs);
jest.mock('node:fs/promises', () => require('memfs').fs.promises);

import { vol } from 'memfs';
import { getChangelog } from './get-changelog';

describe('get changelog', () => {
  afterEach(() => {
    vol.reset();
  });

  it('should return correct changelog for specific version', async () => {
    vol.fromJSON(
      {
        'CHANGELOG.md': `
# @sap-cloud-sdk/test

# 3.0.2

## completed issue 3

# 3.0.1

## completed issue 2

# 3.0.0

## completed issue 1
`
      },
      process.cwd()
    );
    expect(await getChangelog('3.0.2')).toBe('## completed issue 3\n');
    expect(await getChangelog('3.0.1')).toBe('## completed issue 2\n');
    expect(await getChangelog('3.0.0')).toBe('## completed issue 1\n');
  });

  it('should return empty string when version not found', () => {
    vol.fromJSON(
      {
        'CHANGELOG.md': `
# @sap-cloud-sdk/test

# 3.0.2

## completed issue 3
`
      },
      process.cwd()
    );
    expect(async () => {
      await getChangelog('3.0.0');
    }).toThrow();
  });
});
