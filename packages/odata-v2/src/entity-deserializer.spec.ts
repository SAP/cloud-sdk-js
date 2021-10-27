import { extractCustomFields } from '@sap-cloud-sdk/odata-common/dist/entity-deserializer';
import {
  TestEntity,
  TestEntityMultiLink,
  TestEntitySingleLink
} from '@sap-cloud-sdk/test-services/v2/test-service';
import { deserializeEntity } from './entity-deserializer';

describe('entity-deserializer', () => {
  it('should build an entity with properties', () => {
    const prop = 'test';
    const testEntity = new TestEntity();
    testEntity.stringProperty = prop;

    const response = { StringProperty: prop };

    expect(deserializeEntity(response, TestEntity)).toEqual(testEntity);
  });

  it('should build an entity with multi link from response with results object (S/4)', () => {
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

  it('should build an entity with multi link from response without results object (C4C)', () => {
    const prop = 'test';
    const multiLinkEntity = new TestEntityMultiLink();
    multiLinkEntity.stringProperty = prop;
    const testEntity = new TestEntity();
    testEntity.toMultiLink = [multiLinkEntity];

    const response = {
      to_MultiLink: [{ StringProperty: prop }]
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
      booleanProperty,
      complexTypeProperty: {
        stringProperty
      }
    };
    expected.stringProperty = 'test';

    it('should deserialize', () => {
      const actual = deserializeEntity(
        {
          ComplexTypeProperty: {
            StringProperty: stringProperty,
            Int16Property: int16Property,
            BooleanProperty: booleanProperty,
            ComplexTypeProperty: {
              StringProperty: stringProperty
            }
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
            ComplexTypeProperty: {
              StringProperty: stringProperty
            },
            UnknownKey: ''
          },
          StringProperty: expected.stringProperty
        },
        TestEntity
      );

      expect(actual).toEqual(expected);
    });
  });
});
