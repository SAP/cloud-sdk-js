import { createLogger } from '@sap-cloud-sdk/util';
import BigNumber from 'bignumber.js';
import moment from 'moment';
import { EntityBuilder } from '@sap-cloud-sdk/odata-common';
import {
  TestEntity,
  TestEntityLvl2SingleLink,
  TestEntityMultiLink,
  TestEntitySingleLink
} from '@sap-cloud-sdk/test-services/v4/test-service';

describe('EntityBuilder', () => {
  it('should build an empty entity when no properties are defined', () => {
    const builder = new EntityBuilder<TestEntity, unknown>(TestEntity);
    expect(builder.build()).toEqual(new TestEntity());
  });

  it('should build an entity with custom fields', () => {
    const builder = new EntityBuilder<TestEntity, unknown>(TestEntity);
    const expected = { SomeCustomField: null };
    expect(
      builder
        .withCustomFields({ SomeCustomField: null })
        .build()
        .getCustomFields()
    ).toEqual(expected);
  });

  it('ignores existing fields in custom fields', () => {
    const builder = new EntityBuilder<TestEntity, unknown>(TestEntity);
    const expected = { SomeCustomField: null };
    expect(
      builder
        .withCustomFields({
          SomeCustomField: null,
          StringProperty: 'test',
          Int16Property: 'test'
        })
        .build()
        .getCustomFields()
    ).toEqual(expected);
  });

  it('should build an entity with non-primitive JS types (moment, BigNumber etc.)', () => {
    const expected: TestEntity = new TestEntity();

    expected.dateProperty = moment();
    expected.decimalProperty = new BigNumber(10);

    const actual = TestEntity.builder()
      .dateProperty(expected.dateProperty)
      .decimalProperty(expected.decimalProperty)
      .build();

    expect(expected).toEqual(actual);
  });

  describe('fromJson', () => {
    it('should build an entity from json', () => {
      const stringProperty = 'stringProperty';
      const singleLinkStringProperty = 'singleLinkedValue';
      const multiLinkStringProperty = 'multiLinkedValue';
      const entity = TestEntity.builder().fromJson({
        stringProperty,
        toSingleLink: {
          stringProperty: singleLinkStringProperty
        },
        toMultiLink: [
          {
            stringProperty: multiLinkStringProperty
          }
        ]
      });
      const expectedEntity = TestEntity.builder()
        .stringProperty(stringProperty)
        .toSingleLink(
          TestEntitySingleLink.builder()
            .stringProperty(singleLinkStringProperty)
            .build()
        )
        .toMultiLink([
          TestEntityMultiLink.builder()
            .stringProperty(multiLinkStringProperty)
            .build()
        ])
        .build();
      expect(entity).toStrictEqual(expectedEntity);
    });

    it('should build an entity with nested navigation properties from json', () => {
      const stringProperty = 'stringProperty';
      const singleLinkStringProperty = 'singleLinkedValue';
      const nestedSingleLinkStringProperty = 'nestedSingleLinkedValue';
      const entity = TestEntity.builder().fromJson({
        stringProperty,
        toSingleLink: {
          stringProperty: singleLinkStringProperty,
          toSingleLink: {
            stringProperty: nestedSingleLinkStringProperty
          }
        }
      });
      const expectedEntity = TestEntity.builder()
        .stringProperty(stringProperty)
        .toSingleLink(
          TestEntitySingleLink.builder()
            .stringProperty(singleLinkStringProperty)
            .toSingleLink(
              TestEntityLvl2SingleLink.builder()
                .stringProperty(nestedSingleLinkStringProperty)
                .build()
            )
            .build()
        )
        .build();
      expect(entity).toStrictEqual(expectedEntity);
    });

    it('should build an entity from json with custom fields', () => {
      const entityJson = {
        customField: 'customField'
      };
      const entity = TestEntity.builder().fromJson(entityJson);
      const expectedEntity = TestEntity.builder()
        .withCustomFields({
          customField: entityJson.customField
        })
        .build();
      expect(entity.getCustomFields()).toEqual(
        expectedEntity.getCustomFields()
      );
    });

    it('should build an entity from json with complex type fields', () => {
      const entityJson = {
        complexTypeProperty: { stringProperty: 'complexTypeValue' }
      };
      const entity = TestEntity.builder().fromJson(entityJson);
      const expectedEntity = TestEntity.builder()
        .complexTypeProperty(entityJson.complexTypeProperty)
        .build();
      expect(entity).toStrictEqual(expectedEntity);
    });

    it('should build an entity from json with collection fields', () => {
      const entityJson = {
        collectionProperty: ['collectionValue']
      };
      const entity = TestEntity.builder().fromJson(entityJson);
      const expectedEntity = TestEntity.builder()
        .collectionProperty(entityJson.collectionProperty)
        .build();
      expect(entity).toStrictEqual(expectedEntity);
    });

    it('should build an entity from json with empty collection field', () => {
      const entityJson = {
        collectionProperty: []
      };
      const entity = TestEntity.builder().fromJson(entityJson);
      const expectedEntity = TestEntity.builder()
        .collectionProperty(entityJson.collectionProperty)
        .build();
      expect(entity).toStrictEqual(expectedEntity);
    });

    it('should build an entity from json with legacy _customFields', () => {
      const logger = createLogger('entity-builder');
      const warnSpy = jest.spyOn(logger, 'warn');
      const entityJson = {
        _customFields: {
          customField: 'customField'
        }
      };
      const entity = TestEntity.builder().fromJson(entityJson);
      const expectedEntity = TestEntity.builder()
        .withCustomFields(entityJson._customFields)
        .build();
      expect(entity.getCustomFields()).toEqual(
        expectedEntity.getCustomFields()
      );
      expect(warnSpy).toHaveBeenCalled();
    });

    it('should build an entity from json with existing entities as navigation properties', () => {
      const expectedEntity = TestEntity.builder()
        .stringProperty('someValue')
        .toSingleLink(
          TestEntitySingleLink.builder()
            .stringProperty('singleLinkedValue')
            .withCustomFields({ customField: 'customField' })
            .build()
        )
        .toMultiLink([
          TestEntityMultiLink.builder()
            .stringProperty('singleLinkedValue')
            .build()
        ])
        .build();

      const entityJson = {
        stringProperty: expectedEntity.stringProperty,
        toSingleLink: expectedEntity.toSingleLink,
        toMultiLink: expectedEntity.toMultiLink
      };
      const entity = TestEntity.builder().fromJson(entityJson);

      expect(entity).toStrictEqual(expectedEntity);
      expect(entity.toSingleLink!.getCustomFields()).toEqual(
        expectedEntity.toSingleLink!.getCustomFields()
      );
    });

    it('should build an entity from json with one-to-one navigation properties being null', () => {
      const entity = TestEntity.builder().fromJson({
        toSingleLink: null
      });
      const expectedEntity = TestEntity.builder().toSingleLink(null).build();
      expect(entity).toStrictEqual(expectedEntity);
    });

    it('should build an entity from json with one-to-one navigation properties being undefined', () => {
      const entity = TestEntity.builder().fromJson({
        toSingleLink: undefined
      });
      const expectedEntity = TestEntity.builder()
        .toSingleLink(undefined)
        .build();
      expect(entity).toStrictEqual(expectedEntity);
    });
  });
});
