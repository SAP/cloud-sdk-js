import { resolve } from 'path';
import { writeFile, readFile, removeSync } from 'fs-extra';
import execa from 'execa';
import { VdmServiceMetadata } from '../vdm-types';
import { getApiSpecificUsage } from './generation-and-usage';
import { entityCodeSample } from './code-samples';

describe('generation-and-usage', () => {
  const service = {
    npmPackageName: '@sap/dummy-package',
    originalFileName: 'DummyClass',
    directoryName: 'dummy-service',
    className: 'dummyService',
    entities: [{ className: 'DummyCollection' }, { className: 'DummyClass' }]
  } as VdmServiceMetadata;

  const serviceWithFunctionImport = {
    npmPackageName: '@sap/dummy-package',
    originalFileName: 'Dummy',
    functionImports: [
      {
        name: 'dummyFunc',
        parametersTypeName: 'dummyParamType',
        parameters: [
          { parameterName: 'dummyParam1' },
          { parameterName: 'dummyParam2' },
          { parameterName: 'dummyParam3' }
        ]
      }
    ]
  } as VdmServiceMetadata;

  const serviceWithMultipleImports = {
    npmPackageName: '@sap/dummy-package',
    originalFileName: 'Dummy',
    functionImports: [
      {
        name: 'dummyFunc',
        httpMethod: 'get',
        parametersTypeName: 'dummyParamType',
        parameters: [{ parameterName: 'dummyParam1' }]
      },
      {
        name: 'dummyFunction',
        httpMethod: 'get',
        parameters: [
          { parameterName: 'dummyParam2' },
          { parameterName: 'dummyParam3' }
        ]
      }
    ]
  } as VdmServiceMetadata;

  const serviceWithActionImport = {
    npmPackageName: '@sap/dummy-package',
    originalFileName: 'Dummy',
    actionImports: [
      {
        name: 'dummyActionImport',
        httpMethod: 'get',
        parametersTypeName: 'dummyParamType',
        parameters: [{ parameterName: 'dummyParam1' }]
      }
    ]
  } as VdmServiceMetadata;

  it('creates api specific usage for entity', () => {
    expect(getApiSpecificUsage(service)).toMatchSnapshot();
  });

  it('create api specific usage for function import', () => {
    expect(getApiSpecificUsage(serviceWithFunctionImport)).toMatchSnapshot();
  });

  it('create api specific usage for function import with minimum parameters', () => {
    expect(getApiSpecificUsage(serviceWithMultipleImports)).toMatchSnapshot();
  });

  it('create api specific usage for action import', () => {
    expect(getApiSpecificUsage(serviceWithActionImport)).toMatchSnapshot();
  });

  xit('creates compiling generic usage', async () => {
    const codeSnippet = entityCodeSample(
      'TestEntity',
      'TestService',
      '@sap-cloud-sdk/test-services-odata-v2/test-service'
    );
    const tsFile = 'generic-get-all-code-sample.ts';
    const jsFile = tsFile.replace('.ts', '.js');
    await writeFile(resolve(__dirname, tsFile), codeSnippet);
    await execa('npx', [
      'tsc',
      resolve(__dirname, tsFile),
      '--esModuleInterop',
      '--target',
      'es2019',
      '--module',
      'commonjs'
    ]);
    await expect(readFile(resolve(__dirname, jsFile))).resolves.toBeDefined();
    [tsFile, jsFile].map(file => removeSync(resolve(__dirname, file)));
  }, 60000);
});
