import {
  EdmxAction,
  EdmxActionImport,
  EdmxComplexType,
  EdmxEntitySet,
  EdmxEntityTypeV4
} from '../../edmx-parser/v4';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { EdmxProperty } from '../../edmx-parser/common';
import { ServiceMetadata } from '../../edmx-parser';
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
    [ createEntityType( 'TestEntityType', [], [] ) ],
    [ createTestEntitySet('TestEntity', 'ns.TestEntityType', [ ]) ]
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
          Type: 'SomeEntity'
        },
        {
          Name: 'parameter1',
          Type: 'Edm.String'
        },
      ]
    },
    {
      IsBound: false,
      Name: 'fn2IsNotBound',
      ReturnType: {
        Type: 'Edm.String'
      },
      Parameter: []
    }
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
          Type: 'SomeEntity'
        },
        {
          Name: 'parameter1',
          Type: 'Edm.String'
        },
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

  const entity = generateEntitiesV4(service, [], [], getFormatter())[0];

  expect(entity.boundFunctions.length).toBe(1);
  expect(entity.boundFunctions[0].parameters.length).toBe(1);

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
    Namespace: namespace,
    BoundAction: [],
    BoundFunction: []
  };
}
