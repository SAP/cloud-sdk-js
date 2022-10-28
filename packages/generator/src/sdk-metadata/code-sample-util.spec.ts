import { getLevenshteinClosest } from '@sap-cloud-sdk/generator-common/internal';
import { VdmEntity, VdmOperation, VdmParameter } from '../vdm-types';
import {
  sampleOperationImport,
  getOperationParams,
  getOperationWithMinParameters,
  getOperationWithoutParameters,
  getODataEntity
} from './code-sample-util';

describe('code-sample-utils entity', () => {
  it('gets entity based on levenshtein algorithm', () => {
    const entities = [
      { className: 'DummyCollection' },
      { className: 'DummyClass' }
    ] as VdmEntity[];

    expect(getODataEntity('DummyClass', entities)).toEqual({
      className: 'DummyClass'
    });
  });

  it('gets entity with shortest name when closest match is not found', () => {
    const entities = [
      { className: 'TestEntity' },
      { className: 'TestCollection' }
    ] as VdmEntity[];

    expect(getODataEntity('DummyClass', entities)).toEqual({
      className: 'TestEntity'
    });
  });
});
describe('code-sample-utils imports', () => {
  const extractorFn = (x: VdmOperation) => x.name;
  it('gets function import based on levenshtein algorithm', () => {
    const functionImports = [
      { name: 'dummy_Class_Func' },
      { name: 'some_Other_Function' }
    ] as VdmOperation[];

    expect(
      getLevenshteinClosest('DummyClass', functionImports, extractorFn)
    ).toEqual({ name: 'dummy_Class_Func' });
  });

  const functionImportsZeroParams = [
    { name: 'serviceFuncA', parameters: [{ parameterName: 'dummyParam' }] },
    { name: 'serviceFuncB', parameters: [] },
    {
      name: 'serviceFuncC',
      parameters: [
        { parameterName: 'dummyParam' },
        { parameterName: 'dummyParam' }
      ]
    }
  ] as VdmOperation[];

  it('gets undefined when func import based on levenshtein algorithm is not found', () => {
    expect(
      getLevenshteinClosest(
        'DummyClass',
        functionImportsZeroParams,
        extractorFn
      )
    ).toBeUndefined();
  });

  it('gets func import without parameters when no closest match found', () => {
    expect(getOperationWithoutParameters(functionImportsZeroParams)).toEqual({
      name: 'serviceFuncB',
      parameters: []
    });
  });

  const functionImportsMinParams = [
    {
      name: 'serviceFunctionA',
      parameters: [{ parameterName: 'dummyParam1' }]
    },
    {
      name: 'serviceFunctionB',
      parameters: [
        { parameterName: 'dummyParam2' },
        { parameterName: 'dummyParam3' }
      ]
    }
  ] as VdmOperation[];
  it('gets func import with min parameters when methods without params not found ', () => {
    expect(getOperationWithMinParameters(functionImportsMinParams)).toEqual({
      name: 'serviceFunctionA',
      parameters: [{ parameterName: 'dummyParam1' }]
    });
  });

  const actionImports = [
    { name: 'service_Actn', parameters: [] },
    {
      name: 'dummy_Class_Actn',
      parameters: [{ parameterName: 'param' }]
    }
  ];

  it('samples action import based on levenshtein algorithm', () => {
    expect(
      sampleOperationImport('DummyClass', actionImports as VdmOperation[])
    ).toEqual({
      name: 'dummy_Class_Actn',
      parameters: [{ parameterName: 'param' }]
    });
  });

  it('gets action import without min parameters when no closest match found', () => {
    expect(
      sampleOperationImport('API_TestAction', actionImports as VdmOperation[])
    ).toEqual({
      name: 'service_Actn',
      parameters: []
    });
  });
});

describe('code-sample-utils parameters', () => {
  it('gets the parameter string for 2 parameters', () => {
    const parameters = [
      { parameterName: 'dummyParam1' },
      { parameterName: 'dummyParam2' }
    ] as VdmParameter[];
    expect(getOperationParams(parameters)).toMatchInlineSnapshot(
      "\"{ dummyParam1: 'dummyParam1', dummyParam2: 'dummyParam2' }\""
    );
  });

  it('gets the parameter string for 3 or more parameters', () => {
    const parameters = [
      { parameterName: 'dummyParam1' },
      { parameterName: 'dummyParam2' },
      { parameterName: 'dummyParam3' }
    ] as VdmParameter[];
    expect(getOperationParams(parameters)).toMatchInlineSnapshot(
      "\"{ dummyParam1: 'dummyParam1', dummyParam2: 'dummyParam2', ... }\""
    );
  });
});
