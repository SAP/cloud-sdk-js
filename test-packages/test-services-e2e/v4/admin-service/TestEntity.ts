/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityRequestBuilder } from './TestEntityRequestBuilder';
import { Moment } from 'moment';
import { BigNumber } from 'bignumber.js';
import { AllFields, BigNumberField, BooleanField, CustomFieldV4, DateField, EntityBuilderType, EntityV4, Field, NumberField, StringField, Time, TimeField } from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "TestEntity" of service "AdminService".
 */
export class TestEntity extends EntityV4 implements TestEntityType {
  /**
   * Technical entity name for TestEntity.
   */
  static _entityName = 'TestEntity';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for TestEntity.
   */
  static _serviceName = 'AdminService';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/admin';
  /**
   * Key Property Int.
   */
  keyPropertyInt!: number;
  /**
   * Key Property String.
   */
  keyPropertyString!: string;
  /**
   * String Property.
   * Maximum length: 111.
   * @nullable
   */
  stringProperty?: string;
  /**
   * Guid Property.
   * @nullable
   */
  guidProperty?: string;
  /**
   * Boolean Property.
   * @nullable
   */
  booleanProperty?: boolean;
  /**
   * Int 64 Property.
   * @nullable
   */
  int64Property?: BigNumber;
  /**
   * Double Property.
   * @nullable
   */
  doubleProperty?: number;
  /**
   * Decimal Property.
   * @nullable
   */
  decimalProperty?: BigNumber;
  /**
   * Date Property.
   * @nullable
   */
  dateProperty?: Moment;
  /**
   * Time Of Day Property.
   * @nullable
   */
  timeOfDayProperty?: Time;
  /**
   * Data Time Offset Data Time Property.
   * @nullable
   */
  dataTimeOffsetDataTimeProperty?: Moment;
  /**
   * Data Time Offset Timestamp Property.
   * @nullable
   */
  dataTimeOffsetTimestampProperty?: Moment;

  /**
   * Returns an entity builder to construct instances `TestEntity`.
   * @returns A builder that constructs instances of entity type `TestEntity`.
   */
  static builder(): EntityBuilderType<TestEntity, TestEntityTypeForceMandatory> {
    return EntityV4.entityBuilder(TestEntity);
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
  static customField(fieldName: string): CustomFieldV4<TestEntity> {
    return EntityV4.customFieldSelector(fieldName, TestEntity);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface TestEntityType {
  keyPropertyInt: number;
  keyPropertyString: string;
  stringProperty?: string;
  guidProperty?: string;
  booleanProperty?: boolean;
  int64Property?: BigNumber;
  doubleProperty?: number;
  decimalProperty?: BigNumber;
  dateProperty?: Moment;
  timeOfDayProperty?: Time;
  dataTimeOffsetDataTimeProperty?: Moment;
  dataTimeOffsetTimestampProperty?: Moment;
}

export interface TestEntityTypeForceMandatory {
  keyPropertyInt: number;
  keyPropertyString: string;
  stringProperty: string;
  guidProperty: string;
  booleanProperty: boolean;
  int64Property: BigNumber;
  doubleProperty: number;
  decimalProperty: BigNumber;
  dateProperty: Moment;
  timeOfDayProperty: Time;
  dataTimeOffsetDataTimeProperty: Moment;
  dataTimeOffsetTimestampProperty: Moment;
}

export namespace TestEntity {
  /**
   * Static representation of the [[keyPropertyInt]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY_INT: NumberField<TestEntity> = new NumberField('KeyPropertyInt', TestEntity, 'Edm.Int32');
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY_STRING: StringField<TestEntity> = new StringField('KeyPropertyString', TestEntity, 'Edm.String');
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const STRING_PROPERTY: StringField<TestEntity> = new StringField('StringProperty', TestEntity, 'Edm.String');
  /**
   * Static representation of the [[guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const GUID_PROPERTY: StringField<TestEntity> = new StringField('GuidProperty', TestEntity, 'Edm.Guid');
  /**
   * Static representation of the [[booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BOOLEAN_PROPERTY: BooleanField<TestEntity> = new BooleanField('BooleanProperty', TestEntity, 'Edm.Boolean');
  /**
   * Static representation of the [[int64Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const INT_64_PROPERTY: BigNumberField<TestEntity> = new BigNumberField('Int64Property', TestEntity, 'Edm.Int64');
  /**
   * Static representation of the [[doubleProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DOUBLE_PROPERTY: NumberField<TestEntity> = new NumberField('DoubleProperty', TestEntity, 'Edm.Double');
  /**
   * Static representation of the [[decimalProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DECIMAL_PROPERTY: BigNumberField<TestEntity> = new BigNumberField('DecimalProperty', TestEntity, 'Edm.Decimal');
  /**
   * Static representation of the [[dateProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DATE_PROPERTY: DateField<TestEntity> = new DateField('DateProperty', TestEntity, 'Edm.Date');
  /**
   * Static representation of the [[timeOfDayProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TIME_OF_DAY_PROPERTY: TimeField<TestEntity> = new TimeField('TimeOfDayProperty', TestEntity, 'Edm.TimeOfDay');
  /**
   * Static representation of the [[dataTimeOffsetDataTimeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DATA_TIME_OFFSET_DATA_TIME_PROPERTY: DateField<TestEntity> = new DateField('DataTimeOffsetDataTimeProperty', TestEntity, 'Edm.DateTimeOffset');
  /**
   * Static representation of the [[dataTimeOffsetTimestampProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DATA_TIME_OFFSET_TIMESTAMP_PROPERTY: DateField<TestEntity> = new DateField('DataTimeOffsetTimestampProperty', TestEntity, 'Edm.DateTimeOffset');
  /**
   * All fields of the TestEntity entity.
   */
  export const _allFields: Array<NumberField<TestEntity> | StringField<TestEntity> | BooleanField<TestEntity> | BigNumberField<TestEntity> | DateField<TestEntity> | TimeField<TestEntity>> = [
    TestEntity.KEY_PROPERTY_INT,
    TestEntity.KEY_PROPERTY_STRING,
    TestEntity.STRING_PROPERTY,
    TestEntity.GUID_PROPERTY,
    TestEntity.BOOLEAN_PROPERTY,
    TestEntity.INT_64_PROPERTY,
    TestEntity.DOUBLE_PROPERTY,
    TestEntity.DECIMAL_PROPERTY,
    TestEntity.DATE_PROPERTY,
    TestEntity.TIME_OF_DAY_PROPERTY,
    TestEntity.DATA_TIME_OFFSET_DATA_TIME_PROPERTY,
    TestEntity.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<TestEntity> = new AllFields('*', TestEntity);
  /**
   * All key fields of the TestEntity entity.
   */
  export const _keyFields: Array<Field<TestEntity>> = [TestEntity.KEY_PROPERTY_INT, TestEntity.KEY_PROPERTY_STRING];
  /**
   * Mapping of all key field names to the respective static field property TestEntity.
   */
  export const _keys: { [keys: string]: Field<TestEntity> } = TestEntity._keyFields.reduce((acc: { [keys: string]: Field<TestEntity> }, field: Field<TestEntity>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
