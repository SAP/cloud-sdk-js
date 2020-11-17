import { ServiceNameFormatter } from '../../../src/service-name-formatter';
import { EdmxParameter, EdmxProperty } from '../../../src/edmx-parser/common';
import {
  EdmxActionImportNamespaced,
  EdmxActionNamespaced,
  EdmxComplexTypeNamespaced,
  EdmxEntitySetNamespaced,
  EdmxEntityTypeNamespaced
} from '../../../src/edmx-parser/v4';
import {
  generateComplexTypesV4,
  generateEntitiesV4
} from '../../../src/edmx-to-vdm/v4';
import { ServiceMetadata } from '../../../src/edmx-parser/edmx-file-reader';
import { generateActionImportsV4 } from '../../../src/edmx-to-vdm/v4/action-import';

const defaultNamespace = 'ns';

describe('edmx-to-vdm-v4', () => {
  it('transforms collection type properties for primitive types', () => {
    const service = createTestServiceData(
      [
        createEntityType('TestEntityType', [
          ['CollectionProperty', 'Collection(Edm.String)', false]
        ])
      ],
      [createTestEntitySet('TestEntity', 'TestEntityType')]
    );

    const entity = generateEntitiesV4(service, [], [], getFormatter())[0];
    expect(entity.properties[0]).toMatchObject({
      isCollection: true,
      edmType: 'Edm.String',
      jsType: 'string',
      fieldType: 'CollectionField'
    });
  });

  it('transforms collection type properties for unknown edmx types', () => {
    const service = createTestServiceData(
      [
        createEntityType('TestEntityType', [
          [
            'CollectionProperty',
            'Collection(Edm.SomethingTheSdkDoesNotSupport)',
            false
          ]
        ])
      ],
      [createTestEntitySet('TestEntity', 'TestEntityType')]
    );

    const entity = generateEntitiesV4(service, [], [], getFormatter())[0];
    expect(entity.properties[0]).toMatchObject({
      isCollection: true,
      edmType: 'Edm.Any',
      jsType: 'any',
      fieldType: 'CollectionField'
    });
  });

  it('transforms collection type properties for complex types', () => {
    const service = createTestServiceData(
      [
        createEntityType('TestEntityType', [
          ['CollectionProperty', 'Collection(namespace.TestComplexType)', false]
        ])
      ],
      [createTestEntitySet('TestEntity', 'TestEntityType')]
    );

    const formatter = getFormatter();
    const vdmComplexTypes = generateComplexTypesV4(service, [], formatter);

    const entity = generateEntitiesV4(
      service,
      vdmComplexTypes,
      [],
      formatter
    )[0];
    expect(entity.properties[0]).toMatchObject({
      isCollection: true,
      isComplex: true,
      edmType: 'namespace.TestComplexType',
      jsType: 'TestComplexType',
      fieldType: 'CollectionField'
    });
  });

  it('transforms one to one navigation properties', () => {
    const service = createTestServiceData(
      [
        createEntityType(
          'TestEntityType',
          [],
          [['SingleNavProperty', 'TestEntityType']]
        )
      ],
      [
        createTestEntitySet('TestEntity', 'TestEntityType', [
          ['SingleNavProperty', 'TestEntity']
        ])
      ]
    );

    const entity = generateEntitiesV4(service, [], [], getFormatter())[0];
    expect(entity.navigationProperties[0]).toMatchObject({
      from: 'TestEntityType',
      to: 'TestEntity',
      toEntityClassName: 'TestEntity',
      multiplicity: '1 - 1',
      isCollection: false
    });
  });

  it('transforms one to many navigation properties', () => {
    const service = createTestServiceData(
      [
        createEntityType(
          'TestEntityType',
          [],
          [['CollectionNavProperty', 'Collection(TestEntityType)']]
        )
      ],
      [
        createTestEntitySet('TestEntity', 'TestEntityType', [
          ['CollectionNavProperty', 'TestEntity']
        ])
      ]
    );

    const entity = generateEntitiesV4(service, [], [], getFormatter())[0];
    expect(entity.navigationProperties[0]).toMatchObject({
      from: 'TestEntityType',
      to: 'TestEntity',
      toEntityClassName: 'TestEntity',
      multiplicity: '1 - *',
      isCollection: true
    });
  });

  it('transforms collection type properties', () => {
    const service = createTestServiceData(
      [
        createEntityType(
          'TestEntityType',
          [
            ['KeyProperty', 'Edm.String', true],
            ['Property', 'Edm.String', false],
            ['CollectionProperty', 'Collection(Edm.String)', false]
          ],
          [
            ['SingleNavProperty', 'TestEntityType'],
            ['CollectionNavProperty', 'Collection(TestEntityType)']
          ]
        )
      ],
      [
        createTestEntitySet('TestEntity', 'TestEntityType', [
          ['SingleNavProperty', 'TestEntity'],
          ['CollectionNavProperty', 'TestEntity']
        ])
      ]
    );

    const entity = generateEntitiesV4(service, [], [], getFormatter())[0];
    expect(entity.properties.length).toBe(3);
    expect(entity.properties[2]).toMatchObject({
      isCollection: true,
      edmType: 'Edm.String',
      jsType: 'string',
      fieldType: 'CollectionField'
    });
  });

  it('transforms action imports', () => {
    const formatter = getFormatter();
    const service = createServiceWithActions();
    const entites = generateEntitiesV4(service, [], [], formatter);
    const actionImport = generateActionImportsV4(
      service,
      entites,
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
});

function getFormatter() {
  return new ServiceNameFormatter();
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
    [{ Name: 'StringPara', Type: 'Edm.String' }]
  );
  const service = createTestServiceData([entityType], [entitySet], undefined, [
    actionNoReturnNoParameter,
    actionWithReturnWithParameter
  ]);

  return service;
}

function createTestServiceData(
  entityTypes: EdmxEntityTypeNamespaced[],
  entitySets: EdmxEntitySetNamespaced[],
  complexType: EdmxComplexTypeNamespaced[] = [getComplexType()],
  actions: EdmxActionNamespaced[] = [],
  namespace: string = defaultNamespace
): ServiceMetadata {
  return {
    edmx: {
      fileName: '',
      namespace: '',
      path: '',
      oDataVersion: 'v4',
      root: {
        EntityContainer: [
          {
            EntitySet: entitySets,
            ActionImport: createImportsForActions(actions),
            FunctionImport: [],
            Name: ''
          }
        ],
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

function getComplexType(
  namespace: string = defaultNamespace
): EdmxComplexTypeNamespaced {
  return {
    Name: 'TestComplexType',
    Property: [createTestProperty('ComplexTypeProp', 'Edm.String')],
    Namespace: namespace
  };
}

function createComplexType(
  name: string,
  property: EdmxProperty[],
  namespace: string = defaultNamespace
): EdmxComplexTypeNamespaced {
  return {
    Name: name,
    Property: property,
    Namespace: namespace
  };
}

function createImportsForActions(
  actions: EdmxActionNamespaced[]
): EdmxActionImportNamespaced[] {
  return actions.map(action => ({
    Name: action.Name,
    Action: `SomePrefix.${action.Name}`,
    Namespace: action.Namespace
  }));
}

function createAction(
  name: string,
  returnType: string | undefined,
  parameter: EdmxParameter[],
  namespace: string = defaultNamespace
): EdmxActionNamespaced {
  return {
    Name: name,
    Parameter: parameter,
    ReturnType: returnType
      ? {
          Type: returnType
        }
      : undefined,
    IsBound: false,
    Namespace: namespace
  };
}

function createEntityType(
  name: string,
  properties: [string, string, boolean][],
  navigationProperties: [string, string][] = [],
  namespace: string = defaultNamespace
): EdmxEntityTypeNamespaced {
  return {
    'sap:content-version': '',
    Key: {
      PropertyRef: properties
        .filter(([propName, type, isKey]) => isKey)
        .map(([propName]) => ({ Name: propName }))
    },
    Name: name,
    Property: properties.map(([propName, type]) =>
      createTestProperty(propName, type)
    ),
    NavigationProperty: navigationProperties.map(([propName, type]) => ({
      Name: propName,
      Type: `namespace.${type}`
    })),
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

function createTestEntitySet(
  name: string,
  type: string,
  navPropertyBindings: [string, string][] = [],
  namespace: string = defaultNamespace
): EdmxEntitySetNamespaced {
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
