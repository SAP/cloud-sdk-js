import {
  TestComplexType,
  TestEntity,
  TestEntitySingleLink
} from '../../test/test-util/test-services/v4/test-service';
import { TestEnumType } from '../../test/test-util/test-services/v4/test-service/TestEnumType';
import { serializeComplexType, serializeEntity } from './entity-serializer';

describe('entity-serializer', () => {
  it('should serialize entity with enum field', () => {
    const enumProperty = TestEnumType.Member2;
    const testEntity = TestEntity.builder().enumProperty(enumProperty).build();

    expect(serializeEntity(testEntity, TestEntity)).toEqual({
      EnumProperty: 'Member2'
    });
  });

  it('should serialize entity with string/enum field with complex type', () => {
    const stringProp1 = 'string 1';
    const complexType1 = {
      stringProperty: stringProp1,
      enumProperty: TestEnumType.Member1
    };
    const testEntity = TestEntity.builder()
      .complexTypeProperty(complexType1)
      .build();

    expect(serializeEntity(testEntity, TestEntity)).toEqual({
      ComplexTypeProperty: {
        StringProperty: stringProp1,
        EnumProperty: 'Member1'
      }
    });
  });

  it('should serialize entity with string collection field', () => {
    const collectionProperty = ['abc', 'def'];
    const testEntity = TestEntity.builder()
      .collectionProperty(collectionProperty)
      .build();

    expect(serializeEntity(testEntity, TestEntity)).toEqual({
      CollectionProperty: collectionProperty
    });
  });

  it('should serialize entity with enum collection field', () => {
    const enumCollectionProperty = [TestEnumType.Member1, TestEnumType.Member2];
    const testEntity = TestEntity.builder()
      .enumCollectionProperty(enumCollectionProperty)
      .build();

    expect(serializeEntity(testEntity, TestEntity)).toEqual({
      EnumCollectionProperty: enumCollectionProperty
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

  it('should serialize TimeOfDay.', () => {
    const testEntity = TestEntity.builder()
      .timeOfDayProperty({ hours: 1, minutes: 2, seconds: 3 })
      .build();

    expect(serializeEntity(testEntity, TestEntity)).toEqual({
      TimeOfDayProperty: '01:02:03'
    });

    const testEntityFractional = TestEntity.builder()
      .timeOfDayProperty({ hours: 1, minutes: 2, seconds: 3.456 })
      .build();

    expect(serializeEntity(testEntityFractional, TestEntity)).toEqual({
      TimeOfDayProperty: '01:02:03.456'
    });
  });

  it('should include custom fields on navigation properties', () => {
    const testEntity = TestEntity.builder()
      .toSingleLink(
        TestEntitySingleLink.builder()
          .withCustomFields({ custom: 'custom' })
          .build()
      )
      .build();
    expect(serializeEntity(testEntity, TestEntity)).toEqual({
      to_SingleLink: {
        custom: 'custom'
      }
    });
  });

  it('should consider only changed items when diff is true', () => {
    const testEntity = TestEntity.builder()
      .stringProperty('entity')
      .withCustomFields({ custom: 'custom' })
      .toSingleLink(
        TestEntitySingleLink.builder().stringProperty('linkedEntity').build()
      )
      .build()
      .setOrInitializeRemoteState();
    testEntity.setCustomField('custom', 'newCustom');
    testEntity.toSingleLink!.booleanProperty = false;
    expect(serializeEntity(testEntity, TestEntity, true)).toEqual({
      custom: 'newCustom',
      to_SingleLink: {
        StringProperty: 'linkedEntity',
        BooleanProperty: false
      }
    });
  });
});
