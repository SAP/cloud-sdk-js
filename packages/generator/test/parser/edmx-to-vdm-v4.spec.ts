/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { ServiceNameFormatter } from '../../src/service-name-formatter';
import { EdmxProperty } from '../../src/parser/common/edmx-types';
import { EdmxEntitySet, EdmxEntityType } from '../../src/parser/v4/edmx-types';
import { getComplexTypesV4 } from '../../src/service-vdm/v4/complex-type-vdm';
import { getEntitiesV4 } from '../../src/service-vdm/v4/entity-vdm';
import { ServiceMetadata } from '../../src/parser/edmx-file-reader';

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

    const entity = getEntitiesV4(service, [], getFormatter(service))[0];
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
    const vdmComplexTypes = getComplexTypesV4(service, formatter);

    const entity = getEntitiesV4(service, vdmComplexTypes, formatter)[0];
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

    const entity = getEntitiesV4(service, [], getFormatter(service))[0];
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

    const entity = getEntitiesV4(service, [], getFormatter(service))[0];
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

    const entity = getEntitiesV4(service, [], getFormatter(service))[0];
    expect(entity.properties.length).toBe(3);
    expect(entity.properties[2]).toMatchObject({
      isCollection: true,
      edmType: 'Edm.String',
      jsType: 'string',
      fieldType: 'StringField'
    });
  });
});

function getFormatter(service: ServiceMetadata) {
  return new ServiceNameFormatter();
  // service.edmx.entitySets.map(entitySet => entitySet.Name),
  // service.edmx.complexTypes.map(complexType => complexType.Name),
  // (service.edmx.functionImports as EdmxFunctionImportBase[]).map(
  //   functionImport => functionImport.Name
  // )
}

function createTestServiceData(
  entityTypes: EdmxEntityType[],
  entitySets: EdmxEntitySet[]
): ServiceMetadata {
  const service: ServiceMetadata = {
    edmx: {
      fileName: '',
      namespace: '',
      path: '',
      oDataVersion: 'v4',
      root: {
        EntityContainer: {
          EntitySet: entitySets
        },
        EntityType: entityTypes,
        ComplexType: [
          {
            Name: 'TestComplexType',
            Property: [createTestProperty('ComplexTypeProp', 'Edm.String')]
          }
        ]
      }
    }
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
