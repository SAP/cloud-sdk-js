import { createLogger } from '@sap-cloud-sdk/util';
import {
  CommonEntity,
  commonEntityApi,
  CommonEntitySingleLinkApi
} from '../test/common-entity';
import { EntityBuilder } from './internal';

describe('EntityBuilder', () => {
  it('should build an empty entity when no properties are defined', () => {
    const builder = new EntityBuilder<CommonEntity, any>(commonEntityApi);
    expect(builder.build()).toEqual(new CommonEntity(commonEntityApi.schema));
  });

  it('should build an entity with custom fields', () => {
    const builder = new EntityBuilder<CommonEntity, any>(commonEntityApi);
    const expected = { SomeCustomField: null };
    expect(
      builder
        .withCustomFields({ SomeCustomField: null })
        .build()
        .getCustomFields()
    ).toEqual(expected);
  });

  it('ignores existing fields in custom fields', () => {
    const builder = new EntityBuilder<CommonEntity, any>(commonEntityApi);
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

  describe('fromJson', () => {
    it('should build an entity from json', () => {
      const stringProperty = 'stringProperty';

      const entity = commonEntityApi.entityBuilder().fromJson({
        stringProperty
      });
      const expectedEntity = commonEntityApi
        .entityBuilder()
        .stringProperty(stringProperty)
        .build();
      expect(entity).toStrictEqual(expectedEntity);
    });

    it('should build an entity from json with 1:1 link', () => {
      const stringProperty = 'stringProperty';

      const entity = commonEntityApi.entityBuilder().fromJson({
        stringProperty,
        toSingleLink: { stringProperty: 'singleLinkedValue' }
      });
      const expectedEntity = commonEntityApi
        .entityBuilder()
        .stringProperty(stringProperty)
        .toSingleLink(
          new CommonEntitySingleLinkApi()
            .entityBuilder()
            .stringProperty('singleLinkedValue')
            .build()
        )
        .build();
      expect(entity).toStrictEqual(expectedEntity);
    });

    it('should build an entity from json with 1:1 link and custom fields in link', () => {
      const stringProperty = 'stringProperty';

      const entity = commonEntityApi.entityBuilder().fromJson({
        stringProperty,
        toSingleLink: {
          stringProperty: 'singleLinkedValue',
          customField: 'customField'
        }
      });
      const expectedEntity = commonEntityApi
        .entityBuilder()
        .stringProperty(stringProperty)
        .toSingleLink(
          new CommonEntitySingleLinkApi()
            .entityBuilder()
            .stringProperty('singleLinkedValue')
            .withCustomFields({ customField: 'customField' })
            .build()
        )
        .build();
      expect(entity).toStrictEqual(expectedEntity);
    });

    it('should build an entity from json with custom fields', () => {
      const entityJson = {
        customField: 'customField'
      };
      const entity = commonEntityApi.entityBuilder().fromJson(entityJson);
      const expectedEntity = commonEntityApi
        .entityBuilder()
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
      const entity = commonEntityApi.entityBuilder().fromJson(entityJson);
      const expectedEntity = commonEntityApi
        .entityBuilder()
        .complexTypeProperty(entityJson.complexTypeProperty)
        .build();
      expect(entity).toStrictEqual(expectedEntity);
    });

    it('should build an entity from json with collection fields', () => {
      const entityJson = {
        collectionProperty: ['collectionValue']
      };
      const entity = commonEntityApi.entityBuilder().fromJson(entityJson);
      const expectedEntity = commonEntityApi
        .entityBuilder()
        .collectionProperty(entityJson.collectionProperty)
        .build();
      expect(entity).toStrictEqual(expectedEntity);
    });

    it('should build an entity from json with empty collection field', () => {
      const entityJson = {
        collectionProperty: []
      };
      const entity = commonEntityApi.entityBuilder().fromJson(entityJson);
      const expectedEntity = commonEntityApi
        .entityBuilder()
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
      const entity = commonEntityApi.entityBuilder().fromJson(entityJson);
      const expectedEntity = commonEntityApi
        .entityBuilder()
        .withCustomFields(entityJson._customFields)
        .build();
      expect(entity.getCustomFields()).toEqual(
        expectedEntity.getCustomFields()
      );
      expect(warnSpy).toHaveBeenCalled();
    });
  });
});
