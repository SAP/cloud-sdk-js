import { createLogger } from '@sap-cloud-sdk/util';
import { EdmxParameter, EdmxProperty } from '../../edmx-parser/common';
import {
  EdmxComplexType,
  EdmxEntitySet,
  EdmxEntityTypeV4,
  EdmxOperation,
  EdmxOperationImport
} from '../../edmx-parser/v4';
import { ServiceMetadata } from '../../edmx-parser';
import { generateEntitiesV4 } from './entity';
import {
  filterAndTransformOperations,
  generateUnboundOperations
} from './operation';
import { generateComplexTypesV4 } from './complex-type';
import { createEntityType, getComplexType, getFormatter } from './entity.spec';

describe('action-import', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('considers the isBound filter removing unbound', () => {
    const imports: EdmxOperationImport[] = [{ operationName: 'op1' } as any];
    const operations: EdmxOperation[] = [
      { Name: 'op1', IsBound: 'false' }
    ] as any;
    const joined = filterAndTransformOperations(imports, operations, true);
    expect(joined).toEqual([]);
  });

  it('considers only operations where a import matches', () => {
    const imports: EdmxOperationImport[] = [{ operationName: 'op1' } as any];
    const operations: EdmxOperation[] = [
      { Name: 'op1', IsBound: 'false' },
      { Name: 'op2', IsBound: 'false' }
    ] as any;
    const joined = filterAndTransformOperations(imports, operations, false);
    expect(joined).toEqual([{ operationName: 'op1', IsBound: false }]);
  });

  it('considers only operations where a import with namespace matches', () => {
    const imports: EdmxOperationImport[] = [{ operationName: 'ns.op1' } as any];
    const operations: EdmxOperation[] = [
      { Name: 'op1', IsBound: 'false' },
      { Name: 'op2', IsBound: 'false' }
    ] as any;
    const joined = filterAndTransformOperations(imports, operations, false);
    expect(joined).toEqual([{ operationName: 'ns.op1', IsBound: false }]);
  });

  it('removes bound operations with no parameter', () => {
    const imports: EdmxOperationImport[] = [
      { operationName: 'op1' },
      { operationName: 'op2' }
    ] as any;
    const operations: EdmxOperation[] = [
      { Name: 'op1', Parameter: [], IsBound: 'true' },
      { Name: 'op2', Parameter: [{ Type: 'ns.op2' }], IsBound: 'true' }
    ] as any;
    const joined = filterAndTransformOperations(imports, operations, true);
    expect(joined).toEqual([
      {
        operationName: 'op2',
        entitySetName: 'op2',
        IsBound: true,
        Parameter: []
      }
    ]);
  });

  it('considers bound operations', () => {
    const imports: EdmxOperationImport[] = [
      { operationName: 'op1' },
      { operationName: 'op2' }
    ] as any;
    const operations: EdmxOperation[] = [
      { Name: 'op1', Parameter: [{ Type: 'ns.Entity' }], IsBound: 'true' },
      { Name: 'op2', IsBound: 'true', Parameter: [] }
    ] as any;
    const joined = filterAndTransformOperations(imports, operations, true);
    expect(joined).toEqual([
      {
        IsBound: true,
        operationName: 'op1',
        Parameter: [],
        entitySetName: 'Entity'
      }
    ]);
  });

  it('handles bound operations with multiple dots in the name', () => {
    const imports: EdmxOperationImport[] = [
      { operationName: 'op1' },
      { operationName: 'op2' }
    ] as any;
    const operations: EdmxOperation[] = [
      {
        Name: 'op1',
        Parameter: [{ Type: 'ns.foo.bar.baz.Entity' }],
        IsBound: 'true'
      },
      { Name: 'op2', IsBound: 'true', Parameter: [] }
    ] as any;
    const joined = filterAndTransformOperations(imports, operations, true);
    expect(joined).toEqual([
      {
        IsBound: true,
        operationName: 'op1',
        Parameter: [],
        entitySetName: 'Entity'
      }
    ]);
  });

  it('considers isBound filter removing bound operations', () => {
    const imports: EdmxOperationImport[] = [{ operationName: 'op1' }] as any;
    const operations: EdmxOperation[] = [
      { Name: 'op1', Parameter: [{ Type: 'ns.Entity' }], IsBound: 'true' }
    ] as any;
    const joined = filterAndTransformOperations(imports, operations, false);
    expect(joined).toEqual([]);
  });

  it('removes first parameter for bound operations', () => {
    const imports: EdmxOperationImport[] = [{ operationName: 'op1' }] as any;
    const operations: EdmxOperation[] = [
      {
        Name: 'op1',
        Parameter: [{ Type: 'ns.Entity' }, { Type: 'para1' }],
        IsBound: 'true'
      }
    ] as any;
    const joined = filterAndTransformOperations(imports, operations, true);
    expect(joined[0].Parameter).toEqual([{ Type: 'para1' }]);
  });

  it('transforms action imports', () => {
    const formatter = getFormatter();
    const service = createServiceWithActions();
    const entities = generateEntitiesV4(service, [], [], formatter);
    const actionImport = generateUnboundOperations(
      service,
      'myServiceWithActions',
      'action',
      entities,
      [],
      formatter
    );
    expect(actionImport.length).toBe(2);

    const actionNoReturnNoParameter = actionImport.find(
      a => a.originalName === 'ActionNoReturnNoParameter'
    );
    expect(actionNoReturnNoParameter!.returnType.returnType).toBe('undefined');
    expect(actionNoReturnNoParameter!.parameters).toStrictEqual([]);

    const actionWithReturnWithParameter = actionImport.find(
      a => a.originalName === 'ActionWithReturnWithParameter'
    );
    expect(actionWithReturnWithParameter!.returnType.returnType).toBe(
      'TestEntity'
    );
    expect(actionWithReturnWithParameter!.parameters.length).toBe(1);
  });

  it('transforms entities from different namespaces', () => {
    const entityType1 = createEntityType('TestEntityType1', [], [], 'ns1');
    const entityType2 = createEntityType('TestEntityType2', [], [], 'ns2');
    const entitySet1 = createTestEntitySet(
      'TestEntity1',
      'ns1.TestEntityType1',
      [],
      'ns3'
    );
    const entitySet2 = createTestEntitySet(
      'TestEntity2',
      'ns2.TestEntityType2',
      [],
      'ns3'
    );
    const complexType1 = createComplexType(
      'TestComplexType1',
      [createTestProperty('ComplexTypeProp')],
      'ns1'
    );
    const complexType2 = createComplexType(
      'TestComplexType2',
      [createTestProperty('ComplexTypeProp')],
      'ns2'
    );

    const actionReturnsEntityType = createAction(
      'ActionReturnsEntityType',
      'ns1.TestEntityType1',
      [],
      'n3'
    );

    const actionReturnsComplexType = createAction(
      'ActionReturnsComplexType',
      'ns2.TestComplexType2',
      [],
      'n3'
    );

    const service = createTestServiceData(
      [entityType1, entityType2],
      [entitySet1, entitySet2],
      [complexType1, complexType2],
      [actionReturnsEntityType, actionReturnsComplexType]
    );

    const complexTypes = generateComplexTypesV4(service, [], getFormatter());
    expect(complexTypes.length).toBe(2);

    const entities = generateEntitiesV4(
      service,
      complexTypes,
      [],
      getFormatter()
    );
    expect(entities.length).toBe(2);

    const actionImports = generateUnboundOperations(
      service,
      'myTestServiceName',
      'action',
      entities,
      complexTypes,
      getFormatter()
    );
    expect(actionImports.length).toBe(2);
  });

  it('should log with warning message, when actions referenced by action imports are not found', () => {
    const logger = createLogger('operation');
    const warnSpy = jest.spyOn(logger, 'warn');

    const formatter = getFormatter();
    const service =
      createServiceMetadataWithActionImportLinksToUndefinedAction();
    generateUnboundOperations(
      service,
      'myTestServiceName',
      'action',
      [],
      [],
      formatter
    );
    expect(warnSpy).toBeCalledWith(
      expect.stringContaining(
        'Could not find actions referenced by the following action imports.'
      )
    );
  });

  it('should not log with warning message, when all actions referenced by action imports are found', () => {
    const logger = createLogger('action-import');
    const warnSpy = jest.spyOn(logger, 'warn');

    const formatter = getFormatter();
    const service = createServiceWithActions();
    const entities = generateEntitiesV4(service, [], [], formatter);
    generateUnboundOperations(
      service,
      'myTestServiceName',
      'action',
      entities,
      [],
      formatter
    );
    expect(warnSpy).not.toBeCalled();
  });
});

const defaultNamespace = 'ns';

function createAction(
  name: string,
  returnType: string | undefined,
  parameter: EdmxParameter[],
  namespace: string = defaultNamespace
): EdmxOperation {
  return {
    Name: name,
    Parameter: parameter,
    ReturnType: returnType
      ? {
          Type: returnType,
          Nullable: 'false'
        }
      : undefined,
    IsBound: 'false',
    Namespace: namespace
  };
}

function createTestEntitySet(
  name: string,
  type: string,
  navPropertyBindings: [string, string][] = [],
  namespace: string = defaultNamespace
): EdmxEntitySet {
  return {
    Namespace: namespace,
    EntityType: `${type}`,
    Name: name,
    NavigationPropertyBinding: navPropertyBindings.map(([path, target]) => ({
      Path: path,
      Target: target
    })),
    'sap:content-version': '',
    'sap:creatable': '',
    'sap:deletable': '',
    'sap:pageable': '',
    'sap:updatable': ''
  };
}

function createComplexType(
  name: string,
  property: EdmxProperty[],
  namespace: string = defaultNamespace
): EdmxComplexType {
  return {
    Name: name,
    Property: property,
    Namespace: namespace
  };
}

function createTestProperty(name: string, type = 'Edm.String'): EdmxProperty {
  return {
    'sap:creatable': '',
    'sap:filterable': '',
    'sap:label': '',
    'sap:sortable': '',
    'sap:unicode': '',
    'sap:updatable': '',
    MaxLength: '10',
    Nullable: '',
    Name: name,
    Type: type
  };
}

function createTestServiceData(
  entityTypes: EdmxEntityTypeV4[],
  entitySets: EdmxEntitySet[],
  complexType: EdmxComplexType[] = [getComplexType()],
  actions: EdmxOperation[] = [],
  namespace: string = defaultNamespace
): ServiceMetadata {
  return {
    edmx: {
      fileName: '',
      namespaces: [''],
      path: '',
      oDataVersion: 'v4',
      root: {
        EntityContainer: {
          EntitySet: entitySets,
          ActionImport: createImportsForActions(actions),
          FunctionImport: [],
          Name: ''
        },
        Action: actions,
        EntityType: entityTypes,
        ComplexType: complexType,
        Function: [],
        EnumType: [],
        Namespace: [namespace]
      }
    }
  };
}

function createImportsForActions(actions: EdmxOperation[]) {
  return actions.map(action => ({
    Name: action.Name,
    Namespace: action.Namespace,
    Action: `SomePrefix.${action.Name}`
  }));
}

function createServiceWithActions(): ServiceMetadata {
  const entitySet = createTestEntitySet('TestEntity', 'ns.TestEntityType', []);
  const entityType = createEntityType('TestEntityType', [], []);
  const actionNoReturnNoParameter = createAction(
    'ActionNoReturnNoParameter',
    undefined,
    []
  );
  const actionWithReturnWithParameter = createAction(
    'ActionWithReturnWithParameter',
    'ns.TestEntityType',
    [{ Name: 'StringParameter', Type: 'Edm.String', Nullable: 'false' }]
  );
  return createTestServiceData([entityType], [entitySet], undefined, [
    actionNoReturnNoParameter,
    actionWithReturnWithParameter
  ]);
}

function createServiceMetadataWithActionImportLinksToUndefinedAction() {
  return {
    edmx: {
      root: {
        EntityContainer: {
          ActionImport: {
            Name: 'actionNotDefined',
            Action: 'namespace.actionNotDefined'
          }
        }
      }
    }
  } as ServiceMetadata;
}
