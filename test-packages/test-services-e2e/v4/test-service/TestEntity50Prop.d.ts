/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
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
export declare class TestEntity50Prop<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements TestEntity50PropType<T>
{
  readonly _entityApi: TestEntity50PropApi<T>;
  /**
   * Technical entity name for TestEntity50Prop.
   */
  static _entityName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath: string;
  /**
   * All key fields of the TestEntity50Prop entity
   */
  static _keys: string[];
  /**
   * Key Test Entity 50 Prop.
   */
  keyTestEntity50Prop: DeserializedType<T, 'Edm.Int32'>;
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
  dataTimeOffsetDataTimeProperty1?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
  /**
   * Data Time Offset Timestamp Property 1.
   * @nullable
   */
  dataTimeOffsetTimestampProperty1?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
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
  dataTimeOffsetDataTimeProperty2?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
  /**
   * Data Time Offset Timestamp Property 2.
   * @nullable
   */
  dataTimeOffsetTimestampProperty2?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
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
  dataTimeOffsetDataTimeProperty3?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
  /**
   * Data Time Offset Timestamp Property 3.
   * @nullable
   */
  dataTimeOffsetTimestampProperty3?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
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
  dataTimeOffsetDataTimeProperty4?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
  /**
   * Data Time Offset Timestamp Property 4.
   * @nullable
   */
  dataTimeOffsetTimestampProperty4?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
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
  dataTimeOffsetDataTimeProperty5?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
  /**
   * Data Time Offset Timestamp Property 5.
   * @nullable
   */
  dataTimeOffsetTimestampProperty5?: DeserializedType<
    T,
    'Edm.DateTimeOffset'
  > | null;
  constructor(_entityApi: TestEntity50PropApi<T>);
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
//# sourceMappingURL=TestEntity50Prop.d.ts.map
