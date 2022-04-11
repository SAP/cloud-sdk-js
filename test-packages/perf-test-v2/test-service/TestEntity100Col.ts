/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Entity, DefaultDeSerializers, DeSerializers, DeserializedType } from '@sap-cloud-sdk/odata-v4';

/**
 * This class represents the entity "TestEntity100Col" of service "TestService".
 */
export class TestEntity100Col<T extends DeSerializers = DefaultDeSerializers> extends Entity implements TestEntity100ColType<T> {
  /**
   * Technical entity name for TestEntity100Col.
   */
  static _entityName = 'TestEntity100Col';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/odata/test-service';
  /**
   * All key fields of the TestEntity100Col entity
   */
  static _keys = ['KeyTestEntity100Col'];
  /**
   * Key Test Entity 100 Col.
   */
  keyTestEntity100Col!: DeserializedType<T, 'Edm.Int32'>;
  /**
   * String Property 1.
   * Maximum length: 111.
   * @nullable
   */
  stringProperty1?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Guid Property 1.
   * @nullable
   */
  guidProperty1?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Boolean Property 1.
   * @nullable
   */
  booleanProperty1?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Int 64 Property 1.
   * @nullable
   */
  int64Property1?: DeserializedType<T, 'Edm.Int64'> | null;
  /**
   * Double Property 1.
   * @nullable
   */
  doubleProperty1?: DeserializedType<T, 'Edm.Double'> | null;
  /**
   * Decimal Property 1.
   * @nullable
   */
  decimalProperty1?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Date Property 1.
   * @nullable
   */
  dateProperty1?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Time Of Day Property 1.
   * @nullable
   */
  timeOfDayProperty1?: DeserializedType<T, 'Edm.TimeOfDay'> | null;
  /**
   * Data Time Offset Data Time Property 1.
   * @nullable
   */
  dataTimeOffsetDataTimeProperty1?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * Data Time Offset Timestamp Property 1.
   * @nullable
   */
  dataTimeOffsetTimestampProperty1?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * String Property 2.
   * Maximum length: 111.
   * @nullable
   */
  stringProperty2?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Guid Property 2.
   * @nullable
   */
  guidProperty2?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Boolean Property 2.
   * @nullable
   */
  booleanProperty2?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Int 64 Property 2.
   * @nullable
   */
  int64Property2?: DeserializedType<T, 'Edm.Int64'> | null;
  /**
   * Double Property 2.
   * @nullable
   */
  doubleProperty2?: DeserializedType<T, 'Edm.Double'> | null;
  /**
   * Decimal Property 2.
   * @nullable
   */
  decimalProperty2?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Date Property 2.
   * @nullable
   */
  dateProperty2?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Time Of Day Property 2.
   * @nullable
   */
  timeOfDayProperty2?: DeserializedType<T, 'Edm.TimeOfDay'> | null;
  /**
   * Data Time Offset Data Time Property 2.
   * @nullable
   */
  dataTimeOffsetDataTimeProperty2?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * Data Time Offset Timestamp Property 2.
   * @nullable
   */
  dataTimeOffsetTimestampProperty2?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * String Property 3.
   * Maximum length: 111.
   * @nullable
   */
  stringProperty3?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Guid Property 3.
   * @nullable
   */
  guidProperty3?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Boolean Property 3.
   * @nullable
   */
  booleanProperty3?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Int 64 Property 3.
   * @nullable
   */
  int64Property3?: DeserializedType<T, 'Edm.Int64'> | null;
  /**
   * Double Property 3.
   * @nullable
   */
  doubleProperty3?: DeserializedType<T, 'Edm.Double'> | null;
  /**
   * Decimal Property 3.
   * @nullable
   */
  decimalProperty3?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Date Property 3.
   * @nullable
   */
  dateProperty3?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Time Of Day Property 3.
   * @nullable
   */
  timeOfDayProperty3?: DeserializedType<T, 'Edm.TimeOfDay'> | null;
  /**
   * Data Time Offset Data Time Property 3.
   * @nullable
   */
  dataTimeOffsetDataTimeProperty3?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * Data Time Offset Timestamp Property 3.
   * @nullable
   */
  dataTimeOffsetTimestampProperty3?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * String Property 4.
   * Maximum length: 111.
   * @nullable
   */
  stringProperty4?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Guid Property 4.
   * @nullable
   */
  guidProperty4?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Boolean Property 4.
   * @nullable
   */
  booleanProperty4?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Int 64 Property 4.
   * @nullable
   */
  int64Property4?: DeserializedType<T, 'Edm.Int64'> | null;
  /**
   * Double Property 4.
   * @nullable
   */
  doubleProperty4?: DeserializedType<T, 'Edm.Double'> | null;
  /**
   * Decimal Property 4.
   * @nullable
   */
  decimalProperty4?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Date Property 4.
   * @nullable
   */
  dateProperty4?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Time Of Day Property 4.
   * @nullable
   */
  timeOfDayProperty4?: DeserializedType<T, 'Edm.TimeOfDay'> | null;
  /**
   * Data Time Offset Data Time Property 4.
   * @nullable
   */
  dataTimeOffsetDataTimeProperty4?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * Data Time Offset Timestamp Property 4.
   * @nullable
   */
  dataTimeOffsetTimestampProperty4?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * String Property 5.
   * Maximum length: 111.
   * @nullable
   */
  stringProperty5?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Guid Property 5.
   * @nullable
   */
  guidProperty5?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Boolean Property 5.
   * @nullable
   */
  booleanProperty5?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Int 64 Property 5.
   * @nullable
   */
  int64Property5?: DeserializedType<T, 'Edm.Int64'> | null;
  /**
   * Double Property 5.
   * @nullable
   */
  doubleProperty5?: DeserializedType<T, 'Edm.Double'> | null;
  /**
   * Decimal Property 5.
   * @nullable
   */
  decimalProperty5?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Date Property 5.
   * @nullable
   */
  dateProperty5?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Time Of Day Property 5.
   * @nullable
   */
  timeOfDayProperty5?: DeserializedType<T, 'Edm.TimeOfDay'> | null;
  /**
   * Data Time Offset Data Time Property 5.
   * @nullable
   */
  dataTimeOffsetDataTimeProperty5?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * Data Time Offset Timestamp Property 5.
   * @nullable
   */
  dataTimeOffsetTimestampProperty5?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * String Property 11.
   * Maximum length: 111.
   * @nullable
   */
  stringProperty11?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Guid Property 11.
   * @nullable
   */
  guidProperty11?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Boolean Property 11.
   * @nullable
   */
  booleanProperty11?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Int 64 Property 11.
   * @nullable
   */
  int64Property11?: DeserializedType<T, 'Edm.Int64'> | null;
  /**
   * Double Property 11.
   * @nullable
   */
  doubleProperty11?: DeserializedType<T, 'Edm.Double'> | null;
  /**
   * Decimal Property 11.
   * @nullable
   */
  decimalProperty11?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Date Property 11.
   * @nullable
   */
  dateProperty11?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Time Of Day Property 11.
   * @nullable
   */
  timeOfDayProperty11?: DeserializedType<T, 'Edm.TimeOfDay'> | null;
  /**
   * Data Time Offset Data Time Property 11.
   * @nullable
   */
  dataTimeOffsetDataTimeProperty11?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * Data Time Offset Timestamp Property 11.
   * @nullable
   */
  dataTimeOffsetTimestampProperty11?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * String Property 12.
   * Maximum length: 111.
   * @nullable
   */
  stringProperty12?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Guid Property 12.
   * @nullable
   */
  guidProperty12?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Boolean Property 12.
   * @nullable
   */
  booleanProperty12?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Int 64 Property 12.
   * @nullable
   */
  int64Property12?: DeserializedType<T, 'Edm.Int64'> | null;
  /**
   * Double Property 12.
   * @nullable
   */
  doubleProperty12?: DeserializedType<T, 'Edm.Double'> | null;
  /**
   * Decimal Property 12.
   * @nullable
   */
  decimalProperty12?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Date Property 12.
   * @nullable
   */
  dateProperty12?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Time Of Day Property 12.
   * @nullable
   */
  timeOfDayProperty12?: DeserializedType<T, 'Edm.TimeOfDay'> | null;
  /**
   * Data Time Offset Data Time Property 12.
   * @nullable
   */
  dataTimeOffsetDataTimeProperty12?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * Data Time Offset Timestamp Property 12.
   * @nullable
   */
  dataTimeOffsetTimestampProperty12?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * String Property 13.
   * Maximum length: 111.
   * @nullable
   */
  stringProperty13?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Guid Property 13.
   * @nullable
   */
  guidProperty13?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Boolean Property 13.
   * @nullable
   */
  booleanProperty13?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Int 64 Property 13.
   * @nullable
   */
  int64Property13?: DeserializedType<T, 'Edm.Int64'> | null;
  /**
   * Double Property 13.
   * @nullable
   */
  doubleProperty13?: DeserializedType<T, 'Edm.Double'> | null;
  /**
   * Decimal Property 13.
   * @nullable
   */
  decimalProperty13?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Date Property 13.
   * @nullable
   */
  dateProperty13?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Time Of Day Property 13.
   * @nullable
   */
  timeOfDayProperty13?: DeserializedType<T, 'Edm.TimeOfDay'> | null;
  /**
   * Data Time Offset Data Time Property 13.
   * @nullable
   */
  dataTimeOffsetDataTimeProperty13?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * Data Time Offset Timestamp Property 13.
   * @nullable
   */
  dataTimeOffsetTimestampProperty13?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * String Property 14.
   * Maximum length: 111.
   * @nullable
   */
  stringProperty14?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Guid Property 14.
   * @nullable
   */
  guidProperty14?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Boolean Property 14.
   * @nullable
   */
  booleanProperty14?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Int 64 Property 14.
   * @nullable
   */
  int64Property14?: DeserializedType<T, 'Edm.Int64'> | null;
  /**
   * Double Property 14.
   * @nullable
   */
  doubleProperty14?: DeserializedType<T, 'Edm.Double'> | null;
  /**
   * Decimal Property 14.
   * @nullable
   */
  decimalProperty14?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Date Property 14.
   * @nullable
   */
  dateProperty14?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Time Of Day Property 14.
   * @nullable
   */
  timeOfDayProperty14?: DeserializedType<T, 'Edm.TimeOfDay'> | null;
  /**
   * Data Time Offset Data Time Property 14.
   * @nullable
   */
  dataTimeOffsetDataTimeProperty14?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * Data Time Offset Timestamp Property 14.
   * @nullable
   */
  dataTimeOffsetTimestampProperty14?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * String Property 15.
   * Maximum length: 111.
   * @nullable
   */
  stringProperty15?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Guid Property 15.
   * @nullable
   */
  guidProperty15?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Boolean Property 15.
   * @nullable
   */
  booleanProperty15?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Int 64 Property 15.
   * @nullable
   */
  int64Property15?: DeserializedType<T, 'Edm.Int64'> | null;
  /**
   * Double Property 15.
   * @nullable
   */
  doubleProperty15?: DeserializedType<T, 'Edm.Double'> | null;
  /**
   * Decimal Property 15.
   * @nullable
   */
  decimalProperty15?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Date Property 15.
   * @nullable
   */
  dateProperty15?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Time Of Day Property 15.
   * @nullable
   */
  timeOfDayProperty15?: DeserializedType<T, 'Edm.TimeOfDay'> | null;
  /**
   * Data Time Offset Data Time Property 15.
   * @nullable
   */
  dataTimeOffsetDataTimeProperty15?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  /**
   * Data Time Offset Timestamp Property 15.
   * @nullable
   */
  dataTimeOffsetTimestampProperty15?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
}

export interface TestEntity100ColType<T extends DeSerializers = DefaultDeSerializers> {
  keyTestEntity100Col: DeserializedType<T, 'Edm.Int32'>;
  stringProperty1?: DeserializedType<T, 'Edm.String'> | null;
  guidProperty1?: DeserializedType<T, 'Edm.Guid'> | null;
  booleanProperty1?: DeserializedType<T, 'Edm.Boolean'> | null;
  int64Property1?: DeserializedType<T, 'Edm.Int64'> | null;
  doubleProperty1?: DeserializedType<T, 'Edm.Double'> | null;
  decimalProperty1?: DeserializedType<T, 'Edm.Decimal'> | null;
  dateProperty1?: DeserializedType<T, 'Edm.Date'> | null;
  timeOfDayProperty1?: DeserializedType<T, 'Edm.TimeOfDay'> | null;
  dataTimeOffsetDataTimeProperty1?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  dataTimeOffsetTimestampProperty1?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  stringProperty2?: DeserializedType<T, 'Edm.String'> | null;
  guidProperty2?: DeserializedType<T, 'Edm.Guid'> | null;
  booleanProperty2?: DeserializedType<T, 'Edm.Boolean'> | null;
  int64Property2?: DeserializedType<T, 'Edm.Int64'> | null;
  doubleProperty2?: DeserializedType<T, 'Edm.Double'> | null;
  decimalProperty2?: DeserializedType<T, 'Edm.Decimal'> | null;
  dateProperty2?: DeserializedType<T, 'Edm.Date'> | null;
  timeOfDayProperty2?: DeserializedType<T, 'Edm.TimeOfDay'> | null;
  dataTimeOffsetDataTimeProperty2?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  dataTimeOffsetTimestampProperty2?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  stringProperty3?: DeserializedType<T, 'Edm.String'> | null;
  guidProperty3?: DeserializedType<T, 'Edm.Guid'> | null;
  booleanProperty3?: DeserializedType<T, 'Edm.Boolean'> | null;
  int64Property3?: DeserializedType<T, 'Edm.Int64'> | null;
  doubleProperty3?: DeserializedType<T, 'Edm.Double'> | null;
  decimalProperty3?: DeserializedType<T, 'Edm.Decimal'> | null;
  dateProperty3?: DeserializedType<T, 'Edm.Date'> | null;
  timeOfDayProperty3?: DeserializedType<T, 'Edm.TimeOfDay'> | null;
  dataTimeOffsetDataTimeProperty3?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  dataTimeOffsetTimestampProperty3?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  stringProperty4?: DeserializedType<T, 'Edm.String'> | null;
  guidProperty4?: DeserializedType<T, 'Edm.Guid'> | null;
  booleanProperty4?: DeserializedType<T, 'Edm.Boolean'> | null;
  int64Property4?: DeserializedType<T, 'Edm.Int64'> | null;
  doubleProperty4?: DeserializedType<T, 'Edm.Double'> | null;
  decimalProperty4?: DeserializedType<T, 'Edm.Decimal'> | null;
  dateProperty4?: DeserializedType<T, 'Edm.Date'> | null;
  timeOfDayProperty4?: DeserializedType<T, 'Edm.TimeOfDay'> | null;
  dataTimeOffsetDataTimeProperty4?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  dataTimeOffsetTimestampProperty4?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  stringProperty5?: DeserializedType<T, 'Edm.String'> | null;
  guidProperty5?: DeserializedType<T, 'Edm.Guid'> | null;
  booleanProperty5?: DeserializedType<T, 'Edm.Boolean'> | null;
  int64Property5?: DeserializedType<T, 'Edm.Int64'> | null;
  doubleProperty5?: DeserializedType<T, 'Edm.Double'> | null;
  decimalProperty5?: DeserializedType<T, 'Edm.Decimal'> | null;
  dateProperty5?: DeserializedType<T, 'Edm.Date'> | null;
  timeOfDayProperty5?: DeserializedType<T, 'Edm.TimeOfDay'> | null;
  dataTimeOffsetDataTimeProperty5?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  dataTimeOffsetTimestampProperty5?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  stringProperty11?: DeserializedType<T, 'Edm.String'> | null;
  guidProperty11?: DeserializedType<T, 'Edm.Guid'> | null;
  booleanProperty11?: DeserializedType<T, 'Edm.Boolean'> | null;
  int64Property11?: DeserializedType<T, 'Edm.Int64'> | null;
  doubleProperty11?: DeserializedType<T, 'Edm.Double'> | null;
  decimalProperty11?: DeserializedType<T, 'Edm.Decimal'> | null;
  dateProperty11?: DeserializedType<T, 'Edm.Date'> | null;
  timeOfDayProperty11?: DeserializedType<T, 'Edm.TimeOfDay'> | null;
  dataTimeOffsetDataTimeProperty11?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  dataTimeOffsetTimestampProperty11?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  stringProperty12?: DeserializedType<T, 'Edm.String'> | null;
  guidProperty12?: DeserializedType<T, 'Edm.Guid'> | null;
  booleanProperty12?: DeserializedType<T, 'Edm.Boolean'> | null;
  int64Property12?: DeserializedType<T, 'Edm.Int64'> | null;
  doubleProperty12?: DeserializedType<T, 'Edm.Double'> | null;
  decimalProperty12?: DeserializedType<T, 'Edm.Decimal'> | null;
  dateProperty12?: DeserializedType<T, 'Edm.Date'> | null;
  timeOfDayProperty12?: DeserializedType<T, 'Edm.TimeOfDay'> | null;
  dataTimeOffsetDataTimeProperty12?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  dataTimeOffsetTimestampProperty12?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  stringProperty13?: DeserializedType<T, 'Edm.String'> | null;
  guidProperty13?: DeserializedType<T, 'Edm.Guid'> | null;
  booleanProperty13?: DeserializedType<T, 'Edm.Boolean'> | null;
  int64Property13?: DeserializedType<T, 'Edm.Int64'> | null;
  doubleProperty13?: DeserializedType<T, 'Edm.Double'> | null;
  decimalProperty13?: DeserializedType<T, 'Edm.Decimal'> | null;
  dateProperty13?: DeserializedType<T, 'Edm.Date'> | null;
  timeOfDayProperty13?: DeserializedType<T, 'Edm.TimeOfDay'> | null;
  dataTimeOffsetDataTimeProperty13?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  dataTimeOffsetTimestampProperty13?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  stringProperty14?: DeserializedType<T, 'Edm.String'> | null;
  guidProperty14?: DeserializedType<T, 'Edm.Guid'> | null;
  booleanProperty14?: DeserializedType<T, 'Edm.Boolean'> | null;
  int64Property14?: DeserializedType<T, 'Edm.Int64'> | null;
  doubleProperty14?: DeserializedType<T, 'Edm.Double'> | null;
  decimalProperty14?: DeserializedType<T, 'Edm.Decimal'> | null;
  dateProperty14?: DeserializedType<T, 'Edm.Date'> | null;
  timeOfDayProperty14?: DeserializedType<T, 'Edm.TimeOfDay'> | null;
  dataTimeOffsetDataTimeProperty14?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  dataTimeOffsetTimestampProperty14?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  stringProperty15?: DeserializedType<T, 'Edm.String'> | null;
  guidProperty15?: DeserializedType<T, 'Edm.Guid'> | null;
  booleanProperty15?: DeserializedType<T, 'Edm.Boolean'> | null;
  int64Property15?: DeserializedType<T, 'Edm.Int64'> | null;
  doubleProperty15?: DeserializedType<T, 'Edm.Double'> | null;
  decimalProperty15?: DeserializedType<T, 'Edm.Decimal'> | null;
  dateProperty15?: DeserializedType<T, 'Edm.Date'> | null;
  timeOfDayProperty15?: DeserializedType<T, 'Edm.TimeOfDay'> | null;
  dataTimeOffsetDataTimeProperty15?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  dataTimeOffsetTimestampProperty15?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
}
