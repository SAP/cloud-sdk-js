import { resolve } from 'path';
import { existsSync, promises } from 'fs';
import mock from 'mock-fs';
import { readJSON } from '@sap-cloud-sdk/util';
import { getSdkVersion } from '@sap-cloud-sdk/generator-common';
import { emptyDocument } from '../test/test-util';
import { generate, getInputFilePaths } from './generator';

const { readFile } = promises;

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

  describe('optionsPerService', () => {
    beforeEach(() => {
      mock({
        inputDir: {
          'spec.json': JSON.stringify({
            ...emptyDocument,
            paths: {
              '/path': { get: { response: { type: 'string' } } }
            },
            components: {
              schemas: { test: { type: 'string' } }
            }
          })
        },
        existingConfig:
          '{ "inputDir/spec.json": {"directoryName": "customName" } }'
      });
    });

    afterEach(() => {
      mock.restore();
    });

    it('writes options per service', async () => {
      await generate({
        input: 'inputDir',
        outputDir: 'out',
        optionsPerService: 'options.json'
      });

      await expect(readFile('options.json', 'utf8')).resolves
        .toMatchInlineSnapshot(`
              "{
                \\"inputDir/spec.json\\": {
                  \\"packageName\\": \\"spec\\",
                  \\"directoryName\\": \\"spec\\"
                }
              }"
            `);
    });

    it('overwrites writes options per service', async () => {
      await generate({
        input: 'inputDir',
        outputDir: 'out',
        optionsPerService: 'existingConfig'
      });

      await expect(readFile('existingConfig', 'utf8')).resolves
        .toMatchInlineSnapshot(`
              "{
                \\"inputDir/spec.json\\": {
                  \\"packageName\\": \\"spec\\",
                  \\"directoryName\\": \\"customName\\"
                }
              }"
            `);
    });
  });

  describe('overwrite', () => {
    beforeAll(() => {
      mock({
        specs: {
          'spec.json': JSON.stringify({
            ...emptyDocument,
            paths: {
              '/path': { get: { response: { type: 'string' } } }
            },
            components: {
              schemas: { test: { type: 'string' } }
            }
          })
        },
        out: {
          spec: { schema: { 'test.ts': 'some content' } }
        }
      });
    });

    afterAll(() => {
      mock.restore();
    });

    it('fails to overwrite by default', async () => {
      await expect(() =>
        generate({
          input: 'specs',
          outputDir: 'out'
        })
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
              "Could not generate client. Errors: [
              	ErrorWithCause: Could not write file. File already exists. If you want to allow overwriting files, enable the \`overwrite\` flag.
              ]"
            `);
    });

    it.only('does not fail when overwrite is enabled', async () => {
      await expect(
        generate({
          input: 'specs',
          outputDir: 'out',
          overwrite: true
        })
      ).resolves.toBeUndefined();
    });
  });
});
