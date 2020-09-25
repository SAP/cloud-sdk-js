import {
  serializeEntityV4,
  serializeComplexTypeV4
} from '../../../src/odata/v4/entity-serializer';
import {
  TestEntity,
  TestComplexType
} from '../../test-util/test-services/v4/test-service';
import { TestEnumType } from '../../test-util/test-services/v4/test-service/TestEnumType';

describe('entity-serializer', () => {
  it('should serialize entity with enum field', () => {
    const enumProperty = TestEnumType.Member2;
    const testEntity = TestEntity.builder().enumProperty(enumProperty).build();

    expect(serializeEntityV4(testEntity, TestEntity)).toEqual({
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

    expect(serializeEntityV4(testEntity, TestEntity)).toEqual({
      ComplexTypeProperty: {
        StringProperty: stringProp1,
        EnumProperty: 'Member1'
      }
    });
  });

  it('should serialize entity with collection field', () => {
    const collectionProperty = ['abc', 'def'];
    const testEntity = TestEntity.builder()
      .collectionProperty(collectionProperty)
      .build();

    expect(serializeEntityV4(testEntity, TestEntity)).toEqual({
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

    expect(serializeEntityV4(testEntity, TestEntity)).toEqual({
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
      serializeComplexTypeV4(
        {
          collectionStringProperty
        },
        TestComplexType
      )
    ).toEqual(expected);
  });

  it('should serialize complex type with complex type collection field', () => {
    expect(
      serializeComplexTypeV4(
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

    expect(serializeEntityV4(testEntity, TestEntity)).toEqual({
      TimeOfDayProperty: '01:02:03'
    });

    const testEntityFractional = TestEntity.builder()
      .timeOfDayProperty({ hours: 1, minutes: 2, seconds: 3.456 })
      .build();

    expect(serializeEntityV4(testEntityFractional, TestEntity)).toEqual({
      TimeOfDayProperty: '01:02:03.456'
    });
  });
});
