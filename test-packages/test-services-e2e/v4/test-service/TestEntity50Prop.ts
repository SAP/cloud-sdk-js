/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  Entity,
  DefaultDeSerializers,
  DeSerializers,
  DeserializedType
} from '@sap-cloud-sdk/odata-v4';
import type { TestEntity50PropApi } from './TestEntity50PropApi';

/**
 * This class represents the entity "TestEntity50Prop" of service "TestService".
 */
export class TestEntity50Prop<T extends DeSerializers = DefaultDeSerializers>
  extends Entity
  implements TestEntity50PropType<T>
{
  /**
   * Technical entity name for TestEntity50Prop.
   */
  static override _entityName = 'TestEntity50Prop';
  /**
   * Default url path for the according service.
   */
  static override _defaultBasePath = '/odata/test-service';
  /**
   * All key fields of the TestEntity50Prop entity.
   */
  static _keys = ['KeyTestEntity50Prop'];
  /**
   * Key Test Entity 50 Prop.
   */
  declare keyTestEntity50Prop: DeserializedType<T, 'Edm.Int32'>;
  /**
   * String Property 1.
   * Maximum length: 111.
   * @nullable
   */
  declare stringProperty1?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Guid Property 1.
   * @nullable
   */
  declare guidProperty1?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Boolean Property 1.
   * @nullable
   */
  declare booleanProperty1?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Int 64 Property 1.
   * @nullable
   */
  declare int64Property1?: DeserializedType<T, 'Edm.Int64'> | null;
  /**
   * Double Property 1.
   * @nullable
   */
  declare doubleProperty1?: DeserializedType<T, 'Edm.Double'> | null;
  /**
   * Decimal Property 1.
   * @nullable
   */
  declare decimalProperty1?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Date Property 1.
   * @nullable
   */
  declare dateProperty1?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Time Of Day Property 1.
   * @nullable
   */
  declare timeOfDayProperty1?: DeserializedType<T, 'Edm.TimeOfDay'> | null;
  /**
   * Data Time Offset Data Time Property 1.
   * @nullable
   */
  declare dataTimeOffsetDataTimeProperty1?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
  /**
   * Data Time Offset Timestamp Property 1.
   * @nullable
   */
  declare dataTimeOffsetTimestampProperty1?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
  /**
   * String Property 2.
   * Maximum length: 111.
   * @nullable
   */
  declare stringProperty2?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Guid Property 2.
   * @nullable
   */
  declare guidProperty2?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Boolean Property 2.
   * @nullable
   */
  declare booleanProperty2?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Int 64 Property 2.
   * @nullable
   */
  declare int64Property2?: DeserializedType<T, 'Edm.Int64'> | null;
  /**
   * Double Property 2.
   * @nullable
   */
  declare doubleProperty2?: DeserializedType<T, 'Edm.Double'> | null;
  /**
   * Decimal Property 2.
   * @nullable
   */
  declare decimalProperty2?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Date Property 2.
   * @nullable
   */
  declare dateProperty2?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Time Of Day Property 2.
   * @nullable
   */
  declare timeOfDayProperty2?: DeserializedType<T, 'Edm.TimeOfDay'> | null;
  /**
   * Data Time Offset Data Time Property 2.
   * @nullable
   */
  declare dataTimeOffsetDataTimeProperty2?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
  /**
   * Data Time Offset Timestamp Property 2.
   * @nullable
   */
  declare dataTimeOffsetTimestampProperty2?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
  /**
   * String Property 3.
   * Maximum length: 111.
   * @nullable
   */
  declare stringProperty3?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Guid Property 3.
   * @nullable
   */
  declare guidProperty3?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Boolean Property 3.
   * @nullable
   */
  declare booleanProperty3?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Int 64 Property 3.
   * @nullable
   */
  declare int64Property3?: DeserializedType<T, 'Edm.Int64'> | null;
  /**
   * Double Property 3.
   * @nullable
   */
  declare doubleProperty3?: DeserializedType<T, 'Edm.Double'> | null;
  /**
   * Decimal Property 3.
   * @nullable
   */
  declare decimalProperty3?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Date Property 3.
   * @nullable
   */
  declare dateProperty3?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Time Of Day Property 3.
   * @nullable
   */
  declare timeOfDayProperty3?: DeserializedType<T, 'Edm.TimeOfDay'> | null;
  /**
   * Data Time Offset Data Time Property 3.
   * @nullable
   */
  declare dataTimeOffsetDataTimeProperty3?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
  /**
   * Data Time Offset Timestamp Property 3.
   * @nullable
   */
  declare dataTimeOffsetTimestampProperty3?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
  /**
   * String Property 4.
   * Maximum length: 111.
   * @nullable
   */
  declare stringProperty4?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Guid Property 4.
   * @nullable
   */
  declare guidProperty4?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Boolean Property 4.
   * @nullable
   */
  declare booleanProperty4?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Int 64 Property 4.
   * @nullable
   */
  declare int64Property4?: DeserializedType<T, 'Edm.Int64'> | null;
  /**
   * Double Property 4.
   * @nullable
   */
  declare doubleProperty4?: DeserializedType<T, 'Edm.Double'> | null;
  /**
   * Decimal Property 4.
   * @nullable
   */
  declare decimalProperty4?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Date Property 4.
   * @nullable
   */
  declare dateProperty4?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Time Of Day Property 4.
   * @nullable
   */
  declare timeOfDayProperty4?: DeserializedType<T, 'Edm.TimeOfDay'> | null;
  /**
   * Data Time Offset Data Time Property 4.
   * @nullable
   */
  declare dataTimeOffsetDataTimeProperty4?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
  /**
   * Data Time Offset Timestamp Property 4.
   * @nullable
   */
  declare dataTimeOffsetTimestampProperty4?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
  /**
   * String Property 5.
   * Maximum length: 111.
   * @nullable
   */
  declare stringProperty5?: DeserializedType<T, 'Edm.String'> | null;
  /**
   * Guid Property 5.
   * @nullable
   */
  declare guidProperty5?: DeserializedType<T, 'Edm.Guid'> | null;
  /**
   * Boolean Property 5.
   * @nullable
   */
  declare booleanProperty5?: DeserializedType<T, 'Edm.Boolean'> | null;
  /**
   * Int 64 Property 5.
   * @nullable
   */
  declare int64Property5?: DeserializedType<T, 'Edm.Int64'> | null;
  /**
   * Double Property 5.
   * @nullable
   */
  declare doubleProperty5?: DeserializedType<T, 'Edm.Double'> | null;
  /**
   * Decimal Property 5.
   * @nullable
   */
  declare decimalProperty5?: DeserializedType<T, 'Edm.Decimal'> | null;
  /**
   * Date Property 5.
   * @nullable
   */
  declare dateProperty5?: DeserializedType<T, 'Edm.Date'> | null;
  /**
   * Time Of Day Property 5.
   * @nullable
   */
  declare timeOfDayProperty5?: DeserializedType<T, 'Edm.TimeOfDay'> | null;
  /**
   * Data Time Offset Data Time Property 5.
   * @nullable
   */
  declare dataTimeOffsetDataTimeProperty5?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
  /**
   * Data Time Offset Timestamp Property 5.
   * @nullable
   */
  declare dataTimeOffsetTimestampProperty5?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;

  constructor(_entityApi: TestEntity50PropApi<T>) {
    super(_entityApi);
  }
}

export interface TestEntity50PropType<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyTestEntity50Prop: DeserializedType<T, 'Edm.Int32'>;
  stringProperty1?: DeserializedType<T, 'Edm.String'> | null;
  guidProperty1?: DeserializedType<T, 'Edm.Guid'> | null;
  booleanProperty1?: DeserializedType<T, 'Edm.Boolean'> | null;
  int64Property1?: DeserializedType<T, 'Edm.Int64'> | null;
  doubleProperty1?: DeserializedType<T, 'Edm.Double'> | null;
  decimalProperty1?: DeserializedType<T, 'Edm.Decimal'> | null;
  dateProperty1?: DeserializedType<T, 'Edm.Date'> | null;
  timeOfDayProperty1?: DeserializedType<T, 'Edm.TimeOfDay'> | null;
  dataTimeOffsetDataTimeProperty1?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
  dataTimeOffsetTimestampProperty1?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
  stringProperty2?: DeserializedType<T, 'Edm.String'> | null;
  guidProperty2?: DeserializedType<T, 'Edm.Guid'> | null;
  booleanProperty2?: DeserializedType<T, 'Edm.Boolean'> | null;
  int64Property2?: DeserializedType<T, 'Edm.Int64'> | null;
  doubleProperty2?: DeserializedType<T, 'Edm.Double'> | null;
  decimalProperty2?: DeserializedType<T, 'Edm.Decimal'> | null;
  dateProperty2?: DeserializedType<T, 'Edm.Date'> | null;
  timeOfDayProperty2?: DeserializedType<T, 'Edm.TimeOfDay'> | null;
  dataTimeOffsetDataTimeProperty2?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
  dataTimeOffsetTimestampProperty2?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
  stringProperty3?: DeserializedType<T, 'Edm.String'> | null;
  guidProperty3?: DeserializedType<T, 'Edm.Guid'> | null;
  booleanProperty3?: DeserializedType<T, 'Edm.Boolean'> | null;
  int64Property3?: DeserializedType<T, 'Edm.Int64'> | null;
  doubleProperty3?: DeserializedType<T, 'Edm.Double'> | null;
  decimalProperty3?: DeserializedType<T, 'Edm.Decimal'> | null;
  dateProperty3?: DeserializedType<T, 'Edm.Date'> | null;
  timeOfDayProperty3?: DeserializedType<T, 'Edm.TimeOfDay'> | null;
  dataTimeOffsetDataTimeProperty3?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
  dataTimeOffsetTimestampProperty3?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
  stringProperty4?: DeserializedType<T, 'Edm.String'> | null;
  guidProperty4?: DeserializedType<T, 'Edm.Guid'> | null;
  booleanProperty4?: DeserializedType<T, 'Edm.Boolean'> | null;
  int64Property4?: DeserializedType<T, 'Edm.Int64'> | null;
  doubleProperty4?: DeserializedType<T, 'Edm.Double'> | null;
  decimalProperty4?: DeserializedType<T, 'Edm.Decimal'> | null;
  dateProperty4?: DeserializedType<T, 'Edm.Date'> | null;
  timeOfDayProperty4?: DeserializedType<T, 'Edm.TimeOfDay'> | null;
  dataTimeOffsetDataTimeProperty4?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
  dataTimeOffsetTimestampProperty4?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
  stringProperty5?: DeserializedType<T, 'Edm.String'> | null;
  guidProperty5?: DeserializedType<T, 'Edm.Guid'> | null;
  booleanProperty5?: DeserializedType<T, 'Edm.Boolean'> | null;
  int64Property5?: DeserializedType<T, 'Edm.Int64'> | null;
  doubleProperty5?: DeserializedType<T, 'Edm.Double'> | null;
  decimalProperty5?: DeserializedType<T, 'Edm.Decimal'> | null;
  dateProperty5?: DeserializedType<T, 'Edm.Date'> | null;
  timeOfDayProperty5?: DeserializedType<T, 'Edm.TimeOfDay'> | null;
  dataTimeOffsetDataTimeProperty5?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
  dataTimeOffsetTimestampProperty5?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
}
