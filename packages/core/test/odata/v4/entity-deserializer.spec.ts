/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  TestEntity,
  TestComplexType
} from '../../test-util/test-services/v4/test-service';
import { deserializeEntityV4, deserializeComplexTypeV4 } from '../../../src/';
import { TestEnumType } from '../../test-util/test-services/v4/test-service/TestEnumType';

describe('entity-deserializer', () => {
  it('should deserialize an enum property', () => {
    const enumProperty = TestEnumType.Member1;
    expect(
      deserializeEntityV4({ EnumProperty: 'Member1' }, TestEntity)
    ).toEqual(TestEntity.builder().enumProperty(enumProperty).build());
  });

  it('should deserialize an entity with string collection property', () => {
    const collectionProperty = ['abc', 'def'];
    expect(
      deserializeEntityV4(
        { CollectionProperty: collectionProperty },
        TestEntity
      )
    ).toEqual(
      TestEntity.builder().collectionProperty(collectionProperty).build()
    );
  });

  it('should deserialize an entity with collection of complex properties', () => {
    const stringProp1 = 'string 1';
    const stringProp2 = 'string 2';

    expect(
      deserializeEntityV4(
        {
          ComplexTypeProperty: { StringProperty: stringProp1 },
          ComplexTypeCollectionProperty: [
            { StringProperty: stringProp1 },
            { StringProperty: stringProp2 }
          ]
        },
        TestEntity
      )
    ).toEqual(
      TestEntity.builder()
        .complexTypeProperty({ stringProperty: stringProp1 })
        .complexTypeCollectionProperty([
          { stringProperty: stringProp1 },
          { stringProperty: stringProp2 }
        ])
        .build()
    );
  });

  it('should deserialize a complex type with a string collection property', () => {
    const collectionStringProperty = ['abc', 'def'];
    expect(
      deserializeComplexTypeV4(
        {
          CollectionStringProperty: collectionStringProperty
        },
        TestComplexType
      )
    ).toEqual({
      collectionStringProperty
    });
  });

  it('should deserialize a complex type with a complex type collection property', () => {
    expect(
      deserializeComplexTypeV4(
        {
          CollectionComplexTypeProperty: [{ StringProperty: 'abc' }]
        },
        TestComplexType
      )
    ).toEqual({
      collectionComplexTypeProperty: [{ stringProperty: 'abc' }]
    });
  });
});
