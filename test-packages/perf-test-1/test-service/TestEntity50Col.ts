/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntity50ColRequestBuilder } from './TestEntity50ColRequestBuilder';
import { Moment } from 'moment';
import { BigNumber } from 'bignumber.js';
import { AllFields, Constructable, CustomFieldV4, EdmTypeField, EntityBuilderType, EntityV4, Field, FieldBuilder, OrderableEdmTypeField, Time } from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "TestEntity50Col" of service "TestService".
 */
export class TestEntity50Col extends EntityV4 implements TestEntity50ColType {
  /**
   * Technical entity name for TestEntity50Col.
   */
  static _entityName = 'TestEntity50Col';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/odata/test-service';
  /**
   * Key Test Entity 50 Col.
   */
  keyTestEntity50Col!: number;
  /**
   * String Property 1.
   * Maximum length: 111.
   * @nullable
   */
  stringProperty1?: string;
  /**
   * Guid Property 1.
   * @nullable
   */
  guidProperty1?: string;
  /**
   * Boolean Property 1.
   * @nullable
   */
  booleanProperty1?: boolean;
  /**
   * Int 64 Property 1.
   * @nullable
   */
  int64Property1?: BigNumber;
  /**
   * Double Property 1.
   * @nullable
   */
  doubleProperty1?: number;
  /**
   * Decimal Property 1.
   * @nullable
   */
  decimalProperty1?: BigNumber;
  /**
   * Date Property 1.
   * @nullable
   */
  dateProperty1?: Moment;
  /**
   * Time Of Day Property 1.
   * @nullable
   */
  timeOfDayProperty1?: Time;
  /**
   * Data Time Offset Data Time Property 1.
   * @nullable
   */
  dataTimeOffsetDataTimeProperty1?: Moment;
  /**
   * Data Time Offset Timestamp Property 1.
   * @nullable
   */
  dataTimeOffsetTimestampProperty1?: Moment;
  /**
   * String Property 2.
   * Maximum length: 111.
   * @nullable
   */
  stringProperty2?: string;
  /**
   * Guid Property 2.
   * @nullable
   */
  guidProperty2?: string;
  /**
   * Boolean Property 2.
   * @nullable
   */
  booleanProperty2?: boolean;
  /**
   * Int 64 Property 2.
   * @nullable
   */
  int64Property2?: BigNumber;
  /**
   * Double Property 2.
   * @nullable
   */
  doubleProperty2?: number;
  /**
   * Decimal Property 2.
   * @nullable
   */
  decimalProperty2?: BigNumber;
  /**
   * Date Property 2.
   * @nullable
   */
  dateProperty2?: Moment;
  /**
   * Time Of Day Property 2.
   * @nullable
   */
  timeOfDayProperty2?: Time;
  /**
   * Data Time Offset Data Time Property 2.
   * @nullable
   */
  dataTimeOffsetDataTimeProperty2?: Moment;
  /**
   * Data Time Offset Timestamp Property 2.
   * @nullable
   */
  dataTimeOffsetTimestampProperty2?: Moment;
  /**
   * String Property 3.
   * Maximum length: 111.
   * @nullable
   */
  stringProperty3?: string;
  /**
   * Guid Property 3.
   * @nullable
   */
  guidProperty3?: string;
  /**
   * Boolean Property 3.
   * @nullable
   */
  booleanProperty3?: boolean;
  /**
   * Int 64 Property 3.
   * @nullable
   */
  int64Property3?: BigNumber;
  /**
   * Double Property 3.
   * @nullable
   */
  doubleProperty3?: number;
  /**
   * Decimal Property 3.
   * @nullable
   */
  decimalProperty3?: BigNumber;
  /**
   * Date Property 3.
   * @nullable
   */
  dateProperty3?: Moment;
  /**
   * Time Of Day Property 3.
   * @nullable
   */
  timeOfDayProperty3?: Time;
  /**
   * Data Time Offset Data Time Property 3.
   * @nullable
   */
  dataTimeOffsetDataTimeProperty3?: Moment;
  /**
   * Data Time Offset Timestamp Property 3.
   * @nullable
   */
  dataTimeOffsetTimestampProperty3?: Moment;
  /**
   * String Property 4.
   * Maximum length: 111.
   * @nullable
   */
  stringProperty4?: string;
  /**
   * Guid Property 4.
   * @nullable
   */
  guidProperty4?: string;
  /**
   * Boolean Property 4.
   * @nullable
   */
  booleanProperty4?: boolean;
  /**
   * Int 64 Property 4.
   * @nullable
   */
  int64Property4?: BigNumber;
  /**
   * Double Property 4.
   * @nullable
   */
  doubleProperty4?: number;
  /**
   * Decimal Property 4.
   * @nullable
   */
  decimalProperty4?: BigNumber;
  /**
   * Date Property 4.
   * @nullable
   */
  dateProperty4?: Moment;
  /**
   * Time Of Day Property 4.
   * @nullable
   */
  timeOfDayProperty4?: Time;
  /**
   * Data Time Offset Data Time Property 4.
   * @nullable
   */
  dataTimeOffsetDataTimeProperty4?: Moment;
  /**
   * Data Time Offset Timestamp Property 4.
   * @nullable
   */
  dataTimeOffsetTimestampProperty4?: Moment;
  /**
   * String Property 5.
   * Maximum length: 111.
   * @nullable
   */
  stringProperty5?: string;
  /**
   * Guid Property 5.
   * @nullable
   */
  guidProperty5?: string;
  /**
   * Boolean Property 5.
   * @nullable
   */
  booleanProperty5?: boolean;
  /**
   * Int 64 Property 5.
   * @nullable
   */
  int64Property5?: BigNumber;
  /**
   * Double Property 5.
   * @nullable
   */
  doubleProperty5?: number;
  /**
   * Decimal Property 5.
   * @nullable
   */
  decimalProperty5?: BigNumber;
  /**
   * Date Property 5.
   * @nullable
   */
  dateProperty5?: Moment;
  /**
   * Time Of Day Property 5.
   * @nullable
   */
  timeOfDayProperty5?: Time;
  /**
   * Data Time Offset Data Time Property 5.
   * @nullable
   */
  dataTimeOffsetDataTimeProperty5?: Moment;
  /**
   * Data Time Offset Timestamp Property 5.
   * @nullable
   */
  dataTimeOffsetTimestampProperty5?: Moment;

  /**
   * Returns an entity builder to construct instances of `TestEntity50Col`.
   * @returns A builder that constructs instances of entity type `TestEntity50Col`.
   */
  static builder(): EntityBuilderType<TestEntity50Col, TestEntity50ColType> {
    return EntityV4.entityBuilder(TestEntity50Col);
  }

  /**
   * Returns a request builder to construct requests for operations on the `TestEntity50Col` entity type.
   * @returns A `TestEntity50Col` request builder.
   */
  static requestBuilder(): TestEntity50ColRequestBuilder {
    return new TestEntity50ColRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntity50Col`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntity50Col`.
   */
  static customField(fieldName: string): CustomFieldV4<TestEntity50Col> {
    return EntityV4.customFieldSelector(fieldName, TestEntity50Col);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface TestEntity50ColType {
  keyTestEntity50Col: number;
  stringProperty1?: string | null;
  guidProperty1?: string | null;
  booleanProperty1?: boolean | null;
  int64Property1?: BigNumber | null;
  doubleProperty1?: number | null;
  decimalProperty1?: BigNumber | null;
  dateProperty1?: Moment | null;
  timeOfDayProperty1?: Time | null;
  dataTimeOffsetDataTimeProperty1?: Moment | null;
  dataTimeOffsetTimestampProperty1?: Moment | null;
  stringProperty2?: string | null;
  guidProperty2?: string | null;
  booleanProperty2?: boolean | null;
  int64Property2?: BigNumber | null;
  doubleProperty2?: number | null;
  decimalProperty2?: BigNumber | null;
  dateProperty2?: Moment | null;
  timeOfDayProperty2?: Time | null;
  dataTimeOffsetDataTimeProperty2?: Moment | null;
  dataTimeOffsetTimestampProperty2?: Moment | null;
  stringProperty3?: string | null;
  guidProperty3?: string | null;
  booleanProperty3?: boolean | null;
  int64Property3?: BigNumber | null;
  doubleProperty3?: number | null;
  decimalProperty3?: BigNumber | null;
  dateProperty3?: Moment | null;
  timeOfDayProperty3?: Time | null;
  dataTimeOffsetDataTimeProperty3?: Moment | null;
  dataTimeOffsetTimestampProperty3?: Moment | null;
  stringProperty4?: string | null;
  guidProperty4?: string | null;
  booleanProperty4?: boolean | null;
  int64Property4?: BigNumber | null;
  doubleProperty4?: number | null;
  decimalProperty4?: BigNumber | null;
  dateProperty4?: Moment | null;
  timeOfDayProperty4?: Time | null;
  dataTimeOffsetDataTimeProperty4?: Moment | null;
  dataTimeOffsetTimestampProperty4?: Moment | null;
  stringProperty5?: string | null;
  guidProperty5?: string | null;
  booleanProperty5?: boolean | null;
  int64Property5?: BigNumber | null;
  doubleProperty5?: number | null;
  decimalProperty5?: BigNumber | null;
  dateProperty5?: Moment | null;
  timeOfDayProperty5?: Time | null;
  dataTimeOffsetDataTimeProperty5?: Moment | null;
  dataTimeOffsetTimestampProperty5?: Moment | null;
}

export namespace TestEntity50Col {
  const _fieldBuilder: FieldBuilder<Constructable<TestEntity50Col>> = new FieldBuilder(TestEntity50Col);
  /**
   * Static representation of the [[keyTestEntity50Col]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_TEST_ENTITY_50_COL = _fieldBuilder.buildEdmTypeField('KeyTestEntity50Col', 'Edm.Int32', false);
  /**
   * Static representation of the [[stringProperty1]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const STRING_PROPERTY_1 = _fieldBuilder.buildEdmTypeField('StringProperty1', 'Edm.String', true);
  /**
   * Static representation of the [[guidProperty1]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const GUID_PROPERTY_1 = _fieldBuilder.buildEdmTypeField('GuidProperty1', 'Edm.Guid', true);
  /**
   * Static representation of the [[booleanProperty1]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BOOLEAN_PROPERTY_1 = _fieldBuilder.buildEdmTypeField('BooleanProperty1', 'Edm.Boolean', true);
  /**
   * Static representation of the [[int64Property1]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const INT_64_PROPERTY_1 = _fieldBuilder.buildEdmTypeField('Int64Property1', 'Edm.Int64', true);
  /**
   * Static representation of the [[doubleProperty1]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DOUBLE_PROPERTY_1 = _fieldBuilder.buildEdmTypeField('DoubleProperty1', 'Edm.Double', true);
  /**
   * Static representation of the [[decimalProperty1]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DECIMAL_PROPERTY_1 = _fieldBuilder.buildEdmTypeField('DecimalProperty1', 'Edm.Decimal', true);
  /**
   * Static representation of the [[dateProperty1]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DATE_PROPERTY_1 = _fieldBuilder.buildEdmTypeField('DateProperty1', 'Edm.Date', true);
  /**
   * Static representation of the [[timeOfDayProperty1]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TIME_OF_DAY_PROPERTY_1 = _fieldBuilder.buildEdmTypeField('TimeOfDayProperty1', 'Edm.TimeOfDay', true);
  /**
   * Static representation of the [[dataTimeOffsetDataTimeProperty1]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DATA_TIME_OFFSET_DATA_TIME_PROPERTY_1 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty1', 'Edm.DateTimeOffset', true);
  /**
   * Static representation of the [[dataTimeOffsetTimestampProperty1]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_1 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty1', 'Edm.DateTimeOffset', true);
  /**
   * Static representation of the [[stringProperty2]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const STRING_PROPERTY_2 = _fieldBuilder.buildEdmTypeField('StringProperty2', 'Edm.String', true);
  /**
   * Static representation of the [[guidProperty2]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const GUID_PROPERTY_2 = _fieldBuilder.buildEdmTypeField('GuidProperty2', 'Edm.Guid', true);
  /**
   * Static representation of the [[booleanProperty2]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BOOLEAN_PROPERTY_2 = _fieldBuilder.buildEdmTypeField('BooleanProperty2', 'Edm.Boolean', true);
  /**
   * Static representation of the [[int64Property2]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const INT_64_PROPERTY_2 = _fieldBuilder.buildEdmTypeField('Int64Property2', 'Edm.Int64', true);
  /**
   * Static representation of the [[doubleProperty2]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DOUBLE_PROPERTY_2 = _fieldBuilder.buildEdmTypeField('DoubleProperty2', 'Edm.Double', true);
  /**
   * Static representation of the [[decimalProperty2]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DECIMAL_PROPERTY_2 = _fieldBuilder.buildEdmTypeField('DecimalProperty2', 'Edm.Decimal', true);
  /**
   * Static representation of the [[dateProperty2]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DATE_PROPERTY_2 = _fieldBuilder.buildEdmTypeField('DateProperty2', 'Edm.Date', true);
  /**
   * Static representation of the [[timeOfDayProperty2]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TIME_OF_DAY_PROPERTY_2 = _fieldBuilder.buildEdmTypeField('TimeOfDayProperty2', 'Edm.TimeOfDay', true);
  /**
   * Static representation of the [[dataTimeOffsetDataTimeProperty2]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DATA_TIME_OFFSET_DATA_TIME_PROPERTY_2 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty2', 'Edm.DateTimeOffset', true);
  /**
   * Static representation of the [[dataTimeOffsetTimestampProperty2]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_2 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty2', 'Edm.DateTimeOffset', true);
  /**
   * Static representation of the [[stringProperty3]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const STRING_PROPERTY_3 = _fieldBuilder.buildEdmTypeField('StringProperty3', 'Edm.String', true);
  /**
   * Static representation of the [[guidProperty3]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const GUID_PROPERTY_3 = _fieldBuilder.buildEdmTypeField('GuidProperty3', 'Edm.Guid', true);
  /**
   * Static representation of the [[booleanProperty3]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BOOLEAN_PROPERTY_3 = _fieldBuilder.buildEdmTypeField('BooleanProperty3', 'Edm.Boolean', true);
  /**
   * Static representation of the [[int64Property3]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const INT_64_PROPERTY_3 = _fieldBuilder.buildEdmTypeField('Int64Property3', 'Edm.Int64', true);
  /**
   * Static representation of the [[doubleProperty3]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DOUBLE_PROPERTY_3 = _fieldBuilder.buildEdmTypeField('DoubleProperty3', 'Edm.Double', true);
  /**
   * Static representation of the [[decimalProperty3]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DECIMAL_PROPERTY_3 = _fieldBuilder.buildEdmTypeField('DecimalProperty3', 'Edm.Decimal', true);
  /**
   * Static representation of the [[dateProperty3]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DATE_PROPERTY_3 = _fieldBuilder.buildEdmTypeField('DateProperty3', 'Edm.Date', true);
  /**
   * Static representation of the [[timeOfDayProperty3]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TIME_OF_DAY_PROPERTY_3 = _fieldBuilder.buildEdmTypeField('TimeOfDayProperty3', 'Edm.TimeOfDay', true);
  /**
   * Static representation of the [[dataTimeOffsetDataTimeProperty3]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DATA_TIME_OFFSET_DATA_TIME_PROPERTY_3 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty3', 'Edm.DateTimeOffset', true);
  /**
   * Static representation of the [[dataTimeOffsetTimestampProperty3]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_3 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty3', 'Edm.DateTimeOffset', true);
  /**
   * Static representation of the [[stringProperty4]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const STRING_PROPERTY_4 = _fieldBuilder.buildEdmTypeField('StringProperty4', 'Edm.String', true);
  /**
   * Static representation of the [[guidProperty4]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const GUID_PROPERTY_4 = _fieldBuilder.buildEdmTypeField('GuidProperty4', 'Edm.Guid', true);
  /**
   * Static representation of the [[booleanProperty4]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BOOLEAN_PROPERTY_4 = _fieldBuilder.buildEdmTypeField('BooleanProperty4', 'Edm.Boolean', true);
  /**
   * Static representation of the [[int64Property4]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const INT_64_PROPERTY_4 = _fieldBuilder.buildEdmTypeField('Int64Property4', 'Edm.Int64', true);
  /**
   * Static representation of the [[doubleProperty4]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DOUBLE_PROPERTY_4 = _fieldBuilder.buildEdmTypeField('DoubleProperty4', 'Edm.Double', true);
  /**
   * Static representation of the [[decimalProperty4]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DECIMAL_PROPERTY_4 = _fieldBuilder.buildEdmTypeField('DecimalProperty4', 'Edm.Decimal', true);
  /**
   * Static representation of the [[dateProperty4]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DATE_PROPERTY_4 = _fieldBuilder.buildEdmTypeField('DateProperty4', 'Edm.Date', true);
  /**
   * Static representation of the [[timeOfDayProperty4]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TIME_OF_DAY_PROPERTY_4 = _fieldBuilder.buildEdmTypeField('TimeOfDayProperty4', 'Edm.TimeOfDay', true);
  /**
   * Static representation of the [[dataTimeOffsetDataTimeProperty4]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DATA_TIME_OFFSET_DATA_TIME_PROPERTY_4 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty4', 'Edm.DateTimeOffset', true);
  /**
   * Static representation of the [[dataTimeOffsetTimestampProperty4]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_4 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty4', 'Edm.DateTimeOffset', true);
  /**
   * Static representation of the [[stringProperty5]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const STRING_PROPERTY_5 = _fieldBuilder.buildEdmTypeField('StringProperty5', 'Edm.String', true);
  /**
   * Static representation of the [[guidProperty5]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const GUID_PROPERTY_5 = _fieldBuilder.buildEdmTypeField('GuidProperty5', 'Edm.Guid', true);
  /**
   * Static representation of the [[booleanProperty5]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BOOLEAN_PROPERTY_5 = _fieldBuilder.buildEdmTypeField('BooleanProperty5', 'Edm.Boolean', true);
  /**
   * Static representation of the [[int64Property5]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const INT_64_PROPERTY_5 = _fieldBuilder.buildEdmTypeField('Int64Property5', 'Edm.Int64', true);
  /**
   * Static representation of the [[doubleProperty5]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DOUBLE_PROPERTY_5 = _fieldBuilder.buildEdmTypeField('DoubleProperty5', 'Edm.Double', true);
  /**
   * Static representation of the [[decimalProperty5]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DECIMAL_PROPERTY_5 = _fieldBuilder.buildEdmTypeField('DecimalProperty5', 'Edm.Decimal', true);
  /**
   * Static representation of the [[dateProperty5]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DATE_PROPERTY_5 = _fieldBuilder.buildEdmTypeField('DateProperty5', 'Edm.Date', true);
  /**
   * Static representation of the [[timeOfDayProperty5]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TIME_OF_DAY_PROPERTY_5 = _fieldBuilder.buildEdmTypeField('TimeOfDayProperty5', 'Edm.TimeOfDay', true);
  /**
   * Static representation of the [[dataTimeOffsetDataTimeProperty5]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DATA_TIME_OFFSET_DATA_TIME_PROPERTY_5 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty5', 'Edm.DateTimeOffset', true);
  /**
   * Static representation of the [[dataTimeOffsetTimestampProperty5]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_5 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty5', 'Edm.DateTimeOffset', true);
  /**
   * All fields of the TestEntity50Col entity.
   */
  export const _allFields: Array<OrderableEdmTypeField<TestEntity50Col, 'Edm.Int32', false, true> | EdmTypeField<TestEntity50Col, 'Edm.String', true, true> | EdmTypeField<TestEntity50Col, 'Edm.Guid', true, true> | EdmTypeField<TestEntity50Col, 'Edm.Boolean', true, true> | OrderableEdmTypeField<TestEntity50Col, 'Edm.Int64', true, true> | OrderableEdmTypeField<TestEntity50Col, 'Edm.Double', true, true> | OrderableEdmTypeField<TestEntity50Col, 'Edm.Decimal', true, true> | OrderableEdmTypeField<TestEntity50Col, 'Edm.Date', true, true> | OrderableEdmTypeField<TestEntity50Col, 'Edm.TimeOfDay', true, true> | OrderableEdmTypeField<TestEntity50Col, 'Edm.DateTimeOffset', true, true>> = [
    TestEntity50Col.KEY_TEST_ENTITY_50_COL,
    TestEntity50Col.STRING_PROPERTY_1,
    TestEntity50Col.GUID_PROPERTY_1,
    TestEntity50Col.BOOLEAN_PROPERTY_1,
    TestEntity50Col.INT_64_PROPERTY_1,
    TestEntity50Col.DOUBLE_PROPERTY_1,
    TestEntity50Col.DECIMAL_PROPERTY_1,
    TestEntity50Col.DATE_PROPERTY_1,
    TestEntity50Col.TIME_OF_DAY_PROPERTY_1,
    TestEntity50Col.DATA_TIME_OFFSET_DATA_TIME_PROPERTY_1,
    TestEntity50Col.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_1,
    TestEntity50Col.STRING_PROPERTY_2,
    TestEntity50Col.GUID_PROPERTY_2,
    TestEntity50Col.BOOLEAN_PROPERTY_2,
    TestEntity50Col.INT_64_PROPERTY_2,
    TestEntity50Col.DOUBLE_PROPERTY_2,
    TestEntity50Col.DECIMAL_PROPERTY_2,
    TestEntity50Col.DATE_PROPERTY_2,
    TestEntity50Col.TIME_OF_DAY_PROPERTY_2,
    TestEntity50Col.DATA_TIME_OFFSET_DATA_TIME_PROPERTY_2,
    TestEntity50Col.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_2,
    TestEntity50Col.STRING_PROPERTY_3,
    TestEntity50Col.GUID_PROPERTY_3,
    TestEntity50Col.BOOLEAN_PROPERTY_3,
    TestEntity50Col.INT_64_PROPERTY_3,
    TestEntity50Col.DOUBLE_PROPERTY_3,
    TestEntity50Col.DECIMAL_PROPERTY_3,
    TestEntity50Col.DATE_PROPERTY_3,
    TestEntity50Col.TIME_OF_DAY_PROPERTY_3,
    TestEntity50Col.DATA_TIME_OFFSET_DATA_TIME_PROPERTY_3,
    TestEntity50Col.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_3,
    TestEntity50Col.STRING_PROPERTY_4,
    TestEntity50Col.GUID_PROPERTY_4,
    TestEntity50Col.BOOLEAN_PROPERTY_4,
    TestEntity50Col.INT_64_PROPERTY_4,
    TestEntity50Col.DOUBLE_PROPERTY_4,
    TestEntity50Col.DECIMAL_PROPERTY_4,
    TestEntity50Col.DATE_PROPERTY_4,
    TestEntity50Col.TIME_OF_DAY_PROPERTY_4,
    TestEntity50Col.DATA_TIME_OFFSET_DATA_TIME_PROPERTY_4,
    TestEntity50Col.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_4,
    TestEntity50Col.STRING_PROPERTY_5,
    TestEntity50Col.GUID_PROPERTY_5,
    TestEntity50Col.BOOLEAN_PROPERTY_5,
    TestEntity50Col.INT_64_PROPERTY_5,
    TestEntity50Col.DOUBLE_PROPERTY_5,
    TestEntity50Col.DECIMAL_PROPERTY_5,
    TestEntity50Col.DATE_PROPERTY_5,
    TestEntity50Col.TIME_OF_DAY_PROPERTY_5,
    TestEntity50Col.DATA_TIME_OFFSET_DATA_TIME_PROPERTY_5,
    TestEntity50Col.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_5
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<TestEntity50Col> = new AllFields('*', TestEntity50Col);
  /**
   * All key fields of the TestEntity50Col entity.
   */
  export const _keyFields: Array<Field<TestEntity50Col, boolean, boolean>> = [TestEntity50Col.KEY_TEST_ENTITY_50_COL];
  /**
   * Mapping of all key field names to the respective static field property TestEntity50Col.
   */
  export const _keys: { [keys: string]: Field<TestEntity50Col, boolean, boolean> } = TestEntity50Col._keyFields.reduce((acc: { [keys: string]: Field<TestEntity50Col, boolean, boolean> }, field: Field<TestEntity50Col, boolean, boolean>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
