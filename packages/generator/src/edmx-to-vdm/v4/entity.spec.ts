import { ServiceMetadata } from '../../edmx-parser';
import { EdmxProperty } from '../../edmx-parser/common';
import {
  EdmxAction,
  EdmxActionImport, EdmxComplexType,
  EdmxEntitySet,
  EdmxEntityTypeV4,
  EdmxFunction, EdmxFunctionImportV4
} from '../../edmx-parser/v4';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { generateComplexTypesV4 } from './complex-type';
import { generateEntitiesV4 } from './entity';

describe('entity', () => {
  it('transforms collection type properties for primitive types', () => {
    const service = createTestServiceData(
      [
        createEntityType('TestEntityType', [
          ['CollectionProperty', 'Collection(Edm.String)', false]
        ])
      ],
      [createTestEntitySet('TestEntity', 'ns.TestEntityType')]
    );

    const entity = generateEntitiesV4(service, [], [], getFormatter())[0];
    expect(entity.properties[0]).toMatchObject({
      isCollection: true,
      edmType: 'Edm.String',
      jsType: 'string',
      fieldType: 'CollectionField'
    });
  });

  it('transforms collection type properties for unknown EDMX types', () => {
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
      [createTestEntitySet('TestEntity', 'ns.TestEntityType')]
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
      [createTestEntitySet('TestEntity', 'ns.TestEntityType')]
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
        createTestEntitySet('TestEntity', 'ns.TestEntityType', [
          ['SingleNavProperty', 'TestEntity']
        ])
      ]
    );

    const entity = generateEntitiesV4(service, [], [], getFormatter())[0];
    expect(entity.navigationProperties[0]).toMatchObject({
      from: 'TestEntityType',
      to: 'TestEntity',
      toEntityClassName: 'TestEntity',
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
        createTestEntitySet('TestEntity', 'ns.TestEntityType', [
          ['CollectionNavProperty', 'TestEntity']
        ])
      ]
    );

    const entity = generateEntitiesV4(service, [], [], getFormatter())[0];
    expect(entity.navigationProperties[0]).toMatchObject({
      from: 'TestEntityType',
      to: 'TestEntity',
      toEntityClassName: 'TestEntity',
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
        createTestEntitySet('TestEntity', 'ns.TestEntityType', [
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
});

it('transforms bound actions and functions', () => {
  const service = createTestServiceData(
    [createEntityType('TestEntityType', [], [])],
    [createTestEntitySet('TestEntity', 'ns.TestEntityType', [])]
  );

  service.edmx.root.Function = [
    {
      IsBound: true,
      Name: 'fn1IsBound',
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
      IsBound: false,
      Name: 'fn2IsNotBound',
      ReturnType: {
        Type: 'Edm.String'
      },
      Parameter: []
    },
    {
      IsBound: true,
      Name: 'fn3IsBoundToWrongEntity',
      ReturnType: {
        Type: 'Edm.String'
      },
      Parameter: [
        {
          Name: 'theEntity',
          Type: 'TestService.TestEntityFoobar'
        },
        {
          Name: 'parameter1',
          Type: 'Edm.String'
        }
      ]
    },
    {
      IsBound: true,
      Name: 'fn4IsBoundToWrongEntity',
      ReturnType: {
        Type: 'Edm.String'
      },
      Parameter: [
        {
          Name: 'theEntity',
          Type: 'TestService.FoobarTestEntity'
        },
        {
          Name: 'parameter1',
          Type: 'Edm.String'
        }
      ]
    },
  ];

  service.edmx.root.Action = [
    {
      IsBound: true,
      Name: 'act1IsBound',
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
      IsBound: false,
      Name: 'act2IsNotBound',
      ReturnType: {
        Type: 'Edm.String'
      },
      Parameter: []
    }
  ];

  service.edmx.root.EntityContainer = {
    EntitySet: createTestEntitySet('TestEntity', 'ns.TestEntityType', []),
    ActionImport: createImportsForActions(service.edmx.root.Action),
    FunctionImport: createImportsForFunctions(service.edmx.root.Function),
    Name: ''
  };

  const entity = generateEntitiesV4(service, [], [], getFormatter())[0];

  expect(entity.functions.length).toBe(1);
  expect(entity.functions[0].parameters.length).toBe(1);

  expect(entity.actions.length).toBe(1);
  expect(entity.actions[0].parameters.length).toBe(1);
});

it('transforms bound actions and functions only in expected entities', () => {
  const service = createTestServiceData(
    [createEntityType('TestEntityType', [], []), createEntityType('FoobarTestEntityType', [], []),],
    [createTestEntitySet('TestEntity', 'ns.TestEntityType', []), createTestEntitySet('FoobarTestEntity', 'ns.FoobarTestEntityType', [])]
  );

  service.edmx.root.Function = [
    {
      IsBound: true,
      Name: 'fn1IsBoundToTestEntity',
      ReturnType: {
        Type: 'Edm.String'
      },
      Parameter: [
        {
          Name: 'theEntity',
          Type: 'TestService.TestEntity'
        }
      ]
    }
  ];

  service.edmx.root.Action = [
    {
      IsBound: true,
      Name: 'act1IsBoundToTestEntity',
      ReturnType: {
        Type: 'Edm.String'
      },
      Parameter: [
        {
          Name: 'theEntity',
          Type: 'TestService.TestEntity'
        }
      ]
    }
  ];

  service.edmx.root.EntityContainer = {
    EntitySet: [createTestEntitySet('TestEntity', 'ns.TestEntityType', []), createTestEntitySet('FoobarTestEntity', 'ns.FoobarTestEntityType', [])],
    ActionImport: createImportsForActions(service.edmx.root.Action),
    FunctionImport: createImportsForFunctions(service.edmx.root.Function),
    Name: ''
  };

  const entities = generateEntitiesV4(service, [], [], getFormatter());

  expect(entities.length).toBe(2);

  const testEntityHasFunctions = entities.filter(e => e.entitySetName === 'TestEntity')[0];
  const foobarTestEntityHasNoFunctions = entities.filter(e => e.entitySetName === 'FoobarTestEntity')[0];

  expect(testEntityHasFunctions.functions.length).toBe(1);
  expect(testEntityHasFunctions.functions[0].parameters.length).toBe(0);

  expect(testEntityHasFunctions.actions.length).toBe(1);
  expect(testEntityHasFunctions.actions[0].parameters.length).toBe(0);

  expect(foobarTestEntityHasNoFunctions.functions.length).toBe(0);
  expect(foobarTestEntityHasNoFunctions.actions.length).toBe(0);
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

function createImportsForActions(actions: EdmxAction[]): EdmxActionImport[] {
  return actions.map(action => ({
    Name: action.Name,
    Action: `SomePrefix.${action.Name}`,
    Namespace: action.Namespace
  }));
}

function createImportsForFunctions(functions: EdmxFunction[]): EdmxFunctionImportV4[] {
  return functions.map(fn => ({
    Name: fn.Name,
    Function: `SomePrefix.${fn.Name}`,
    Namespace: fn.Namespace
  }));
}

function createTestServiceData(
  entityTypes: EdmxEntityTypeV4[],
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
