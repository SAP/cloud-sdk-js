import {
  VdmActionImport,
  VdmFunctionImport,
  VdmParameter,
  VdmServiceMetadata
} from '../vdm-types';
import {
  getActionFunctionImport,
  getActionFunctionParams,
  getFunctionWithMinParameters,
  getFunctionWithoutParameters,
  getLevensteinClosestFunction,
  getODataEntity
} from './code-sample-util';

describe('code-sample-utils entity', () => {
  it('gets entity based on levenshtein algorithm', () => {
    const service = {
      originalFileName: 'DummyClass',
      entities: [{ className: 'DummyCollection' }, { className: 'DummyClass' }]
    } as VdmServiceMetadata;
    expect(getODataEntity(service.originalFileName, service.entities)).toEqual(
      service.entities[1]
    );
  });

  it('gets entity with shortest name when closest match is not found', () => {
    const service = {
      originalFileName: 'DummyClass',
      entities: [{ className: 'TestEntity' }, { className: 'TestCollection' }]
    } as VdmServiceMetadata;
    expect(getODataEntity(service.originalFileName, service.entities)).toEqual(
      service.entities[0]
    );
  });
});
describe('code-sample-utils imports', () => {
  const functionImportsZeroParams = [
    { name: 'serviceFunctionA', parameters: [] },
    { name: 'serviceFunctionB', parameters: [{ parameterName: 'dummyParam' }] }
  ] as VdmFunctionImport[];

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
  ] as VdmFunctionImport[];

  it('gets function import based on levenshtein algorithm', () => {
    const functionImports = [
      { name: 'some_Other_Function' },
      { name: 'dummy_Class_Func' }
    ] as VdmFunctionImport[];
    expect(getLevensteinClosestFunction('DummyClass', functionImports)).toEqual(
      functionImports[1]
    );
  });

  it('gets undefined when func import based on levenshtein algorithm is not found', () => {
    expect(
      getLevensteinClosestFunction('DummyClass', functionImportsZeroParams)
    ).toBeUndefined();
  });

  it('gets func import without parameters when no closest match found', () => {
    expect(getFunctionWithoutParameters(functionImportsZeroParams)).toEqual(
      functionImportsZeroParams[0]
    );
  });

  it('gets func import with min parameters when methods without params not found ', () => {
    expect(getFunctionWithMinParameters(functionImportsMinParams)).toEqual(
      functionImportsMinParams[0]
    );
  });

  it('gets action import', () => {
    const actionsImports = [
      { name: 'service_Actn', parameters: [] },
      { name: 'dummy_Class_Actn', parameters: [{ parameterName: 'param' }] }
    ] as VdmActionImport[];
    expect(getActionFunctionImport('DummyClass', actionsImports!)).toEqual(
      actionsImports![1]
    );
  });
});

describe('code-sample-utils parameters', () => {
  it('gets the parameter string for 2 parameters', () => {
    const parameters = [
      { parameterName: 'dummyParam1' },
      { parameterName: 'dummyParam2' }
    ] as VdmParameter[];
    expect(getActionFunctionParams(parameters)).toMatchInlineSnapshot(
      "\"{ dummyParam1: 'dummyParam1', dummyParam2: 'dummyParam2' }\""
    );
  });

  it('gets the parameter string for 3 or more parameters', () => {
    const parameters = [
      { parameterName: 'dummyParam1' },
      { parameterName: 'dummyParam2' },
      { parameterName: 'dummyParam3' }
    ] as VdmParameter[];
    expect(getActionFunctionParams(parameters)).toMatchInlineSnapshot(
      "\"{ dummyParam1: 'dummyParam1', dummyParam2: 'dummyParam2', ... }\""
    );
  });
});
