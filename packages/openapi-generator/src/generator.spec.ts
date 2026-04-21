// eslint-disable-next-line import/order
import { mockFsWithUnionfs } from '@sap-cloud-sdk/test-util-internal/fs-mocker';
mockFsWithUnionfs(jest);
import { resolve } from 'path';
import { existsSync, promises } from 'fs';
import { jest } from '@jest/globals';
import { vol } from 'memfs';
import prettier from 'prettier';
import { getInputFilePaths } from '@sap-cloud-sdk/generator-common/internal';
import { emptyDocument } from '../test/test-util';
import { generate } from './generator';

jest.mock('../../generator-common/internal', () => {
  const actual = jest.requireActual('../../generator-common/internal');
  return { ...actual, getSdkVersion: async () => '1.2.3' };
});

const { readFile } = promises;

describe('generator', () => {
  afterEach(() => {
    vol.reset();
  });

  describe('get input file paths', () => {
    beforeEach(() => {
      vol.fromNestedJSON(
        {
          root: {
            inputDir: {
              'test-service.txt': 'dummy text specification file',
              'test-service.json': 'dummy json specification file',
              'test-service.JSON': 'dummy JSON specification file',
              'test-service.yaml': 'dummy yaml specification file',
              'empty-dir': { '.keep': '' },
              'sub-dir': {
                'test-service.YAML': 'dummy YAML specification file',
                'test-service.yml': 'dummy yml specification file',
                'test-service.YML': 'dummy YML specification file',
                'test-service.xml': 'dummy xml specification file',
                'test-service2.json': 'dummy json specification file'
              }
            },
            outputDir: { '.keep': '' }
          }
        },
        process.cwd()
      );
    });

    afterEach(() => {
      vol.reset();
    });

    const input = 'root/inputDir';

    it('should return an array with one file path for an input file', () => {
      expect(
        getInputFilePaths('root/inputDir/test-service.json', 'OpenApi')
      ).toEqual([resolve(input, 'test-service.json')]);
    });

    it('should return an array with all JSON and YAML file paths within the input directory and all subdirectories', () => {
      expect(getInputFilePaths(input, 'OpenApi')).toEqual([
        resolve(input, 'sub-dir/test-service.YAML'),
        resolve(input, 'sub-dir/test-service.YML'),
        resolve(input, 'sub-dir/test-service.yml'),
        resolve(input, 'sub-dir/test-service2.json'),
        resolve(input, 'test-service.JSON'),
        resolve(input, 'test-service.json'),
        resolve(input, 'test-service.yaml')
      ]);
    });

    it('should return an array with all `.json` files within the input directory and all subdirectories', () => {
      expect(getInputFilePaths('root/inputDir/**/*.json', 'OpenApi')).toEqual([
        resolve(input, 'sub-dir/test-service2.json'),
        resolve(input, 'test-service.json')
      ]);
    });

    it('should return an array with all JSON and YAML file paths within the input directory', () => {
      expect(getInputFilePaths('root/inputDir/*', 'OpenApi')).toEqual([
        resolve(input, 'test-service.JSON'),
        resolve(input, 'test-service.json'),
        resolve(input, 'test-service.yaml')
      ]);
    });

    it('should return an array with all matching JSON and YAML files within the input directory', () => {
      expect(
        getInputFilePaths('root/inputDir/*.{json,yaml}', 'OpenApi')
      ).toEqual([
        resolve(input, 'test-service.json'),
        resolve(input, 'test-service.yaml')
      ]);
    });
  });

  describe('creation of files', () => {
    const prettierSpy = jest.spyOn(prettier, 'format');

    beforeEach(async () => {
      vol.reset();
      const inputFile = resolve(
        __dirname,
        '../../../test-resources/openapi-service-specs/specifications/test-service.json'
      );
      const serviceSpec = await promises.readFile(inputFile, {
        encoding: 'utf8'
      });
      vol.fromNestedJSON(
        {
          '/prettier/config': JSON.stringify({ printWidth: 66 }),
          root: {
            inputDir: { 'mySpec.json': serviceSpec },
            additionalFiles: {
              'CHANGELOG.md': 'some content',
              'OtherFile.txt': 'some content'
            },
            outputDir: { '.keep': '' }
          }
        },
        process.cwd()
      );

      await generate({
        input: 'root/inputDir/*.json',
        outputDir: 'root/outputDir',
        skipValidation: true,
        transpile: true,
        metadata: true,
        prettierConfig: '/prettier/config',
        include: 'root/additionalFiles/*',
        readme: true,
        packageJson: true,
        clearOutputDir: true
      });
    }, 80000);

    const outputPath = resolve('root', 'outputDir', 'mySpec');
    const inputPath = resolve('root', 'inputDir');

    afterEach(() => {
      jest.clearAllMocks();
      vol.reset();
    });

    it('reads custom prettier configuration', () => {
      expect(prettierSpy).toHaveBeenCalledWith(expect.any(String), {
        parser: expect.any(String),
        printWidth: 66
      });
    });

    it('should transpile the generated sources', async () => {
      const actualFiles = await promises.readdir(outputPath);

      const expectedFiles: string[] = [];
      ['default-api', 'entity-api', 'test-case-api'].forEach(file =>
        ['js', 'd.ts'].forEach(postfix =>
          expectedFiles.push(`${file}.${postfix}`)
        )
      );

      expectedFiles.forEach(expectedFile =>
        expect(actualFiles.includes(expectedFile)).toBe(true)
      );
    });

    it('should create a package.json', () => {
      const packageJson = resolve(outputPath, 'package.json');
      expect(existsSync(packageJson)).toBe(true);
    });

    it('should create a package.json with the default version', async () => {
      const packageJson = JSON.parse(
        await readFile(resolve(outputPath, 'package.json'), 'utf8')
      );
      expect(packageJson.version).toBe('1.0.0');
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
      vol.fromNestedJSON(
        {
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
            '{ "inputDir/spec.json": {"directoryName": "customName" , "basePath": "/base/path/for/service" } }',
          anotherConfig:
            '{ "inputDir/spec2.json": {"directoryName": "customName" } }'
        },
        process.cwd()
      );
    });

    afterEach(() => {
      vol.reset();
    });

    it('writes options per service', async () => {
      await generate({
        input: 'inputDir',
        outputDir: 'out',
        optionsPerService: 'options.json'
      });

      const actual = await readFile('options.json', 'utf8');
      expect(actual).toMatch(endsWithNewLine);
      await expect(JSON.parse(actual)).toEqual({
        'inputDir/spec.json': {
          packageName: 'spec',
          directoryName: 'spec'
        }
      });
    });

    it('overwrites writes options per service', async () => {
      await generate({
        input: 'inputDir',
        outputDir: 'out',
        optionsPerService: 'existingConfig'
      });

      const actual = await readFile('existingConfig', 'utf8');
      await expect(actual).toMatch(endsWithNewLine);
      await expect(JSON.parse(actual)).toEqual({
        'inputDir/spec.json': {
          packageName: 'customname',
          directoryName: 'customName',
          basePath: '/base/path/for/service'
        }
      });
    });

    it('merges options per service', async () => {
      await generate({
        input: 'inputDir',
        outputDir: 'out',
        optionsPerService: 'anotherConfig'
      });

      const actual = await readFile('anotherConfig', 'utf8');
      await expect(actual).toMatch(endsWithNewLine);
      await expect(JSON.parse(actual)).toEqual({
        'inputDir/spec2.json': {
          directoryName: 'customName'
        },
        'inputDir/spec.json': {
          packageName: 'spec',
          directoryName: 'spec'
        }
      });
    });
  });

  describe('overwrite', () => {
    beforeEach(() => {
      vol.fromNestedJSON(
        {
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
          out: { spec: { schema: { 'test.ts': 'some content' } } }
        },
        process.cwd()
      );
    });

    afterEach(() => {
      vol.reset();
    });

    it('fails to overwrite by default', async () => {
      await expect(() =>
        generate({
          input: 'specs',
          outputDir: 'out'
        })
      ).rejects.toThrow(
        /File already exists. If you want to allow overwriting files/
      );
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
