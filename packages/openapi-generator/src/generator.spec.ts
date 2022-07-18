import { resolve } from 'path';
import { existsSync, promises } from 'fs';
import mock from 'mock-fs';
import { createLogger, readJSON } from '@sap-cloud-sdk/util';
import { emptyDocument } from '../test/test-util';
import { generate, getInputFilePaths } from './generator';

jest.mock('../../generator-common/internal', () => {
  const actual = jest.requireActual('../../generator-common/internal');
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
      resolve('/path/to/test/dir/sub-dir/sub-directory-service.txt'),
      resolve('/path/to/test/dir/sub-dir/test-service.txt'),
      resolve('/path/to/test/dir/test-service.txt')
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
    }, 80000);

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
      const packageJson = readJSON(resolve(outputPath, 'package.json'));
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
          '{ "inputDir/spec.json": {"directoryName": "customName" } }',
        anotherConfig:
          '{ "inputDir/spec2.json": {"directoryName": "customName" } }'
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
      await expect(actual).resolves.toMatch(
        JSON.stringify(
          {
            'inputDir/spec.json': {
              packageName: 'spec',
              directoryName: 'spec',
              serviceName: 'spec'
            }
          },
          null,
          2
        )
      );
    });

    it('overwrites writes options per service', async () => {
      await generate({
        input: 'inputDir',
        outputDir: 'out',
        optionsPerService: 'existingConfig'
      });

      const actual = readFile('existingConfig', 'utf8');
      await expect(actual).resolves.toMatch(endsWithNewLine);
      await expect(actual).resolves.toMatch(
        JSON.stringify(
          {
            'inputDir/spec.json': {
              packageName: 'customName',
              directoryName: 'customName',
              serviceName: 'customName'
            }
          },
          null,
          2
        )
      );
    });

    it('merges options per service', async () => {
      await generate({
        input: 'inputDir',
        outputDir: 'out',
        optionsPerService: 'anotherConfig'
      });

      const actual = readFile('anotherConfig', 'utf8');
      await expect(actual).resolves.toMatch(endsWithNewLine);
      await expect(actual).resolves.toMatch(
        JSON.stringify(
          {
            'inputDir/spec2.json': {
              directoryName: 'customName'
            },
            'inputDir/spec.json': {
              packageName: 'spec',
              directoryName: 'spec',
              serviceName: 'spec'
            }
          },
          null,
          2
        )
      );
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
                ErrorWithCause: Could not write file \\"test.ts\\". File already exists. If you want to allow overwriting files, enable the \`overwrite\` flag.
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

  describe('two different types of specification files for the same service exist', () => {
    it('should exclude the same types YAML files as JSON files and log a warning message', async () => {
      mock.restore();
      const logger = createLogger('openapi-generator');
      const warnSpy = jest.spyOn(logger, 'warn');

      const inputFileJson = resolve(
        __dirname,
        '../../../test-resources/openapi-service-specs/test-service.json'
      );
      const serviceSpecJson = await promises.readFile(inputFileJson, {
        encoding: 'utf8'
      });

      const inputFileYaml = resolve(
        __dirname,
        '../../../test-resources/openapi-service-specs/swagger-yaml-service.yml'
      );
      const serviceSpecYaml = await promises.readFile(inputFileYaml, {
        encoding: 'utf8'
      });

      mock({
        root: {
          inputDir: {
            'test-service.json': serviceSpecJson,
            'test-service.yaml': serviceSpecYaml,
            'test-service2.json': serviceSpecJson,
            'empty-dir': {},
            'sub-dir': {
              'test-service2.yaml': serviceSpecYaml,
              'test-service3.yaml': serviceSpecYaml
            }
          },
          outputDir: {}
        }
      });

      await expect(
        generate({
          input: 'root/inputDir',
          outputDir: 'root/OutDir',
          skipValidation: true,
          overwrite: true
        })
      ).resolves.toBeUndefined();

      const generatedClients = await promises.readdir('root/OutDir')
      expect(generatedClients.length).toEqual(3)

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining("client-generating from YAML file(s) below was skipped because you placed the JSON specification file(s) for the same service in a input directory")
      )

      mock.restore();
    })

    it('should throw an error due to duplicated JSON files', async () => {
      mock.restore();

      mock({
        root: {
          inputDir: {
            'test-service.json': 'file content here',
            'sub-dir': {
              'test-service.json': 'file content here'
            }
          },
          outputDir: {}
        }
      });

      await expect(await generate({
        input: 'root/inputDir',
        outputDir: 'root/OutDir',
        overwrite: true
      })).resolves.toBeUndefined();

      mock.restore();
    });
  });
});

const endsWithNewLine = /\n$/;



