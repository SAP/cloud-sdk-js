/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { tsToEdm, serializeEntity } from '../../src';
import {
  TestEntity,
  TestEntityLvl2MultiLink,
  TestEntityLvl2SingleLink,
  TestEntityMultiLink,
  TestEntitySingleLink
} from '../test-util/test-services/v2/test-service';
import { serializeEntity as serializeEntityV4 } from '../../src/odata/v4/entity-serializer';
import { TestEntity as TestEntityV4 } from '../test-util/test-services/v4/test-service';

describe('entity-serializer', () => {
  it('should serialize simple entity', () => {
    const testEntity = TestEntity.builder()
      .stringProperty('test')
      .int16Property(100)
      .build();

    expect(serializeEntity(testEntity, TestEntity)).toEqual({
      StringProperty: testEntity.stringProperty,
      Int16Property: testEntity.int16Property
    });
  });

  it('should serialize entity with complex type fields', () => {
    const stringProperty1 = 'test';
    const stringProperty2 = 'nest';
    const testEntity = TestEntity.builder()
      .complexTypeProperty({
        stringProperty: stringProperty1,
        complexTypeProperty: {
          stringProperty: stringProperty2
        }
      })
      .int16Property(100)
      .build();

    expect(serializeEntity(testEntity, TestEntity)).toEqual({
      ComplexTypeProperty: {
        StringProperty: stringProperty1,
        ComplexTypeProperty: {
          StringProperty: stringProperty2
        }
      },
      Int16Property: testEntity.int16Property
    });
  });

  it('should serialize an empty entity', () => {
    const emptyEntity = TestEntity.builder().build();
    expect(serializeEntity(emptyEntity, TestEntity)).toEqual({});
  });

  it('should serialize a one to one linked entity', () => {
    const singleLinkEntity = TestEntitySingleLink.builder()
      .stringProperty('prop')
      .build();

    const testEntity = TestEntity.builder()
      .stringProperty('testEntity')
      .booleanProperty(false)
      .toSingleLink(singleLinkEntity)
      .build();

    expect(serializeEntity(testEntity, TestEntity)).toEqual({
      StringProperty: testEntity.stringProperty,
      BooleanProperty: testEntity.booleanProperty,
      to_SingleLink: {
        StringProperty: singleLinkEntity.stringProperty
      }
    });
  });

  it('should serialize multi linked entity with nested links', () => {
    const lvl2MultiLinkEntity = TestEntityLvl2MultiLink.builder()
      .booleanProperty(false)
      .build();

    const lvl2SingleLinkEntity = TestEntityLvl2SingleLink.builder()
      .booleanProperty(true)
      .build();

    const multiLinkEntity = TestEntityMultiLink.builder()
      .stringProperty('true')
      .toMultiLink([lvl2MultiLinkEntity])
      .toSingleLink(lvl2SingleLinkEntity)
      .build();

    const testEntity = TestEntity.builder()
      .stringProperty('root')
      .int32Property(6474389)
      .timeProperty({ hours: 12, minutes: 35, seconds: 54 })
      .toMultiLink([multiLinkEntity])
      .build();

    expect(serializeEntity(testEntity, TestEntity)).toEqual({
      StringProperty: testEntity.stringProperty,
      Int32Property: tsToEdm(testEntity.int32Property, 'Edm.Int32'),
      TimeProperty: tsToEdm(testEntity.timeProperty, 'Edm.Time'),
      to_MultiLink: [
        {
          StringProperty: multiLinkEntity.stringProperty,
          to_MultiLink: [
            {
              BooleanProperty: lvl2MultiLinkEntity.booleanProperty
            }
          ],
          to_SingleLink: {
            BooleanProperty: lvl2SingleLinkEntity.booleanProperty
          }
        }
      ]
    });
  });

  it('should serialize an entity with complex type', () => {
    const complexTypeProp = {
      stringProperty: 'prop',
      booleanProperty: false,
      int16Property: 234
    };
    const stringProperty = 'code';

    const entity = TestEntity.builder()
      .complexTypeProperty(complexTypeProp)
      .stringProperty(stringProperty)
      .build();

    expect(serializeEntity(entity, TestEntity)).toEqual({
      ComplexTypeProperty: {
        StringProperty: complexTypeProp.stringProperty,
        BooleanProperty: complexTypeProp.booleanProperty,
        Int16Property: complexTypeProp.int16Property
      },
      StringProperty: stringProperty
    });
  });

  it('should serialize an entity with custom field', () => {
    const testEntity = TestEntity.builder()
      .stringProperty('Peter')
      .singleProperty(14.5)
      .build();

    testEntity.setCustomField('CustomField1', 'abcd');
    testEntity.setCustomField('CustomField2', 1234);

    expect(serializeEntity(testEntity, TestEntity)).toEqual({
      StringProperty: testEntity.stringProperty,
      SingleProperty: tsToEdm(testEntity.singleProperty, 'Edm.Single'),
      CustomField1: 'abcd',
      CustomField2: 1234
    });
  });

  it('should serialize collection field', () => {
    const collectionProperty = ['abc', 'def'];
    const testEntity = TestEntityV4.builder()
      .collectionProperty(collectionProperty)
      .build();

    expect(serializeEntityV4(testEntity, TestEntityV4)).toEqual({
      CollectionProperty: collectionProperty
    });
  });

  it('should serialize collection field with complex type', () => {
    const stringProp1 = 'string 1';
    const stringProp2 = 'string 2';
    const complexType1 = { stringProperty: stringProp1 };
    const complexType2 = { stringProperty: stringProp2 };
    const collectionPropWithComplexType = [complexType1, complexType2];
    const testEntity = TestEntityV4.builder()
      .complexTypeProperty(complexType1)
      .complexTypeCollectionProperty(collectionPropWithComplexType)
      .build();

    expect(serializeEntityV4(testEntity, TestEntityV4)).toEqual({
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
});
