import { resolve } from 'path';
import { existsSync, promises } from 'fs';
import mock from 'mock-fs';
import { readJSON } from '@sap-cloud-sdk/util';
import { emptyDocument } from '../test/test-util';
import { generate, getInputFilePaths } from './generator';

jest.mock('../../generator-common', () => {
  const actual = jest.requireActual('../../generator-common');
  return { ...actual, getSdkVersion: async () => '1.2.3' };
});

const { readFile } = promises;

describe('generator', () => {
  afterAll(() => {
    mock.restore();
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

  describe('creation of files', () => {
    beforeAll(async () => {
      mock.restore();
      const inputFile = resolve(
        __dirname,
        '../../../test-resources/openapi-service-specs/test-service.json'
      );
      const serviceSpec = await promises.readFile(inputFile, {
        encoding: 'utf8'
      });
      const rootNodeModules = resolve(__dirname, '../../../node_modules');
      mock({
        root: {
          inputDir: { 'mySpec.json': serviceSpec },
          additionalFiles: {
            'CHANGELOG.md': 'some content',
            'OtherFile.txt': 'some content'
          },
          outputDir: {}
        },
        [rootNodeModules]: mock.load(rootNodeModules)
      });

      await generate({
        input: 'root/inputDir/mySpec.json',
        outputDir: 'root/outputDir',
        skipValidation: true,
        transpile: true,
        metadata: true,
        include: 'root/additionalFiles/*',
        readme: true,
        packageJson: true,
        packageVersion: '1.2.3'
      });
    }, 20000);

    const outputPath = resolve('root', 'outputDir', 'mySpec');
    const inputPath = resolve('root', 'inputDir');

    afterAll(() => {
      jest.clearAllMocks();
      mock.restore();
    });

    it('should transpile the generated sources', async () => {
      const files = await promises.readdir(outputPath);

      const expectedFiles: string[] = [];
      ['default-api', 'entity-api', 'test-case-api'].forEach(file =>
        ['js', 'd.ts.map', 'd.ts'].forEach(postfix =>
          expectedFiles.push(`${file}.${postfix}`)
        )
      );

      expect(files).toIncludeAllMembers(expectedFiles);
    });

    it('should create a package.json', () => {
      const packageJson = resolve(outputPath, 'package.json');
      expect(existsSync(packageJson)).toBe(true);
    });

    it('should create a package.json with the provided version', async () => {
      const packageJson = await readJSON(resolve(outputPath, 'package.json'));
      expect(packageJson.version).toBe('1.2.3');
    });

    it('should create a tsconfig.json', () => {
      const tsconfig = resolve(outputPath, 'tsconfig.json');
      expect(existsSync(tsconfig)).toBe(true);
    });

    it('should copy additional files', () => {
      ['CHANGELOG.md', 'OtherFile.txt'].map(file => {
        const filePath = resolve(outputPath, file);
        expect(existsSync(filePath)).toBe(true);
      });
    });

    it('should create a README.md', () => {
      const readme = resolve(outputPath, 'README.md');
      expect(existsSync(readme)).toBe(true);
    });

    it('should create metadata header', () => {
      const metaDataHeader = resolve(
        inputPath,
        'sdk-metadata/mySpec_HEADER.json'
      );
      expect(existsSync(metaDataHeader)).toBe(true);
    });

    it('should create metadata client', () => {
      const metaDataHeader = resolve(
        inputPath,
        'sdk-metadata/mySpec_CLIENT_JS.json'
      );
      expect(existsSync(metaDataHeader)).toBe(true);
    });
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

      const actual = readFile('options.json', 'utf8');
      await expect(actual).resolves.toMatch(endsWithNewLine);
      await expect(actual).resolves.toMatchInlineSnapshot(`
              "{
                \\"inputDir/spec.json\\": {
                  \\"packageName\\": \\"spec\\",
                  \\"directoryName\\": \\"spec\\",
                  \\"serviceName\\": \\"spec\\"
                }
              }
              "
            `);
    });

    it('overwrites writes options per service', async () => {
      await generate({
        input: 'inputDir',
        outputDir: 'out',
        optionsPerService: 'existingConfig'
      });

      const actual = readFile('existingConfig', 'utf8');
      await expect(actual).resolves.toMatch(endsWithNewLine);
      await expect(actual).resolves.toMatchInlineSnapshot(`
              "{
                \\"inputDir/spec.json\\": {
                  \\"packageName\\": \\"customName\\",
                  \\"directoryName\\": \\"customName\\",
                  \\"serviceName\\": \\"customName\\"
                }
              }
              "
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

    it('does not fail when overwrite is enabled', async () => {
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

const endsWithNewLine = /\n$/;
