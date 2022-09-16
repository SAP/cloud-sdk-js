import { extractCustomFields } from '@sap-cloud-sdk/odata-common/internal';
import {
  testEntityApi,
  testEntityMultiLinkApi,
  testEntitySingleLinkApi
} from '../../test/test-util';
import { defaultDeSerializers } from './default-de-serializers';
import { entityDeserializer } from './entity-deserializer';

describe('entity-deserializer', () => {
  describe('with default (de-)serializers', () => {
    const { deserializeEntity } = entityDeserializer(defaultDeSerializers);
    it('should build an entity with properties', () => {
      const prop = 'test';
      const testEntity = testEntityApi
        .entityBuilder()
        .stringProperty(prop)
        .build();

      const response = { StringProperty: prop };

      expect(deserializeEntity(response, testEntityApi)).toEqual(testEntity);
    });

    it('should build an entity with multi link from response with results object (S/4)', () => {
      const prop = 'test';
      const multiLinkEntity = testEntityMultiLinkApi
        .entityBuilder()
        .stringProperty(prop)
        .build();
      const testEntity = testEntityApi
        .entityBuilder()
        .toMultiLink([multiLinkEntity])
        .build();

      const response = {
        to_MultiLink: {
          results: [{ StringProperty: prop }]
        }
      };
      expect(deserializeEntity(response, testEntityApi)).toEqual(testEntity);
    });

    it('should build an entity with multi link from response without results object (C4C)', () => {
      const prop = 'test';
      const multiLinkEntity = testEntityMultiLinkApi
        .entityBuilder()
        .stringProperty(prop)
        .build();
      const testEntity = testEntityApi
        .entityBuilder()
        .toMultiLink([multiLinkEntity])
        .build();

      const response = {
        to_MultiLink: [{ StringProperty: prop }]
      };
      expect(deserializeEntity(response, testEntityApi)).toEqual(testEntity);
    });

    it('should build an entity with one to one link', () => {
      const prop = 'test';

      const singleLinkEntity = testEntitySingleLinkApi
        .entityBuilder()
        .stringProperty(prop)
        .build();

      const testEntity = testEntityApi
        .entityBuilder()
        .toSingleLink(singleLinkEntity)
        .build();

      const response = {
        to_SingleLink: {
          StringProperty: prop
        }
      };

      expect(deserializeEntity(response, testEntityApi)).toEqual(testEntity);
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

      expect(
        extractCustomFields(withCustomFields, testEntityApi.schema)
      ).toEqual(expected);
    });

    describe('entity with complex type field', () => {
      const stringProperty = 'prop';
      const int16Property = 16;
      const booleanProperty = false;

      const expected = testEntityApi
        .entityBuilder()
        .complexTypeProperty({
          stringProperty,
          int16Property,
          booleanProperty,
          complexTypeProperty: {
            stringProperty
          }
        })
        .stringProperty('test')
        .build();

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
          testEntityApi
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
          testEntityApi
        );

        expect(actual).toEqual(expected);
      });
    });
  });
});
