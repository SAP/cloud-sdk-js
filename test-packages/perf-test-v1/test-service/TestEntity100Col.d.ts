import { TestEntity100ColRequestBuilder } from './TestEntity100ColRequestBuilder';
import { Moment } from 'moment';
import { BigNumber } from 'bignumber.js';
import { AllFields, CustomFieldV4, EdmTypeField, EntityBuilderType, EntityV4, Field, OrderableEdmTypeField, Time } from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "TestEntity100Col" of service "TestService".
 */
export declare class TestEntity100Col extends EntityV4 implements TestEntity100ColType {
    /**
     * Technical entity name for TestEntity100Col.
     */
    static _entityName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * Key Test Entity 100 Col.
     */
    keyTestEntity100Col: number;
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
     * String Property 11.
     * Maximum length: 111.
     * @nullable
     */
    stringProperty11?: string;
    /**
     * Guid Property 11.
     * @nullable
     */
    guidProperty11?: string;
    /**
     * Boolean Property 11.
     * @nullable
     */
    booleanProperty11?: boolean;
    /**
     * Int 64 Property 11.
     * @nullable
     */
    int64Property11?: BigNumber;
    /**
     * Double Property 11.
     * @nullable
     */
    doubleProperty11?: number;
    /**
     * Decimal Property 11.
     * @nullable
     */
    decimalProperty11?: BigNumber;
    /**
     * Date Property 11.
     * @nullable
     */
    dateProperty11?: Moment;
    /**
     * Time Of Day Property 11.
     * @nullable
     */
    timeOfDayProperty11?: Time;
    /**
     * Data Time Offset Data Time Property 11.
     * @nullable
     */
    dataTimeOffsetDataTimeProperty11?: Moment;
    /**
     * Data Time Offset Timestamp Property 11.
     * @nullable
     */
    dataTimeOffsetTimestampProperty11?: Moment;
    /**
     * String Property 12.
     * Maximum length: 111.
     * @nullable
     */
    stringProperty12?: string;
    /**
     * Guid Property 12.
     * @nullable
     */
    guidProperty12?: string;
    /**
     * Boolean Property 12.
     * @nullable
     */
    booleanProperty12?: boolean;
    /**
     * Int 64 Property 12.
     * @nullable
     */
    int64Property12?: BigNumber;
    /**
     * Double Property 12.
     * @nullable
     */
    doubleProperty12?: number;
    /**
     * Decimal Property 12.
     * @nullable
     */
    decimalProperty12?: BigNumber;
    /**
     * Date Property 12.
     * @nullable
     */
    dateProperty12?: Moment;
    /**
     * Time Of Day Property 12.
     * @nullable
     */
    timeOfDayProperty12?: Time;
    /**
     * Data Time Offset Data Time Property 12.
     * @nullable
     */
    dataTimeOffsetDataTimeProperty12?: Moment;
    /**
     * Data Time Offset Timestamp Property 12.
     * @nullable
     */
    dataTimeOffsetTimestampProperty12?: Moment;
    /**
     * String Property 13.
     * Maximum length: 111.
     * @nullable
     */
    stringProperty13?: string;
    /**
     * Guid Property 13.
     * @nullable
     */
    guidProperty13?: string;
    /**
     * Boolean Property 13.
     * @nullable
     */
    booleanProperty13?: boolean;
    /**
     * Int 64 Property 13.
     * @nullable
     */
    int64Property13?: BigNumber;
    /**
     * Double Property 13.
     * @nullable
     */
    doubleProperty13?: number;
    /**
     * Decimal Property 13.
     * @nullable
     */
    decimalProperty13?: BigNumber;
    /**
     * Date Property 13.
     * @nullable
     */
    dateProperty13?: Moment;
    /**
     * Time Of Day Property 13.
     * @nullable
     */
    timeOfDayProperty13?: Time;
    /**
     * Data Time Offset Data Time Property 13.
     * @nullable
     */
    dataTimeOffsetDataTimeProperty13?: Moment;
    /**
     * Data Time Offset Timestamp Property 13.
     * @nullable
     */
    dataTimeOffsetTimestampProperty13?: Moment;
    /**
     * String Property 14.
     * Maximum length: 111.
     * @nullable
     */
    stringProperty14?: string;
    /**
     * Guid Property 14.
     * @nullable
     */
    guidProperty14?: string;
    /**
     * Boolean Property 14.
     * @nullable
     */
    booleanProperty14?: boolean;
    /**
     * Int 64 Property 14.
     * @nullable
     */
    int64Property14?: BigNumber;
    /**
     * Double Property 14.
     * @nullable
     */
    doubleProperty14?: number;
    /**
     * Decimal Property 14.
     * @nullable
     */
    decimalProperty14?: BigNumber;
    /**
     * Date Property 14.
     * @nullable
     */
    dateProperty14?: Moment;
    /**
     * Time Of Day Property 14.
     * @nullable
     */
    timeOfDayProperty14?: Time;
    /**
     * Data Time Offset Data Time Property 14.
     * @nullable
     */
    dataTimeOffsetDataTimeProperty14?: Moment;
    /**
     * Data Time Offset Timestamp Property 14.
     * @nullable
     */
    dataTimeOffsetTimestampProperty14?: Moment;
    /**
     * String Property 15.
     * Maximum length: 111.
     * @nullable
     */
    stringProperty15?: string;
    /**
     * Guid Property 15.
     * @nullable
     */
    guidProperty15?: string;
    /**
     * Boolean Property 15.
     * @nullable
     */
    booleanProperty15?: boolean;
    /**
     * Int 64 Property 15.
     * @nullable
     */
    int64Property15?: BigNumber;
    /**
     * Double Property 15.
     * @nullable
     */
    doubleProperty15?: number;
    /**
     * Decimal Property 15.
     * @nullable
     */
    decimalProperty15?: BigNumber;
    /**
     * Date Property 15.
     * @nullable
     */
    dateProperty15?: Moment;
    /**
     * Time Of Day Property 15.
     * @nullable
     */
    timeOfDayProperty15?: Time;
    /**
     * Data Time Offset Data Time Property 15.
     * @nullable
     */
    dataTimeOffsetDataTimeProperty15?: Moment;
    /**
     * Data Time Offset Timestamp Property 15.
     * @nullable
     */
    dataTimeOffsetTimestampProperty15?: Moment;
    /**
     * Returns an entity builder to construct instances of `TestEntity100Col`.
     * @returns A builder that constructs instances of entity type `TestEntity100Col`.
     */
    static builder(): EntityBuilderType<TestEntity100Col, TestEntity100ColType>;
    /**
     * Returns a request builder to construct requests for operations on the `TestEntity100Col` entity type.
     * @returns A `TestEntity100Col` request builder.
     */
    static requestBuilder(): TestEntity100ColRequestBuilder;
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntity100Col`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `TestEntity100Col`.
     */
    static customField(fieldName: string): CustomFieldV4<TestEntity100Col>;
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    toJSON(): {
        [key: string]: any;
    };
}
export interface TestEntity100ColType {
    keyTestEntity100Col: number;
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
    stringProperty11?: string | null;
    guidProperty11?: string | null;
    booleanProperty11?: boolean | null;
    int64Property11?: BigNumber | null;
    doubleProperty11?: number | null;
    decimalProperty11?: BigNumber | null;
    dateProperty11?: Moment | null;
    timeOfDayProperty11?: Time | null;
    dataTimeOffsetDataTimeProperty11?: Moment | null;
    dataTimeOffsetTimestampProperty11?: Moment | null;
    stringProperty12?: string | null;
    guidProperty12?: string | null;
    booleanProperty12?: boolean | null;
    int64Property12?: BigNumber | null;
    doubleProperty12?: number | null;
    decimalProperty12?: BigNumber | null;
    dateProperty12?: Moment | null;
    timeOfDayProperty12?: Time | null;
    dataTimeOffsetDataTimeProperty12?: Moment | null;
    dataTimeOffsetTimestampProperty12?: Moment | null;
    stringProperty13?: string | null;
    guidProperty13?: string | null;
    booleanProperty13?: boolean | null;
    int64Property13?: BigNumber | null;
    doubleProperty13?: number | null;
    decimalProperty13?: BigNumber | null;
    dateProperty13?: Moment | null;
    timeOfDayProperty13?: Time | null;
    dataTimeOffsetDataTimeProperty13?: Moment | null;
    dataTimeOffsetTimestampProperty13?: Moment | null;
    stringProperty14?: string | null;
    guidProperty14?: string | null;
    booleanProperty14?: boolean | null;
    int64Property14?: BigNumber | null;
    doubleProperty14?: number | null;
    decimalProperty14?: BigNumber | null;
    dateProperty14?: Moment | null;
    timeOfDayProperty14?: Time | null;
    dataTimeOffsetDataTimeProperty14?: Moment | null;
    dataTimeOffsetTimestampProperty14?: Moment | null;
    stringProperty15?: string | null;
    guidProperty15?: string | null;
    booleanProperty15?: boolean | null;
    int64Property15?: BigNumber | null;
    doubleProperty15?: number | null;
    decimalProperty15?: BigNumber | null;
    dateProperty15?: Moment | null;
    timeOfDayProperty15?: Time | null;
    dataTimeOffsetDataTimeProperty15?: Moment | null;
    dataTimeOffsetTimestampProperty15?: Moment | null;
}
export declare namespace TestEntity100Col {
    /**
     * Static representation of the [[keyTestEntity100Col]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const KEY_TEST_ENTITY_100_COL: OrderableEdmTypeField<TestEntity100Col, "Edm.Int32", false, true>;
    /**
     * Static representation of the [[stringProperty1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const STRING_PROPERTY_1: EdmTypeField<TestEntity100Col, "Edm.String", true, true>;
    /**
     * Static representation of the [[guidProperty1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const GUID_PROPERTY_1: EdmTypeField<TestEntity100Col, "Edm.Guid", true, true>;
    /**
     * Static representation of the [[booleanProperty1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BOOLEAN_PROPERTY_1: EdmTypeField<TestEntity100Col, "Edm.Boolean", true, true>;
    /**
     * Static representation of the [[int64Property1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const INT_64_PROPERTY_1: OrderableEdmTypeField<TestEntity100Col, "Edm.Int64", true, true>;
    /**
     * Static representation of the [[doubleProperty1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DOUBLE_PROPERTY_1: OrderableEdmTypeField<TestEntity100Col, "Edm.Double", true, true>;
    /**
     * Static representation of the [[decimalProperty1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DECIMAL_PROPERTY_1: OrderableEdmTypeField<TestEntity100Col, "Edm.Decimal", true, true>;
    /**
     * Static representation of the [[dateProperty1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATE_PROPERTY_1: OrderableEdmTypeField<TestEntity100Col, "Edm.Date", true, true>;
    /**
     * Static representation of the [[timeOfDayProperty1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const TIME_OF_DAY_PROPERTY_1: OrderableEdmTypeField<TestEntity100Col, "Edm.TimeOfDay", true, true>;
    /**
     * Static representation of the [[dataTimeOffsetDataTimeProperty1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATA_TIME_OFFSET_DATA_TIME_PROPERTY_1: OrderableEdmTypeField<TestEntity100Col, "Edm.DateTimeOffset", true, true>;
    /**
     * Static representation of the [[dataTimeOffsetTimestampProperty1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_1: OrderableEdmTypeField<TestEntity100Col, "Edm.DateTimeOffset", true, true>;
    /**
     * Static representation of the [[stringProperty2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const STRING_PROPERTY_2: EdmTypeField<TestEntity100Col, "Edm.String", true, true>;
    /**
     * Static representation of the [[guidProperty2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const GUID_PROPERTY_2: EdmTypeField<TestEntity100Col, "Edm.Guid", true, true>;
    /**
     * Static representation of the [[booleanProperty2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BOOLEAN_PROPERTY_2: EdmTypeField<TestEntity100Col, "Edm.Boolean", true, true>;
    /**
     * Static representation of the [[int64Property2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const INT_64_PROPERTY_2: OrderableEdmTypeField<TestEntity100Col, "Edm.Int64", true, true>;
    /**
     * Static representation of the [[doubleProperty2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DOUBLE_PROPERTY_2: OrderableEdmTypeField<TestEntity100Col, "Edm.Double", true, true>;
    /**
     * Static representation of the [[decimalProperty2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DECIMAL_PROPERTY_2: OrderableEdmTypeField<TestEntity100Col, "Edm.Decimal", true, true>;
    /**
     * Static representation of the [[dateProperty2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATE_PROPERTY_2: OrderableEdmTypeField<TestEntity100Col, "Edm.Date", true, true>;
    /**
     * Static representation of the [[timeOfDayProperty2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const TIME_OF_DAY_PROPERTY_2: OrderableEdmTypeField<TestEntity100Col, "Edm.TimeOfDay", true, true>;
    /**
     * Static representation of the [[dataTimeOffsetDataTimeProperty2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATA_TIME_OFFSET_DATA_TIME_PROPERTY_2: OrderableEdmTypeField<TestEntity100Col, "Edm.DateTimeOffset", true, true>;
    /**
     * Static representation of the [[dataTimeOffsetTimestampProperty2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_2: OrderableEdmTypeField<TestEntity100Col, "Edm.DateTimeOffset", true, true>;
    /**
     * Static representation of the [[stringProperty3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const STRING_PROPERTY_3: EdmTypeField<TestEntity100Col, "Edm.String", true, true>;
    /**
     * Static representation of the [[guidProperty3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const GUID_PROPERTY_3: EdmTypeField<TestEntity100Col, "Edm.Guid", true, true>;
    /**
     * Static representation of the [[booleanProperty3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BOOLEAN_PROPERTY_3: EdmTypeField<TestEntity100Col, "Edm.Boolean", true, true>;
    /**
     * Static representation of the [[int64Property3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const INT_64_PROPERTY_3: OrderableEdmTypeField<TestEntity100Col, "Edm.Int64", true, true>;
    /**
     * Static representation of the [[doubleProperty3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DOUBLE_PROPERTY_3: OrderableEdmTypeField<TestEntity100Col, "Edm.Double", true, true>;
    /**
     * Static representation of the [[decimalProperty3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DECIMAL_PROPERTY_3: OrderableEdmTypeField<TestEntity100Col, "Edm.Decimal", true, true>;
    /**
     * Static representation of the [[dateProperty3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATE_PROPERTY_3: OrderableEdmTypeField<TestEntity100Col, "Edm.Date", true, true>;
    /**
     * Static representation of the [[timeOfDayProperty3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const TIME_OF_DAY_PROPERTY_3: OrderableEdmTypeField<TestEntity100Col, "Edm.TimeOfDay", true, true>;
    /**
     * Static representation of the [[dataTimeOffsetDataTimeProperty3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATA_TIME_OFFSET_DATA_TIME_PROPERTY_3: OrderableEdmTypeField<TestEntity100Col, "Edm.DateTimeOffset", true, true>;
    /**
     * Static representation of the [[dataTimeOffsetTimestampProperty3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_3: OrderableEdmTypeField<TestEntity100Col, "Edm.DateTimeOffset", true, true>;
    /**
     * Static representation of the [[stringProperty4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const STRING_PROPERTY_4: EdmTypeField<TestEntity100Col, "Edm.String", true, true>;
    /**
     * Static representation of the [[guidProperty4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const GUID_PROPERTY_4: EdmTypeField<TestEntity100Col, "Edm.Guid", true, true>;
    /**
     * Static representation of the [[booleanProperty4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BOOLEAN_PROPERTY_4: EdmTypeField<TestEntity100Col, "Edm.Boolean", true, true>;
    /**
     * Static representation of the [[int64Property4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const INT_64_PROPERTY_4: OrderableEdmTypeField<TestEntity100Col, "Edm.Int64", true, true>;
    /**
     * Static representation of the [[doubleProperty4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DOUBLE_PROPERTY_4: OrderableEdmTypeField<TestEntity100Col, "Edm.Double", true, true>;
    /**
     * Static representation of the [[decimalProperty4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DECIMAL_PROPERTY_4: OrderableEdmTypeField<TestEntity100Col, "Edm.Decimal", true, true>;
    /**
     * Static representation of the [[dateProperty4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATE_PROPERTY_4: OrderableEdmTypeField<TestEntity100Col, "Edm.Date", true, true>;
    /**
     * Static representation of the [[timeOfDayProperty4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const TIME_OF_DAY_PROPERTY_4: OrderableEdmTypeField<TestEntity100Col, "Edm.TimeOfDay", true, true>;
    /**
     * Static representation of the [[dataTimeOffsetDataTimeProperty4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATA_TIME_OFFSET_DATA_TIME_PROPERTY_4: OrderableEdmTypeField<TestEntity100Col, "Edm.DateTimeOffset", true, true>;
    /**
     * Static representation of the [[dataTimeOffsetTimestampProperty4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_4: OrderableEdmTypeField<TestEntity100Col, "Edm.DateTimeOffset", true, true>;
    /**
     * Static representation of the [[stringProperty5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const STRING_PROPERTY_5: EdmTypeField<TestEntity100Col, "Edm.String", true, true>;
    /**
     * Static representation of the [[guidProperty5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const GUID_PROPERTY_5: EdmTypeField<TestEntity100Col, "Edm.Guid", true, true>;
    /**
     * Static representation of the [[booleanProperty5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BOOLEAN_PROPERTY_5: EdmTypeField<TestEntity100Col, "Edm.Boolean", true, true>;
    /**
     * Static representation of the [[int64Property5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const INT_64_PROPERTY_5: OrderableEdmTypeField<TestEntity100Col, "Edm.Int64", true, true>;
    /**
     * Static representation of the [[doubleProperty5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DOUBLE_PROPERTY_5: OrderableEdmTypeField<TestEntity100Col, "Edm.Double", true, true>;
    /**
     * Static representation of the [[decimalProperty5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DECIMAL_PROPERTY_5: OrderableEdmTypeField<TestEntity100Col, "Edm.Decimal", true, true>;
    /**
     * Static representation of the [[dateProperty5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATE_PROPERTY_5: OrderableEdmTypeField<TestEntity100Col, "Edm.Date", true, true>;
    /**
     * Static representation of the [[timeOfDayProperty5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const TIME_OF_DAY_PROPERTY_5: OrderableEdmTypeField<TestEntity100Col, "Edm.TimeOfDay", true, true>;
    /**
     * Static representation of the [[dataTimeOffsetDataTimeProperty5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATA_TIME_OFFSET_DATA_TIME_PROPERTY_5: OrderableEdmTypeField<TestEntity100Col, "Edm.DateTimeOffset", true, true>;
    /**
     * Static representation of the [[dataTimeOffsetTimestampProperty5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_5: OrderableEdmTypeField<TestEntity100Col, "Edm.DateTimeOffset", true, true>;
    /**
     * Static representation of the [[stringProperty11]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const STRING_PROPERTY_11: EdmTypeField<TestEntity100Col, "Edm.String", true, true>;
    /**
     * Static representation of the [[guidProperty11]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const GUID_PROPERTY_11: EdmTypeField<TestEntity100Col, "Edm.Guid", true, true>;
    /**
     * Static representation of the [[booleanProperty11]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BOOLEAN_PROPERTY_11: EdmTypeField<TestEntity100Col, "Edm.Boolean", true, true>;
    /**
     * Static representation of the [[int64Property11]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const INT_64_PROPERTY_11: OrderableEdmTypeField<TestEntity100Col, "Edm.Int64", true, true>;
    /**
     * Static representation of the [[doubleProperty11]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DOUBLE_PROPERTY_11: OrderableEdmTypeField<TestEntity100Col, "Edm.Double", true, true>;
    /**
     * Static representation of the [[decimalProperty11]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DECIMAL_PROPERTY_11: OrderableEdmTypeField<TestEntity100Col, "Edm.Decimal", true, true>;
    /**
     * Static representation of the [[dateProperty11]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATE_PROPERTY_11: OrderableEdmTypeField<TestEntity100Col, "Edm.Date", true, true>;
    /**
     * Static representation of the [[timeOfDayProperty11]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const TIME_OF_DAY_PROPERTY_11: OrderableEdmTypeField<TestEntity100Col, "Edm.TimeOfDay", true, true>;
    /**
     * Static representation of the [[dataTimeOffsetDataTimeProperty11]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATA_TIME_OFFSET_DATA_TIME_PROPERTY_11: OrderableEdmTypeField<TestEntity100Col, "Edm.DateTimeOffset", true, true>;
    /**
     * Static representation of the [[dataTimeOffsetTimestampProperty11]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_11: OrderableEdmTypeField<TestEntity100Col, "Edm.DateTimeOffset", true, true>;
    /**
     * Static representation of the [[stringProperty12]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const STRING_PROPERTY_12: EdmTypeField<TestEntity100Col, "Edm.String", true, true>;
    /**
     * Static representation of the [[guidProperty12]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const GUID_PROPERTY_12: EdmTypeField<TestEntity100Col, "Edm.Guid", true, true>;
    /**
     * Static representation of the [[booleanProperty12]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BOOLEAN_PROPERTY_12: EdmTypeField<TestEntity100Col, "Edm.Boolean", true, true>;
    /**
     * Static representation of the [[int64Property12]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const INT_64_PROPERTY_12: OrderableEdmTypeField<TestEntity100Col, "Edm.Int64", true, true>;
    /**
     * Static representation of the [[doubleProperty12]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DOUBLE_PROPERTY_12: OrderableEdmTypeField<TestEntity100Col, "Edm.Double", true, true>;
    /**
     * Static representation of the [[decimalProperty12]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DECIMAL_PROPERTY_12: OrderableEdmTypeField<TestEntity100Col, "Edm.Decimal", true, true>;
    /**
     * Static representation of the [[dateProperty12]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATE_PROPERTY_12: OrderableEdmTypeField<TestEntity100Col, "Edm.Date", true, true>;
    /**
     * Static representation of the [[timeOfDayProperty12]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const TIME_OF_DAY_PROPERTY_12: OrderableEdmTypeField<TestEntity100Col, "Edm.TimeOfDay", true, true>;
    /**
     * Static representation of the [[dataTimeOffsetDataTimeProperty12]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATA_TIME_OFFSET_DATA_TIME_PROPERTY_12: OrderableEdmTypeField<TestEntity100Col, "Edm.DateTimeOffset", true, true>;
    /**
     * Static representation of the [[dataTimeOffsetTimestampProperty12]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_12: OrderableEdmTypeField<TestEntity100Col, "Edm.DateTimeOffset", true, true>;
    /**
     * Static representation of the [[stringProperty13]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const STRING_PROPERTY_13: EdmTypeField<TestEntity100Col, "Edm.String", true, true>;
    /**
     * Static representation of the [[guidProperty13]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const GUID_PROPERTY_13: EdmTypeField<TestEntity100Col, "Edm.Guid", true, true>;
    /**
     * Static representation of the [[booleanProperty13]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BOOLEAN_PROPERTY_13: EdmTypeField<TestEntity100Col, "Edm.Boolean", true, true>;
    /**
     * Static representation of the [[int64Property13]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const INT_64_PROPERTY_13: OrderableEdmTypeField<TestEntity100Col, "Edm.Int64", true, true>;
    /**
     * Static representation of the [[doubleProperty13]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DOUBLE_PROPERTY_13: OrderableEdmTypeField<TestEntity100Col, "Edm.Double", true, true>;
    /**
     * Static representation of the [[decimalProperty13]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DECIMAL_PROPERTY_13: OrderableEdmTypeField<TestEntity100Col, "Edm.Decimal", true, true>;
    /**
     * Static representation of the [[dateProperty13]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATE_PROPERTY_13: OrderableEdmTypeField<TestEntity100Col, "Edm.Date", true, true>;
    /**
     * Static representation of the [[timeOfDayProperty13]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const TIME_OF_DAY_PROPERTY_13: OrderableEdmTypeField<TestEntity100Col, "Edm.TimeOfDay", true, true>;
    /**
     * Static representation of the [[dataTimeOffsetDataTimeProperty13]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATA_TIME_OFFSET_DATA_TIME_PROPERTY_13: OrderableEdmTypeField<TestEntity100Col, "Edm.DateTimeOffset", true, true>;
    /**
     * Static representation of the [[dataTimeOffsetTimestampProperty13]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_13: OrderableEdmTypeField<TestEntity100Col, "Edm.DateTimeOffset", true, true>;
    /**
     * Static representation of the [[stringProperty14]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const STRING_PROPERTY_14: EdmTypeField<TestEntity100Col, "Edm.String", true, true>;
    /**
     * Static representation of the [[guidProperty14]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const GUID_PROPERTY_14: EdmTypeField<TestEntity100Col, "Edm.Guid", true, true>;
    /**
     * Static representation of the [[booleanProperty14]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BOOLEAN_PROPERTY_14: EdmTypeField<TestEntity100Col, "Edm.Boolean", true, true>;
    /**
     * Static representation of the [[int64Property14]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const INT_64_PROPERTY_14: OrderableEdmTypeField<TestEntity100Col, "Edm.Int64", true, true>;
    /**
     * Static representation of the [[doubleProperty14]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DOUBLE_PROPERTY_14: OrderableEdmTypeField<TestEntity100Col, "Edm.Double", true, true>;
    /**
     * Static representation of the [[decimalProperty14]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DECIMAL_PROPERTY_14: OrderableEdmTypeField<TestEntity100Col, "Edm.Decimal", true, true>;
    /**
     * Static representation of the [[dateProperty14]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATE_PROPERTY_14: OrderableEdmTypeField<TestEntity100Col, "Edm.Date", true, true>;
    /**
     * Static representation of the [[timeOfDayProperty14]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const TIME_OF_DAY_PROPERTY_14: OrderableEdmTypeField<TestEntity100Col, "Edm.TimeOfDay", true, true>;
    /**
     * Static representation of the [[dataTimeOffsetDataTimeProperty14]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATA_TIME_OFFSET_DATA_TIME_PROPERTY_14: OrderableEdmTypeField<TestEntity100Col, "Edm.DateTimeOffset", true, true>;
    /**
     * Static representation of the [[dataTimeOffsetTimestampProperty14]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_14: OrderableEdmTypeField<TestEntity100Col, "Edm.DateTimeOffset", true, true>;
    /**
     * Static representation of the [[stringProperty15]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const STRING_PROPERTY_15: EdmTypeField<TestEntity100Col, "Edm.String", true, true>;
    /**
     * Static representation of the [[guidProperty15]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const GUID_PROPERTY_15: EdmTypeField<TestEntity100Col, "Edm.Guid", true, true>;
    /**
     * Static representation of the [[booleanProperty15]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BOOLEAN_PROPERTY_15: EdmTypeField<TestEntity100Col, "Edm.Boolean", true, true>;
    /**
     * Static representation of the [[int64Property15]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const INT_64_PROPERTY_15: OrderableEdmTypeField<TestEntity100Col, "Edm.Int64", true, true>;
    /**
     * Static representation of the [[doubleProperty15]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DOUBLE_PROPERTY_15: OrderableEdmTypeField<TestEntity100Col, "Edm.Double", true, true>;
    /**
     * Static representation of the [[decimalProperty15]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DECIMAL_PROPERTY_15: OrderableEdmTypeField<TestEntity100Col, "Edm.Decimal", true, true>;
    /**
     * Static representation of the [[dateProperty15]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATE_PROPERTY_15: OrderableEdmTypeField<TestEntity100Col, "Edm.Date", true, true>;
    /**
     * Static representation of the [[timeOfDayProperty15]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const TIME_OF_DAY_PROPERTY_15: OrderableEdmTypeField<TestEntity100Col, "Edm.TimeOfDay", true, true>;
    /**
     * Static representation of the [[dataTimeOffsetDataTimeProperty15]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATA_TIME_OFFSET_DATA_TIME_PROPERTY_15: OrderableEdmTypeField<TestEntity100Col, "Edm.DateTimeOffset", true, true>;
    /**
     * Static representation of the [[dataTimeOffsetTimestampProperty15]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_15: OrderableEdmTypeField<TestEntity100Col, "Edm.DateTimeOffset", true, true>;
    /**
     * All fields of the TestEntity100Col entity.
     */
    const _allFields: Array<OrderableEdmTypeField<TestEntity100Col, 'Edm.Int32', false, true> | EdmTypeField<TestEntity100Col, 'Edm.String', true, true> | EdmTypeField<TestEntity100Col, 'Edm.Guid', true, true> | EdmTypeField<TestEntity100Col, 'Edm.Boolean', true, true> | OrderableEdmTypeField<TestEntity100Col, 'Edm.Int64', true, true> | OrderableEdmTypeField<TestEntity100Col, 'Edm.Double', true, true> | OrderableEdmTypeField<TestEntity100Col, 'Edm.Decimal', true, true> | OrderableEdmTypeField<TestEntity100Col, 'Edm.Date', true, true> | OrderableEdmTypeField<TestEntity100Col, 'Edm.TimeOfDay', true, true> | OrderableEdmTypeField<TestEntity100Col, 'Edm.DateTimeOffset', true, true>>;
    /**
     * All fields selector.
     */
    const ALL_FIELDS: AllFields<TestEntity100Col>;
    /**
     * All key fields of the TestEntity100Col entity.
     */
    const _keyFields: Array<Field<TestEntity100Col, boolean, boolean>>;
    /**
     * Mapping of all key field names to the respective static field property TestEntity100Col.
     */
    const _keys: {
        [keys: string]: Field<TestEntity100Col, boolean, boolean>;
    };
}
//# sourceMappingURL=TestEntity100Col.d.ts.map