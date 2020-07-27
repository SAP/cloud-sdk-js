/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import BigNumber from 'bignumber.js';
import moment from 'moment';
import { EntityBuilder } from '../../src';
import { muteLoggers } from '../test-util/mute-logger';
import {
  TestEntity,
  TestEntitySingleLink
} from '../test-util/test-services/v2/test-service';

describe('EntityBuilder', () => {
  beforeAll(() => {
    muteLoggers('entity-builder');
  });

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

  it('should build an entity from json', () => {
    const builder = TestEntity.builder();
    const linkedEntity = TestEntitySingleLink.builder()
      .stringProperty('someString')
      .withCustomFields({ linkedCustomField: 'someLinkedValue' })
      .build();

    const entityJson: Partial<TestEntity> = {
      stringProperty: 'someValue',
      toSingleLink: linkedEntity
    };
    entityJson['_customFields'] = { additionalField: 'someAdditionalValue' };
    const actual = builder.fromJson(entityJson);
    expect(actual.stringProperty).toBe(entityJson.stringProperty);
    expect(actual.getCustomFields()).toEqual(entityJson['_customFields']);
    expect(actual.toSingleLink.stringProperty).toBe(
      linkedEntity.stringProperty
    );
    expect(actual.toSingleLink.getCustomFields()).toEqual(
      linkedEntity.getCustomFields()
    );
  });

  it('should build an entity with non-primitive JS types (moment, BigNumber etc.)', () => {
    const expected: TestEntity = new TestEntity();

    expected.dateTimeProperty = moment();
    expected.decimalProperty = new BigNumber(10);

    const actual = TestEntity.builder()
      .dateTimeProperty(expected.dateTimeProperty)
      .decimalProperty(expected.decimalProperty)
      .build();

    expect(expected).toEqual(actual);
  });
});
