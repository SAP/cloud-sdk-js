import { ServiceMetadata } from '../../edmx-parser';
import { EdmxProperty } from '../../edmx-parser/common';
import {
  EdmxComplexType,
  EdmxEntitySet,
  EdmxEntityTypeV4,
  EdmxOperation
} from '../../edmx-parser/v4';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { generateComplexTypesV4 } from './complex-type';
import { generateEntitiesV4 } from './entity';

describe('entity', () => {
  it('transforms collection type properties for primitive types', () => {
    const service = createTestServiceData({
      entityTypes: [
        createEntityType('TestEntityType', [
          ['CollectionProperty', 'Collection(Edm.String)', false]
        ])
      ],
      entitySets: [createTestEntitySet('TestEntity', 'ns.TestEntityType')]
    });

    const entity = generateEntitiesV4(service, [], [], getFormatter())[0];
    expect(entity.properties[0]).toMatchObject({
      isCollection: true,
      edmType: 'Edm.String',
      jsType: 'string',
      fieldType: 'CollectionField'
    });
  });

  it('transforms collection type properties for unknown EDMX types', () => {
    const service = createTestServiceData({
      entityTypes: [
        createEntityType('TestEntityType', [
          [
            'CollectionProperty',
            'Collection(Edm.SomethingTheSdkDoesNotSupport)',
            false
          ]
        ])
      ],
      entitySets: [createTestEntitySet('TestEntity', 'ns.TestEntityType')]
    });

    const entity = generateEntitiesV4(service, [], [], getFormatter())[0];
    expect(entity.properties[0]).toMatchObject({
      isCollection: true,
      edmType: 'Edm.Any',
      jsType: 'any',
      fieldType: 'CollectionField'
    });
  });

  it('transforms collection type properties for complex types', () => {
    const service = createTestServiceData({
      entityTypes: [
        createEntityType('TestEntityType', [
          ['CollectionProperty', 'Collection(namespace.TestComplexType)', false]
        ])
      ],
      entitySets: [createTestEntitySet('TestEntity', 'ns.TestEntityType')]
    });

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
    const service = createTestServiceData({
      entityTypes: [
        createEntityType(
          'TestEntityType',
          [],
          [['SingleNavProperty', 'TestEntityType']]
        )
      ],
      entitySets: [
        createTestEntitySet('TestEntity', 'ns.TestEntityType', [
          ['SingleNavProperty', 'TestEntity']
        ])
      ]
    });

    const entity = generateEntitiesV4(service, [], [], getFormatter())[0];
    expect(entity.navigationProperties[0]).toMatchObject({
      from: 'TestEntityType',
      to: 'TestEntity',
      toEntityClassName: 'TestEntity',
      isCollection: false
    });
  });

  it('transforms one to many navigation properties', () => {
    const service = createTestServiceData({
      entityTypes: [
        createEntityType(
          'TestEntityType',
          [],
          [['CollectionNavProperty', 'Collection(TestEntityType)']]
        )
      ],
      entitySets: [
        createTestEntitySet('TestEntity', 'ns.TestEntityType', [
          ['CollectionNavProperty', 'TestEntity']
        ])
      ]
    });

    const entity = generateEntitiesV4(service, [], [], getFormatter())[0];
    expect(entity.navigationProperties[0]).toMatchObject({
      from: 'TestEntityType',
      to: 'TestEntity',
      toEntityClassName: 'TestEntity',
      isCollection: true
    });
  });

  it('transforms collection type properties', () => {
    const service = createTestServiceData({
      entityTypes: [
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
      entitySets: [
        createTestEntitySet('TestEntity', 'ns.TestEntityType', [
          ['SingleNavProperty', 'TestEntity'],
          ['CollectionNavProperty', 'TestEntity']
        ])
      ]
    });

    const entity = generateEntitiesV4(service, [], [], getFormatter())[0];
    expect(entity.properties.length).toBe(3);
    expect(entity.properties[2]).toMatchObject({
      isCollection: true,
      edmType: 'Edm.String',
      jsType: 'string',
      fieldType: 'CollectionField'
    });
  });

  it('transforms bound operations', () => {
    const service = createTestServiceData({
      entityTypes: [
        createEntityType('TestEntityType', [], []),
        createEntityType('OtherTestEntityType', [], []),
        createEntityType('TestEntityNoOpsType', [], [])
      ],
      entitySets: [
        createTestEntitySet('TestEntity', 'ns.TestEntityType', []),
        createTestEntitySet('OtherTestEntity', 'ns.OtherTestEntityType', []),
        createTestEntitySet('TestEntityNoOps', 'ns.TestEntityNoOpsType', [])
      ],
      functions: testFunctions,
      actions: testActions
    });

    const entities = generateEntitiesV4(service, [], [], getFormatter());

    // entities[0]
    expect(entities[0].functions.map(({ name }) => name)).toEqual([
      'fn1IsBound'
    ]);
    expect(entities[0].functions[0].parameters.length).toBe(1);
    expect(entities[0].actions.map(({ name }) => name)).toEqual([
      'action1IsBound'
    ]);
    expect(entities[0].actions[0].parameters.length).toBe(0);

    // entities[1]
    expect(entities[1].functions.map(({ name }) => name)).toEqual([
      'fn3IsBoundToOtherEntity'
    ]);
    expect(entities[1].functions[0].parameters.length).toBe(1);
    expect(entities[1].actions.length).toBe(0);

    // entities[2]
    expect(entities[2].functions.length).toBe(0);
    expect(entities[2].actions.length).toBe(0);
  });
});

const defaultNamespace = 'ns';

export function getFormatter() {
  return new ServiceNameFormatter();
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

const testFunctions: EdmxOperation[] = [
  {
    IsBound: 'true',
    Name: 'fn1IsBound',
    Namespace: 'TestService',
    ReturnType: {
      Type: 'Edm.String'
    },
    Parameter: [
      {
        Name: 'theEntity',
        Type: 'TestService.TestEntity'
      },
      {
        Name: 'parameter1',
        Type: 'Edm.String'
      }
    ]
  },
  {
    IsBound: 'true',
    Name: 'fn2IsNotBound',
    Namespace: 'TestService',
    ReturnType: {
      Type: 'Edm.String'
    },
    Parameter: []
  },
  {
    IsBound: 'true',
    Name: 'fn3IsBoundToOtherEntity',
    Namespace: 'TestService',
    ReturnType: {
      Type: 'Edm.String'
    },
    Parameter: [
      {
        Name: 'theEntity',
        Type: 'TestService.OtherTestEntity'
      },
      {
        Name: 'parameter1',
        Type: 'Edm.String'
      }
    ]
  }
];

const testActions: EdmxOperation[] = [
  {
    IsBound: 'true',
    Name: 'action1IsBound',
    Namespace: 'TestService',
    ReturnType: {
      Type: 'Edm.String'
    },
    Parameter: [
      {
        Name: 'theEntity',
        Type: 'TestService.TestEntity'
      }
    ]
  },
  {
    IsBound: 'true',
    Name: 'act2IsNotBound',
    Namespace: 'TestService',
    ReturnType: {
      Type: 'Edm.String'
    },
    Parameter: []
  }
];

export function getComplexType(
  namespace: string = defaultNamespace
): EdmxComplexType {
  return {
    Name: 'TestComplexType',
    Property: [createTestProperty('ComplexTypeProp', 'Edm.String')],
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

function createImportsForOperations(
  operations: EdmxOperation[],
  operationKey: 'Function' | 'Action'
) {
  return operations.map(operation => ({
    Name: operation.Name,
    Namespace: operation.Namespace,
    [operationKey]: `SomePrefix.${operation.Name}`
  }));
}

function createTestServiceData({
  entityTypes,
  entitySets,
  complexType = [getComplexType()],
  actions = [],
  functions = [],
  namespace = defaultNamespace
}: {
  entityTypes: EdmxEntityTypeV4[];
  entitySets: EdmxEntitySet[];
  complexType?: EdmxComplexType[];
  actions?: EdmxOperation[];
  functions?: EdmxOperation[];
  namespace?: string;
}): ServiceMetadata {
  return {
    edmx: {
      fileName: '',
      namespaces: [''],
      path: '',
      oDataVersion: 'v4',
      root: {
        EntityContainer: {
          EntitySet: entitySets,
          ActionImport: createImportsForOperations(actions, 'Action'),
          FunctionImport: createImportsForOperations(functions, 'Function'),
          Name: ''
        },
        Action: actions,
        Function: functions,
        EntityType: entityTypes,
        ComplexType: complexType,
        EnumType: [],
        Namespace: [namespace]
      }
    }
  };
}

export function createEntityType(
  name: string,
  properties: [string, string, boolean][],
  navigationProperties: [string, string][] = [],
  namespace: string = defaultNamespace
): EdmxEntityTypeV4 {
  return {
    'sap:content-version': '',
    Key: {
      PropertyRef: properties
        .filter(([, , isKey]) => isKey)
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
