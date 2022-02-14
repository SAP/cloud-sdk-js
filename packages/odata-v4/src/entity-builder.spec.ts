import { TestEntity } from '@sap-cloud-sdk/test-services/v4/test-service';
import moment from 'moment';
import BigNumber from 'bignumber.js';
import {
  testEntityApi,
  testEntityLvl2SingleLinkApi,
  testEntityMultiLinkApi,
  testEntitySingleLinkApi
} from '../test/test-util';

describe('entity-builder', () => {
  it('should build an entity with non-primitive JS types (moment, BigNumber etc.)', () => {
    const expected: TestEntity = testEntityApi.entityBuilder().build();

    expected.dateProperty = moment();
    expected.decimalProperty = new BigNumber(10);

    const actual = testEntityApi
      .entityBuilder()
      .dateProperty(expected.dateProperty)
      .decimalProperty(expected.decimalProperty)
      .build();

    expect(expected).toEqual(actual);
  });

  it('should build an entity from json with navigation property', () => {
    const stringProperty = 'stringProperty';
    const singleLinkStringProperty = 'singleLinkedValue';
    const multiLinkStringProperty = 'multiLinkedValue';
    const entity = testEntityApi.entityBuilder().fromJson({
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
    const expectedEntity = testEntityApi
      .entityBuilder()
      .stringProperty(stringProperty)
      .toSingleLink(
        testEntitySingleLinkApi
          .entityBuilder()
          .stringProperty(singleLinkStringProperty)
          .build()
      )
      .toMultiLink([
        testEntityMultiLinkApi
          .entityBuilder()
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
    const entity = testEntityApi.entityBuilder().fromJson({
      stringProperty,
      toSingleLink: {
        stringProperty: singleLinkStringProperty,
        toSingleLink: {
          stringProperty: nestedSingleLinkStringProperty
        }
      }
    });
    const expectedEntity = testEntityApi
      .entityBuilder()
      .stringProperty(stringProperty)
      .toSingleLink(
        testEntitySingleLinkApi
          .entityBuilder()
          .stringProperty(singleLinkStringProperty)
          .toSingleLink(
            testEntityLvl2SingleLinkApi
              .entityBuilder()
              .stringProperty(nestedSingleLinkStringProperty)
              .build()
          )
          .build()
      )
      .build();
    expect(entity).toStrictEqual(expectedEntity);
  });

  it('should build an entity from json with existing entities as navigation properties', () => {
    const expectedEntity = testEntityApi
      .entityBuilder()
      .stringProperty('someValue')
      .toSingleLink(
        testEntitySingleLinkApi
          .entityBuilder()
          .stringProperty('singleLinkedValue')
          .withCustomFields({ customField: 'customField' })
          .build()
      )
      .toMultiLink([
        testEntityMultiLinkApi
          .entityBuilder()
          .stringProperty('singleLinkedValue')
          .build()
      ])
      .build();

    const entityJson = {
      stringProperty: expectedEntity.stringProperty,
      toSingleLink: expectedEntity.toSingleLink,
      toMultiLink: expectedEntity.toMultiLink
    };
    const entity = testEntityApi.entityBuilder().fromJson(entityJson);

    expect(entity).toStrictEqual(expectedEntity);
    expect(entity.toSingleLink!.getCustomFields()).toEqual(
      expectedEntity.toSingleLink!.getCustomFields()
    );
  });

  it('should build an entity from json with one-to-one navigation properties being null', () => {
    const entity = testEntityApi.entityBuilder().fromJson({
      toSingleLink: null
    });
    const expectedEntity = testEntityApi
      .entityBuilder()
      .toSingleLink(null)
      .build();
    expect(entity).toStrictEqual(expectedEntity);
  });

  it('should build an entity from json with one-to-one navigation properties being undefined', () => {
    const entity = testEntityApi.entityBuilder().fromJson({
      toSingleLink: undefined
    });
    const expectedEntity = testEntityApi
      .entityBuilder()
      .toSingleLink(undefined)
      .build();
    expect(entity).toStrictEqual(expectedEntity);
  });
});
