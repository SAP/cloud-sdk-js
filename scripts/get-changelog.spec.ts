import mock from 'mock-fs';
import { getChangelog } from './get-changelog';

describe('get changelog', () => {
  afterEach(() => {
    mock.restore();
  });

  it('should return correct changelog for specific version', () => {
    mock({
      'CHANGELOG.md': `
# @sap-cloud-sdk/test

# 3.0.2

## completed issue 3

# 3.0.1

## completed issue 2

# 3.0.0

## completed issue 1
`
    });
    expect(getChangelog('3.0.2')).toBe('## completed issue 3\n');
    expect(getChangelog('3.0.1')).toBe('## completed issue 2\n');
    expect(getChangelog('3.0.0')).toBe('## completed issue 1\n');
  });

  it('should return empty string when version not found', () => {
    mock({
      'CHANGELOG.md': `
# @sap-cloud-sdk/test

# 3.0.2

## completed issue 3
`
    });
    expect(() => {
        getChangelog('3.0.0');
      }).toThrow();
  });
});
