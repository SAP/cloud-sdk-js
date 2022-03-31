import { TestEntity50ColRequestBuilder } from './TestEntity50ColRequestBuilder';
import { Moment } from 'moment';
import { BigNumber } from 'bignumber.js';
import { AllFields, CustomFieldV4, EdmTypeField, EntityBuilderType, EntityV4, Field, OrderableEdmTypeField, Time } from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "TestEntity50Col" of service "TestService".
 */
export declare class TestEntity50Col extends EntityV4 implements TestEntity50ColType {
    /**
     * Technical entity name for TestEntity50Col.
     */
    static _entityName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * Key Test Entity 50 Col.
     */
    keyTestEntity50Col: number;
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
    static builder(): EntityBuilderType<TestEntity50Col, TestEntity50ColType>;
    /**
     * Returns a request builder to construct requests for operations on the `TestEntity50Col` entity type.
     * @returns A `TestEntity50Col` request builder.
     */
    static requestBuilder(): TestEntity50ColRequestBuilder;
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntity50Col`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `TestEntity50Col`.
     */
    static customField(fieldName: string): CustomFieldV4<TestEntity50Col>;
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    toJSON(): {
        [key: string]: any;
    };
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
export declare namespace TestEntity50Col {
    /**
     * Static representation of the [[keyTestEntity50Col]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const KEY_TEST_ENTITY_50_COL: OrderableEdmTypeField<TestEntity50Col, "Edm.Int32", false, true>;
    /**
     * Static representation of the [[stringProperty1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const STRING_PROPERTY_1: EdmTypeField<TestEntity50Col, "Edm.String", true, true>;
    /**
     * Static representation of the [[guidProperty1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const GUID_PROPERTY_1: EdmTypeField<TestEntity50Col, "Edm.Guid", true, true>;
    /**
     * Static representation of the [[booleanProperty1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BOOLEAN_PROPERTY_1: EdmTypeField<TestEntity50Col, "Edm.Boolean", true, true>;
    /**
     * Static representation of the [[int64Property1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const INT_64_PROPERTY_1: OrderableEdmTypeField<TestEntity50Col, "Edm.Int64", true, true>;
    /**
     * Static representation of the [[doubleProperty1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DOUBLE_PROPERTY_1: OrderableEdmTypeField<TestEntity50Col, "Edm.Double", true, true>;
    /**
     * Static representation of the [[decimalProperty1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DECIMAL_PROPERTY_1: OrderableEdmTypeField<TestEntity50Col, "Edm.Decimal", true, true>;
    /**
     * Static representation of the [[dateProperty1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATE_PROPERTY_1: OrderableEdmTypeField<TestEntity50Col, "Edm.Date", true, true>;
    /**
     * Static representation of the [[timeOfDayProperty1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const TIME_OF_DAY_PROPERTY_1: OrderableEdmTypeField<TestEntity50Col, "Edm.TimeOfDay", true, true>;
    /**
     * Static representation of the [[dataTimeOffsetDataTimeProperty1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATA_TIME_OFFSET_DATA_TIME_PROPERTY_1: OrderableEdmTypeField<TestEntity50Col, "Edm.DateTimeOffset", true, true>;
    /**
     * Static representation of the [[dataTimeOffsetTimestampProperty1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_1: OrderableEdmTypeField<TestEntity50Col, "Edm.DateTimeOffset", true, true>;
    /**
     * Static representation of the [[stringProperty2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const STRING_PROPERTY_2: EdmTypeField<TestEntity50Col, "Edm.String", true, true>;
    /**
     * Static representation of the [[guidProperty2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const GUID_PROPERTY_2: EdmTypeField<TestEntity50Col, "Edm.Guid", true, true>;
    /**
     * Static representation of the [[booleanProperty2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BOOLEAN_PROPERTY_2: EdmTypeField<TestEntity50Col, "Edm.Boolean", true, true>;
    /**
     * Static representation of the [[int64Property2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const INT_64_PROPERTY_2: OrderableEdmTypeField<TestEntity50Col, "Edm.Int64", true, true>;
    /**
     * Static representation of the [[doubleProperty2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DOUBLE_PROPERTY_2: OrderableEdmTypeField<TestEntity50Col, "Edm.Double", true, true>;
    /**
     * Static representation of the [[decimalProperty2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DECIMAL_PROPERTY_2: OrderableEdmTypeField<TestEntity50Col, "Edm.Decimal", true, true>;
    /**
     * Static representation of the [[dateProperty2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATE_PROPERTY_2: OrderableEdmTypeField<TestEntity50Col, "Edm.Date", true, true>;
    /**
     * Static representation of the [[timeOfDayProperty2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const TIME_OF_DAY_PROPERTY_2: OrderableEdmTypeField<TestEntity50Col, "Edm.TimeOfDay", true, true>;
    /**
     * Static representation of the [[dataTimeOffsetDataTimeProperty2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATA_TIME_OFFSET_DATA_TIME_PROPERTY_2: OrderableEdmTypeField<TestEntity50Col, "Edm.DateTimeOffset", true, true>;
    /**
     * Static representation of the [[dataTimeOffsetTimestampProperty2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_2: OrderableEdmTypeField<TestEntity50Col, "Edm.DateTimeOffset", true, true>;
    /**
     * Static representation of the [[stringProperty3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const STRING_PROPERTY_3: EdmTypeField<TestEntity50Col, "Edm.String", true, true>;
    /**
     * Static representation of the [[guidProperty3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const GUID_PROPERTY_3: EdmTypeField<TestEntity50Col, "Edm.Guid", true, true>;
    /**
     * Static representation of the [[booleanProperty3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BOOLEAN_PROPERTY_3: EdmTypeField<TestEntity50Col, "Edm.Boolean", true, true>;
    /**
     * Static representation of the [[int64Property3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const INT_64_PROPERTY_3: OrderableEdmTypeField<TestEntity50Col, "Edm.Int64", true, true>;
    /**
     * Static representation of the [[doubleProperty3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DOUBLE_PROPERTY_3: OrderableEdmTypeField<TestEntity50Col, "Edm.Double", true, true>;
    /**
     * Static representation of the [[decimalProperty3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DECIMAL_PROPERTY_3: OrderableEdmTypeField<TestEntity50Col, "Edm.Decimal", true, true>;
    /**
     * Static representation of the [[dateProperty3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATE_PROPERTY_3: OrderableEdmTypeField<TestEntity50Col, "Edm.Date", true, true>;
    /**
     * Static representation of the [[timeOfDayProperty3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const TIME_OF_DAY_PROPERTY_3: OrderableEdmTypeField<TestEntity50Col, "Edm.TimeOfDay", true, true>;
    /**
     * Static representation of the [[dataTimeOffsetDataTimeProperty3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATA_TIME_OFFSET_DATA_TIME_PROPERTY_3: OrderableEdmTypeField<TestEntity50Col, "Edm.DateTimeOffset", true, true>;
    /**
     * Static representation of the [[dataTimeOffsetTimestampProperty3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_3: OrderableEdmTypeField<TestEntity50Col, "Edm.DateTimeOffset", true, true>;
    /**
     * Static representation of the [[stringProperty4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const STRING_PROPERTY_4: EdmTypeField<TestEntity50Col, "Edm.String", true, true>;
    /**
     * Static representation of the [[guidProperty4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const GUID_PROPERTY_4: EdmTypeField<TestEntity50Col, "Edm.Guid", true, true>;
    /**
     * Static representation of the [[booleanProperty4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BOOLEAN_PROPERTY_4: EdmTypeField<TestEntity50Col, "Edm.Boolean", true, true>;
    /**
     * Static representation of the [[int64Property4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const INT_64_PROPERTY_4: OrderableEdmTypeField<TestEntity50Col, "Edm.Int64", true, true>;
    /**
     * Static representation of the [[doubleProperty4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DOUBLE_PROPERTY_4: OrderableEdmTypeField<TestEntity50Col, "Edm.Double", true, true>;
    /**
     * Static representation of the [[decimalProperty4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DECIMAL_PROPERTY_4: OrderableEdmTypeField<TestEntity50Col, "Edm.Decimal", true, true>;
    /**
     * Static representation of the [[dateProperty4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATE_PROPERTY_4: OrderableEdmTypeField<TestEntity50Col, "Edm.Date", true, true>;
    /**
     * Static representation of the [[timeOfDayProperty4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const TIME_OF_DAY_PROPERTY_4: OrderableEdmTypeField<TestEntity50Col, "Edm.TimeOfDay", true, true>;
    /**
     * Static representation of the [[dataTimeOffsetDataTimeProperty4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATA_TIME_OFFSET_DATA_TIME_PROPERTY_4: OrderableEdmTypeField<TestEntity50Col, "Edm.DateTimeOffset", true, true>;
    /**
     * Static representation of the [[dataTimeOffsetTimestampProperty4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_4: OrderableEdmTypeField<TestEntity50Col, "Edm.DateTimeOffset", true, true>;
    /**
     * Static representation of the [[stringProperty5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const STRING_PROPERTY_5: EdmTypeField<TestEntity50Col, "Edm.String", true, true>;
    /**
     * Static representation of the [[guidProperty5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const GUID_PROPERTY_5: EdmTypeField<TestEntity50Col, "Edm.Guid", true, true>;
    /**
     * Static representation of the [[booleanProperty5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BOOLEAN_PROPERTY_5: EdmTypeField<TestEntity50Col, "Edm.Boolean", true, true>;
    /**
     * Static representation of the [[int64Property5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const INT_64_PROPERTY_5: OrderableEdmTypeField<TestEntity50Col, "Edm.Int64", true, true>;
    /**
     * Static representation of the [[doubleProperty5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DOUBLE_PROPERTY_5: OrderableEdmTypeField<TestEntity50Col, "Edm.Double", true, true>;
    /**
     * Static representation of the [[decimalProperty5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DECIMAL_PROPERTY_5: OrderableEdmTypeField<TestEntity50Col, "Edm.Decimal", true, true>;
    /**
     * Static representation of the [[dateProperty5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATE_PROPERTY_5: OrderableEdmTypeField<TestEntity50Col, "Edm.Date", true, true>;
    /**
     * Static representation of the [[timeOfDayProperty5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const TIME_OF_DAY_PROPERTY_5: OrderableEdmTypeField<TestEntity50Col, "Edm.TimeOfDay", true, true>;
    /**
     * Static representation of the [[dataTimeOffsetDataTimeProperty5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATA_TIME_OFFSET_DATA_TIME_PROPERTY_5: OrderableEdmTypeField<TestEntity50Col, "Edm.DateTimeOffset", true, true>;
    /**
     * Static representation of the [[dataTimeOffsetTimestampProperty5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_5: OrderableEdmTypeField<TestEntity50Col, "Edm.DateTimeOffset", true, true>;
    /**
     * All fields of the TestEntity50Col entity.
     */
    const _allFields: Array<OrderableEdmTypeField<TestEntity50Col, 'Edm.Int32', false, true> | EdmTypeField<TestEntity50Col, 'Edm.String', true, true> | EdmTypeField<TestEntity50Col, 'Edm.Guid', true, true> | EdmTypeField<TestEntity50Col, 'Edm.Boolean', true, true> | OrderableEdmTypeField<TestEntity50Col, 'Edm.Int64', true, true> | OrderableEdmTypeField<TestEntity50Col, 'Edm.Double', true, true> | OrderableEdmTypeField<TestEntity50Col, 'Edm.Decimal', true, true> | OrderableEdmTypeField<TestEntity50Col, 'Edm.Date', true, true> | OrderableEdmTypeField<TestEntity50Col, 'Edm.TimeOfDay', true, true> | OrderableEdmTypeField<TestEntity50Col, 'Edm.DateTimeOffset', true, true>>;
    /**
     * All fields selector.
     */
    const ALL_FIELDS: AllFields<TestEntity50Col>;
    /**
     * All key fields of the TestEntity50Col entity.
     */
    const _keyFields: Array<Field<TestEntity50Col, boolean, boolean>>;
    /**
     * Mapping of all key field names to the respective static field property TestEntity50Col.
     */
    const _keys: {
        [keys: string]: Field<TestEntity50Col, boolean, boolean>;
    };
}
//# sourceMappingURL=TestEntity50Col.d.ts.map