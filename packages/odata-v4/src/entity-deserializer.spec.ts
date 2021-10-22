import {
  TestComplexType,
  TestEntity
} from '../../test/test-util/test-services/v4/test-service';
import { TestEnumType } from '../../test/test-util/test-services/v4/test-service/TestEnumType';
import {
  deserializeComplexType,
  deserializeEntity
} from './entity-deserializer';

describe('entity-deserializer', () => {
  it('should deserialize an enum property', () => {
    const enumProperty = TestEnumType.Member1;
    expect(deserializeEntity({ EnumProperty: 'Member1' }, TestEntity)).toEqual(
      TestEntity.builder().enumProperty(enumProperty).build()
    );
  });

  it('should deserialize an entity with string collection property', () => {
    const collectionProperty = ['abc', 'def'];
    expect(
      deserializeEntity({ CollectionProperty: collectionProperty }, TestEntity)
    ).toEqual(
      TestEntity.builder().collectionProperty(collectionProperty).build()
    );
  });

  it('should deserialize an entity with enum collection property', () => {
    const enumCollectionProperty = [TestEnumType.Member1, TestEnumType.Member2];
    expect(
      deserializeEntity(
        { EnumCollectionProperty: enumCollectionProperty },
        TestEntity
      )
    ).toEqual(
      TestEntity.builder()
        .enumCollectionProperty(enumCollectionProperty)
        .build()
    );
  });

  it('should deserialize an entity with collection of complex properties', () => {
    const stringProp1 = 'string 1';
    const stringProp2 = 'string 2';

    expect(
      deserializeEntity(
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
      deserializeComplexType(
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
      deserializeComplexType(
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
