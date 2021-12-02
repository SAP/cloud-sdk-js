import { createLogger } from '@sap-cloud-sdk/util';
import { CommonEntity, CommonEntitySingleLink } from '../test/common-entity';
import { EntityBuilder } from './internal';

describe('EntityBuilder', () => {
  it('should build an empty entity when no properties are defined', () => {
    const builder = new EntityBuilder<CommonEntity, unknown>(CommonEntity);
    expect(builder.build()).toEqual(new CommonEntity());
  });

  it('should build an entity with custom fields', () => {
    const builder = new EntityBuilder<CommonEntity, unknown>(CommonEntity);
    const expected = { SomeCustomField: null };
    expect(
      builder
        .withCustomFields({ SomeCustomField: null })
        .build()
        .getCustomFields()
    ).toEqual(expected);
  });

  it('ignores existing fields in custom fields', () => {
    const builder = new EntityBuilder<CommonEntity, unknown>(CommonEntity);
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

      const entity = CommonEntity.builder().fromJson({
        stringProperty
      });
      const expectedEntity = CommonEntity.builder()
        .stringProperty(stringProperty)
        .build();
      expect(entity).toStrictEqual(expectedEntity);
    });

    it('should build an entity from json with 1:1 link', () => {
      const stringProperty = 'stringProperty';

      const entity = CommonEntity.builder().fromJson({
        stringProperty,
        toSingleLink: { stringProperty: 'singleLinkedValue' }
      });
      const expectedEntity = CommonEntity.builder()
        .stringProperty(stringProperty)
        .toSingleLink(
          CommonEntitySingleLink.builder()
            .stringProperty('singleLinkedValue')
            .build()
        )
        .build();
      expect(entity).toStrictEqual(expectedEntity);
    });

    it('should build an entity from json with 1:1 link and custom fields in link', () => {
      const stringProperty = 'stringProperty';

      const entity = CommonEntity.builder().fromJson({
        stringProperty,
        toSingleLink: {
          stringProperty: 'singleLinkedValue',
          customField: 'customField'
        }
      });
      const expectedEntity = CommonEntity.builder()
        .stringProperty(stringProperty)
        .toSingleLink(
          CommonEntitySingleLink.builder()
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
      const entity = CommonEntity.builder().fromJson(entityJson);
      const expectedEntity = CommonEntity.builder()
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
      const entity = CommonEntity.builder().fromJson(entityJson);
      const expectedEntity = CommonEntity.builder()
        .complexTypeProperty(entityJson.complexTypeProperty)
        .build();
      expect(entity).toStrictEqual(expectedEntity);
    });

    it('should build an entity from json with collection fields', () => {
      const entityJson = {
        collectionProperty: ['collectionValue']
      };
      const entity = CommonEntity.builder().fromJson(entityJson);
      const expectedEntity = CommonEntity.builder()
        .collectionProperty(entityJson.collectionProperty)
        .build();
      expect(entity).toStrictEqual(expectedEntity);
    });

    it('should build an entity from json with empty collection field', () => {
      const entityJson = {
        collectionProperty: []
      };
      const entity = CommonEntity.builder().fromJson(entityJson);
      const expectedEntity = CommonEntity.builder()
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
      const entity = CommonEntity.builder().fromJson(entityJson);
      const expectedEntity = CommonEntity.builder()
        .withCustomFields(entityJson._customFields)
        .build();
      expect(entity.getCustomFields()).toEqual(
        expectedEntity.getCustomFields()
      );
      expect(warnSpy).toHaveBeenCalled();
    });
  });
});
