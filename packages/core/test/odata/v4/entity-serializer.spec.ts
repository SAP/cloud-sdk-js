/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  serializeEntity,
  serializeComplexType
} from '../../../src/odata/v4/entity-serializer';
import {
  TestEntity,
  TestComplexType
} from '../../test-util/test-services/v4/test-service';

describe('entity-serializer', () => {
  it('should serialize entity with collection field', () => {
    const collectionProperty = ['abc', 'def'];
    const testEntity = TestEntity.builder()
      .collectionProperty(collectionProperty)
      .build();

    expect(serializeEntity(testEntity, TestEntity)).toEqual({
      CollectionProperty: collectionProperty
    });
  });

  it('should serialize entity with collection field with complex type', () => {
    const stringProp1 = 'string 1';
    const stringProp2 = 'string 2';
    const complexType1 = { stringProperty: stringProp1 };
    const complexType2 = { stringProperty: stringProp2 };
    const collectionPropWithComplexType = [complexType1, complexType2];
    const testEntity = TestEntity.builder()
      .complexTypeProperty(complexType1)
      .complexTypeCollectionProperty(collectionPropWithComplexType)
      .build();

    expect(serializeEntity(testEntity, TestEntity)).toEqual({
      ComplexTypeProperty: {
        StringProperty: stringProp1
      },
      ComplexTypeCollectionProperty: [
        {
          StringProperty: stringProp1
        },
        {
          StringProperty: stringProp2
        }
      ]
    });
  });

  it('should serialize complex type with string collection field', () => {
    const collectionStringProperty = ['abc', 'def'];

    const expected = {
      CollectionStringProperty: collectionStringProperty
    };

    expect(
      serializeComplexType(
        {
          collectionStringProperty
        },
        TestComplexType
      )
    ).toEqual(expected);
  });

  it('should serialize complex type with complex type collection field', () => {
    expect(
      serializeComplexType(
        {
          collectionComplexTypeProperty: [{ stringProperty: 'abc' }]
        },
        TestComplexType
      )
    ).toEqual({
      CollectionComplexTypeProperty: [{ StringProperty: 'abc' }]
    });
  });
});
