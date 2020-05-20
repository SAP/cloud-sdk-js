/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { deserializeEntity, extractCustomFields } from '../../src';
import {
  TestEntity,
  TestEntityMultiLink,
  TestEntitySingleLink
} from '../test-util/test-services/v2/test-service';
import {deserializeEntity as deserializeEntityV4} from '../../src/odata/v4/entity-deserializer';
import {TestEntity as TestEntityV4} from '../test-util/test-services/v4/test-service';

describe('entity-deserializer', () => {
  it('should build an entity with properties', () => {
    const prop = 'test';
    const testEntity = new TestEntity();
    testEntity.stringProperty = prop;

    const response = { StringProperty: prop };

    expect(deserializeEntity(response, TestEntity)).toEqual(testEntity);
  });

  it('should build an entity with multi link', () => {
    const prop = 'test';
    const multiLinkEntity = new TestEntityMultiLink();
    multiLinkEntity.stringProperty = prop;
    const testEntity = new TestEntity();
    testEntity.toMultiLink = [multiLinkEntity];

    const response = {
      to_MultiLink: {
        results: [{ StringProperty: prop }]
      }
    };
    expect(deserializeEntity(response, TestEntity)).toEqual(testEntity);
  });

  it('should build an entity with one to one link', () => {
    const prop = 'test';

    const singleLinkEntity = new TestEntitySingleLink();
    singleLinkEntity.stringProperty = prop;

    const testEntity = new TestEntity();
    testEntity.toSingleLink = singleLinkEntity;

    const response = {
      to_SingleLink: {
        StringProperty: prop
      }
    };

    expect(deserializeEntity(response, TestEntity)).toEqual(testEntity);
  });

  it('should build an entity with custom fields', () => {
    const withCustomFields = {
      KeyPropertyGuid: '123456789',
      to_SingleLink: { StringProperty: 'testSingle' },
      to_MultiLink: [{ StringProperty: 'testMulti' }],
      FirstCustomField: 'ACustomField',
      SecondCustomField: 12345
    };

    const expected = {
      FirstCustomField: 'ACustomField',
      SecondCustomField: 12345
    };

    expect(extractCustomFields(withCustomFields, TestEntity)).toEqual(expected);
  });

  describe('entity with complex type field', () => {
    const stringProperty = 'prop';
    const int16Property = 16;
    const booleanProperty = false;

    const expected = new TestEntity();
    expected.complexTypeProperty = {
      stringProperty,
      int16Property,
      booleanProperty
    };
    expected.stringProperty = 'test';

    it('should deserialize', () => {
      const actual = deserializeEntity(
        {
          ComplexTypeProperty: {
            StringProperty: stringProperty,
            Int16Property: int16Property,
            BooleanProperty: booleanProperty
          },
          StringProperty: expected.stringProperty
        },
        TestEntity
      );

      expect(actual).toEqual(expected);
    });

    it('should deserialize with unknown keys', () => {
      const actual = deserializeEntity(
        {
          ComplexTypeProperty: {
            StringProperty: stringProperty,
            Int16Property: int16Property,
            BooleanProperty: booleanProperty,
            UnknownKey: ''
          },
          StringProperty: expected.stringProperty
        },
        TestEntity
      );

      expect(actual).toEqual(expected);
    });
  });

  describe('odata v4 tests', () => {
    it('should deserialize an entity with collection of string properties', () => {
      const collectionPropertyWithString = ['abc', 'def'];
      const testEntity = new TestEntityV4();
      testEntity.collectionPropertyWithString = collectionPropertyWithString;

      const response = { CollectionPropertyWithString: collectionPropertyWithString };

      expect(deserializeEntityV4(response, TestEntityV4)).toEqual(testEntity);
    });

    it('should deserialize an entity with collection of complex properties', () => {
      const stringProp1 = 'string 1';
      const stringProp2 = 'string 2';

      const expected = new TestEntityV4();
      expected.complexTypeProperty = {
        stringProperty: stringProp1
      };
      expected.collectionPropertyWithComplexType = [
        { stringProperty: stringProp1 },
        { stringProperty: stringProp2 }
      ];

      const actual = deserializeEntityV4(
        {
          ComplexTypeProperty: {
            StringProperty: stringProp1
          },
          CollectionPropertyWithComplexType: [
            {
              StringProperty: stringProp1
            },
            {
              StringProperty: stringProp2
            }
          ]
        },
        TestEntityV4
      );

      expect(actual).toEqual(expected);
    });
  });
});
