/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { ServiceNameFormatter } from '../../src/service-name-formatter';
import {
  EdmxProperty,
  EdmxFunctionImportBase,
  transformComplexTypes
} from '../../src/parser/common';
import {
  EdmxEntitySet,
  EdmxEntityType,
  EdmxMetadata,
  transformEntitiesV4
} from '../../src/parser/v4';

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

    const entity = transformEntitiesV4(service, [], getFormatter(service))[0];
    expect(entity.properties[0]).toMatchObject({
      isCollection: true,
      edmType: 'Edm.String',
      jsType: 'string',
      fieldType: 'StringField'
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

    const formatter = getFormatter(service);
    const vdmComplexTypes = transformComplexTypes(
      service.edmx.complexTypes,
      formatter,
      new Set()
    );

    const entity = transformEntitiesV4(service, vdmComplexTypes, formatter)[0];
    expect(entity.properties[0]).toMatchObject({
      isCollection: true,
      isComplex: true,
      edmType: 'namespace.TestComplexType',
      jsType: 'TestComplexType',
      fieldType: 'TestComplexTypeField'
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

    const entity = transformEntitiesV4(service, [], getFormatter(service))[0];
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

    const entity = transformEntitiesV4(service, [], getFormatter(service))[0];
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

    const entity = transformEntitiesV4(service, [], getFormatter(service))[0];
    expect(entity.properties.length).toBe(3);
    expect(entity.properties[2]).toMatchObject({
      isCollection: true,
      edmType: 'Edm.String',
      jsType: 'string',
      fieldType: 'StringField'
    });
  });
});

function getFormatter(service: ParsedServiceMetadata) {
  return new ServiceNameFormatter(
    service.edmx.entitySets.map(entitySet => entitySet.Name),
    service.edmx.complexTypes.map(complexType => complexType.Name),
    (service.edmx.functionImports as EdmxFunctionImportBase[]).map(
      functionImport => functionImport.Name
    )
  );
}

function createTestServiceData(
  entityTypes: EdmxEntityType[],
  entitySets: EdmxEntitySet[]
): ParsedServiceMetadata {
  const service: ParsedServiceMetadata = {
    edmx: {
      complexTypes: [
        {
          Name: 'TestComplexType',
          Property: [createTestProperty('ComplexTypeProp', 'Edm.String')]
        }
      ],
      fileName: '',
      functionImports: [],
      namespace: '',
      path: '',
      oDataVersion: 'v4',
      enumTypes: [],
      entityTypes,
      entitySets,
      functions: []
    } as EdmxMetadata
  };

  return service;
}

function createEntityType(
  name: string,
  properties: [string, string, boolean][],
  navigationProperties: [string, string][] = []
): EdmxEntityType {
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
    }))
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
  navPropertyBindings: [string, string][] = []
): EdmxEntitySet {
  return {
    EntityType: `namespace.${type}`,
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
