import { createLogger } from '@sap-cloud-sdk/util';
import { EdmxParameter, EdmxProperty } from '../../edmx-parser/common';
import {
  EdmxAction,
  EdmxActionImport,
  EdmxComplexType,
  EdmxEntitySet,
  EdmxEntityType
} from '../../edmx-parser/v4';
import { ServiceMetadata } from '../../edmx-parser/edmx-file-reader';
import { generateEntitiesV4 } from './entity';
import { generateActionImportsV4 } from './action-import';
import { generateComplexTypesV4 } from './complex-type';
import { createEntityType, getComplexType, getFormatter } from './entity.spec';

describe('action-import', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('transforms action imports', () => {
    const formatter = getFormatter();
    const service = createServiceWithActions();
    const entities = generateEntitiesV4(service, [], [], formatter);
    const actionImport = generateActionImportsV4(
      service,
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

    const actionImports = generateActionImportsV4(
      service,
      entities,
      complexTypes,
      getFormatter()
    );
    expect(actionImports.length).toBe(2);
  });

  it('should log with warning message, when actions referenced by action imports are not found', () => {
    const logger = createLogger('action-import');
    const warnSpy = jest.spyOn(logger, 'warn');

    const formatter = getFormatter();
    const service =
      createServiceMetadataWithActionImportLinksToUndefinedAction();
    generateActionImportsV4(service, [], [], formatter);
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
    generateActionImportsV4(service, entities, [], formatter);
    expect(warnSpy).not.toBeCalled();
  });
});

const defaultNamespace = 'ns';

function createAction(
  name: string,
  returnType: string | undefined,
  parameter: EdmxParameter[],
  namespace: string = defaultNamespace
): EdmxAction {
  return {
    Name: name,
    Parameter: parameter,
    ReturnType: returnType
      ? {
          Type: returnType,
          Nullable: 'false'
        }
      : undefined,
    IsBound: false,
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
  entityTypes: EdmxEntityType[],
  entitySets: EdmxEntitySet[],
  complexType: EdmxComplexType[] = [getComplexType()],
  actions: EdmxAction[] = [],
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

function createImportsForActions(actions: EdmxAction[]): EdmxActionImport[] {
  return actions.map(action => ({
    Name: action.Name,
    Action: `SomePrefix.${action.Name}`,
    Namespace: action.Namespace
  }));
}

function createServiceWithActions(): ServiceMetadata {
  const entitySet = createTestEntitySet('TestEntity', 'TestEntityType', []);
  const entityType = createEntityType('TestEntityType', [], []);
  const actionNoReturnNoParameter = createAction(
    'ActionNoReturnNoParameter',
    undefined,
    []
  );
  const actionWithReturnWithParameter = createAction(
    'ActionWithReturnWithParameter',
    'TestEntityType',
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
