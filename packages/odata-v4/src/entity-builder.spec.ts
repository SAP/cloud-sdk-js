import { CommonEntity } from '@sap-cloud-sdk/odata-common/test/common-entity';
import {
  TestEntity,
  TestEntityLvl2SingleLink,
  TestEntityMultiLink,
  TestEntitySingleLink
} from '@sap-cloud-sdk/test-services/v4/test-service';
import moment from 'moment';
import BigNumber from 'bignumber.js';

describe('entity-builder', () => {
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

  it('should build an entity from json with navigation property', () => {
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
    const entity = CommonEntity.builder().fromJson({
      toSingleLink: null
    });
    const expectedEntity = TestEntity.builder().toSingleLink(null).build();
    expect(entity).toStrictEqual(expectedEntity);
  });

  it('should build an entity from json with one-to-one navigation properties being undefined', () => {
    const entity = CommonEntity.builder().fromJson({
      toSingleLink: undefined
    });
    const expectedEntity = TestEntity.builder().toSingleLink(undefined).build();
    expect(entity).toStrictEqual(expectedEntity);
  });
});
