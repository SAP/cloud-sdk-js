import {
  TestComplexType,
  TestEntity,
  TestEntitySingleLink
} from '@sap-cloud-sdk/test-services/v4/test-service';
import { TestEnumType } from '@sap-cloud-sdk/test-services/v4/test-service/TestEnumType';
import { serializeComplexType, serializeEntity } from './entity-serializer';
import { testEntityApi, testEntitySingleLinkApi } from '../../test/test-util';

describe('entity-serializer', () => {
  it('should serialize entity with enum field', () => {
    const enumProperty = TestEnumType.Member2;
    const testEntity = testEntityApi.entityBuilder().enumProperty(enumProperty).build();

    expect(serializeEntity(testEntity, testEntityApi)).toEqual({
      EnumProperty: 'Member2'
    });
  });

  it('should serialize entity with string/enum field with complex type', () => {
    const stringProp1 = 'string 1';
    const complexType1 = {
      stringProperty: stringProp1,
      enumProperty: TestEnumType.Member1
    };
    const testEntity = testEntityApi.entityBuilder()
      .complexTypeProperty(complexType1)
      .build();

    expect(serializeEntity(testEntity, testEntityApi)).toEqual({
      ComplexTypeProperty: {
        StringProperty: stringProp1,
        EnumProperty: 'Member1'
      }
    });
  });

  it('should serialize entity with string collection field', () => {
    const collectionProperty = ['abc', 'def'];
    const testEntity = testEntityApi.entityBuilder()
      .collectionProperty(collectionProperty)
      .build();

    expect(serializeEntity(testEntity, testEntityApi)).toEqual({
      CollectionProperty: collectionProperty
    });
  });

  it('should serialize entity with enum collection field', () => {
    const enumCollectionProperty = [TestEnumType.Member1, TestEnumType.Member2];
    const testEntity = testEntityApi.entityBuilder()
      .enumCollectionProperty(enumCollectionProperty)
      .build();

    expect(serializeEntity(testEntity, testEntityApi)).toEqual({
      EnumCollectionProperty: enumCollectionProperty
    });
  });

  it('should serialize entity with collection field with complex type', () => {
    const stringProp1 = 'string 1';
    const stringProp2 = 'string 2';
    const complexType1 = { stringProperty: stringProp1 };
    const complexType2 = { stringProperty: stringProp2 };
    const collectionPropWithComplexType = [complexType1, complexType2];
    const testEntity = testEntityApi.entityBuilder()
      .complexTypeProperty(complexType1)
      .complexTypeCollectionProperty(collectionPropWithComplexType)
      .build();

    expect(serializeEntity(testEntity, testEntityApi)).toEqual({
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
    const testEntity = testEntityApi.entityBuilder()
      .timeOfDayProperty({ hours: 1, minutes: 2, seconds: 3 })
      .build();

    expect(serializeEntity(testEntity, testEntityApi)).toEqual({
      TimeOfDayProperty: '01:02:03'
    });

    const testEntityFractional = testEntityApi.entityBuilder()
      .timeOfDayProperty({ hours: 1, minutes: 2, seconds: 3.456 })
      .build();

    expect(serializeEntity(testEntityFractional, testEntityApi)).toEqual({
      TimeOfDayProperty: '01:02:03.456'
    });
  });

  it('should include custom fields on navigation properties', () => {
    const testEntity = testEntityApi.entityBuilder()
      .toSingleLink(
        testEntitySingleLinkApi.entityBuilder()
          .withCustomFields({ custom: 'custom' })
          .build()
      )
      .build();
    expect(serializeEntity(testEntity, testEntityApi)).toEqual({
      to_SingleLink: {
        custom: 'custom'
      }
    });
  });

  it('should consider only changed items when diff is true', () => {
    const testEntity = testEntityApi.entityBuilder()
      .stringProperty('entity')
      .withCustomFields({ custom: 'custom' })
      .toSingleLink(
        testEntitySingleLinkApi.entityBuilder().stringProperty('linkedEntity').build()
      )
      .build()
      .setOrInitializeRemoteState();
    testEntity.setCustomField('custom', 'newCustom');
    testEntity.toSingleLink!.booleanProperty = false;
    expect(serializeEntity(testEntity, testEntityApi, true)).toEqual({
      custom: 'newCustom',
      to_SingleLink: {
        StringProperty: 'linkedEntity',
        BooleanProperty: false
      }
    });
  });
});
