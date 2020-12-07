/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityRequestBuilder } from './TestEntityRequestBuilder';
import { Moment } from 'moment';
import { BigNumber } from 'bignumber.js';
import { AllFields, AnyField, BigNumberField, BooleanField, CollectionField, CustomFieldV4, DateField, DurationField, EntityBuilderType, EntityV4, EnumField, Field, NumberField, OneToManyLink, OneToOneLink, StringField, Time, TimeField } from '../../../../../src';
import { Temporal } from 'proposal-temporal';
import PlainDate = Temporal.PlainDate;
import Duration = Temporal.Duration;
import { DataTimeDefault, DateTime } from '../../../../../src/temporal-deserializers';

/**
 * This class represents the entity "A_TestEntity" of service "API_TEST_SRV".
 */
export class TestEntity<T extends DateTime = DataTimeDefault> extends EntityV4<T> implements TestEntityType<T> {
  /**
   * Technical entity name for TestEntity.
   */
  static _entityName = 'A_TestEntity';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * Key Property Guid.
   */
  keyPropertyGuid!: string;
  /**
   * Key Property String.
   */
  keyPropertyString!: string;
  /**
   * Date Property.
   * @nullable
   */
  dateProperty?: T["Edm.Date"];
  /**
   * Duration Property.
   * @nullable
   */
  durationProperty?: T["Edm.Duration"];
  // durationProperty?: Duration;

  /**
   * Returns an entity builder to construct instances of `TestEntity`.
   * @returns A builder that constructs instances of entity type `TestEntity`.
   */
  static builder<T extends DateTime = DataTimeDefault>(): EntityBuilderType<TestEntity<T>, TestEntityType<T>> {
    return EntityV4.entityBuilder(TestEntity) as EntityBuilderType<TestEntity<T>, TestEntityType<T>>;
  }

  /**
   * Returns a request builder to construct requests for operations on the `TestEntity` entity type.
   * @returns A `TestEntity` request builder.
   */
  static requestBuilder(): TestEntityRequestBuilder {
    return new TestEntityRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntity`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntity`.
   */
  static customField<T extends DateTime>(fieldName: string): CustomFieldV4<TestEntity<T>> {
    return EntityV4.customFieldSelector(fieldName, TestEntity) as CustomFieldV4<TestEntity<T>>;
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface TestEntityType<T extends DateTime> {
  keyPropertyGuid: string;
  keyPropertyString: string;
  dateProperty?: PlainDate | null;
  durationProperty?: T["Edm.Duration"] | null;
}

export namespace TestEntity {
  /**
   * Static representation of the [[keyPropertyGuid]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY_GUID: StringField<TestEntity<DateTime>> = new StringField('KeyPropertyGuid', TestEntity, 'Edm.Guid');
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY_STRING: StringField<TestEntity<DateTime>> = new StringField('KeyPropertyString', TestEntity, 'Edm.String');
  /**
   * Static representation of the [[dateProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DATE_PROPERTY: DateField<TestEntity<DateTime>> = new DateField('DateProperty', TestEntity, 'Edm.Date');
  /**
   * Static representation of the [[durationProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DURATION_PROPERTY: DurationField<TestEntity<DateTime>> = new DurationField('DurationProperty', TestEntity, 'Edm.Duration');
  /**
   * All fields of the TestEntity entity.
   */
  export const _allFields: Array<StringField<TestEntity<DateTime>> | TimeField<TestEntity<DateTime>> | DateField<TestEntity<DateTime>> | DurationField<TestEntity<DateTime>> > = [
    TestEntity.KEY_PROPERTY_GUID,
    TestEntity.KEY_PROPERTY_STRING,
    TestEntity.DATE_PROPERTY,
    TestEntity.DURATION_PROPERTY,
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<TestEntity> = new AllFields('*', TestEntity);
  /**
   * All key fields of the TestEntity entity.
   */
  export const _keyFields: Array<Field<TestEntity<DateTime>>> = [TestEntity.KEY_PROPERTY_GUID, TestEntity.KEY_PROPERTY_STRING];
  /**
   * Mapping of all key field names to the respective static field property TestEntity.
   */
  export const _keys: { [keys: string]: Field<TestEntity<DateTime>> } = TestEntity._keyFields.reduce((acc: { [keys: string]: Field<TestEntity<DateTime>> }, field: Field<TestEntity<DateTime>>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
