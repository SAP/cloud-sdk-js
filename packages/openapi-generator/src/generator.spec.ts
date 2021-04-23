import { resolve } from 'path';
import { existsSync } from 'fs';
import mock from 'mock-fs';
import { readJSON } from '@sap-cloud-sdk/util';
import { getSdkVersion, getInputFilePaths } from './generator';

// FIXME: These tests are dangerous, because they operate on local data, that has to be generated and does not reside in the package directory, which should not be the case for unit tests.
// As soon as we have mocking in place this should be exchanged.
describe('generator', () => {
  const testServicePath = resolve(
    __dirname,
    '../../../test-packages/test-services/openapi/test-service'
  );

  it('getSdkVersion returns a valid stable version', async () => {
    expect((await getSdkVersion()).split('.').length).toBe(3);
  });

  it('getInputFilePaths returns an array of all file paths, including subdirectories', async () => {
    mock({
      '/path/to/test/dir': {
        'test-service.txt': 'file content here',
        'empty-dir': {},
        'sub-dir': {
          'test-service.txt': 'another fake service',
          'sub-directory-service.txt': 'just to add some more'
        }
      }
    });

    expect(await getInputFilePaths('/path/to/test/dir')).toEqual([
      '/path/to/test/dir/sub-dir/sub-directory-service.txt',
      '/path/to/test/dir/sub-dir/test-service.txt',
      '/path/to/test/dir/test-service.txt'
    ]);

    mock.restore();
  });

  it('should transpile the generated sources', () => {
    const defaultApi = resolve(testServicePath, 'default-api.js');
    expect(existsSync(defaultApi)).toBe(true);
    const entityApi = resolve(testServicePath, 'entity-api.js');
    expect(existsSync(entityApi)).toBe(true);
    const testCaseApi = resolve(testServicePath, 'test-case-api.js');
    expect(existsSync(testCaseApi)).toBe(true);
    const extensionApi = resolve(testServicePath, 'extension-api.js');
    expect(existsSync(extensionApi)).toBe(true);
  });

  it('should create a package.json', () => {
    const packageJson = resolve(testServicePath, 'package.json');
    expect(existsSync(packageJson)).toBe(true);
  });

  it('should create a package.json with the provided version', async () => {
    const packageJson = await readJSON(
      resolve(testServicePath, 'package.json')
    );
    expect(packageJson.version).toBe('1.2.3');
  });

  it('should create a tsconfig.json', () => {
    const tsconfig = resolve(testServicePath, 'tsconfig.json');
    expect(existsSync(tsconfig)).toBe(true);
  });

  it('should create changelog', () => {
    const changelog = resolve(testServicePath, 'CHANGELOG.md');
    expect(existsSync(changelog)).toBe(true);
  });

  it('should create the second markdown md', () => {
    const testMarkdown = resolve(testServicePath, 'some-test-markdown.md');
    expect(existsSync(testMarkdown)).toBe(true);
  });

  it('should create a readme', () => {
    const readme = resolve(testServicePath, 'README.md');
    expect(existsSync(readme)).toBe(true);
  });
});
