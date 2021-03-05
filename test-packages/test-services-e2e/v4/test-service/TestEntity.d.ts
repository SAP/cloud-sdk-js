import { TestEntityRequestBuilder } from './TestEntityRequestBuilder';
import { Moment } from 'moment';
import { BigNumber } from 'bignumber.js';
import { AllFields, BigNumberField, BooleanField, CustomFieldV4, DateField, EntityBuilderType, EntityV4, Field, NumberField, OneToManyLink, StringField, Time, TimeField } from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "TestEntity" of service "TestService".
 */
export declare class TestEntity extends EntityV4 implements TestEntityType {
    /**
     * Technical entity name for TestEntity.
     */
    static _entityName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * Key Test Entity.
     */
    keyTestEntity: number;
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
     * One-to-many navigation property to the [[TestEntityLink]] entity.
     */
    toMultiLink: TestEntityLink[];
    /**
     * Returns an entity builder to construct instances of `TestEntity`.
     * @returns A builder that constructs instances of entity type `TestEntity`.
     */
    static builder(): EntityBuilderType<TestEntity, TestEntityType>;
    /**
     * Returns a request builder to construct requests for operations on the `TestEntity` entity type.
     * @returns A `TestEntity` request builder.
     */
    static requestBuilder(): TestEntityRequestBuilder;
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntity`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `TestEntity`.
     */
    static customField(fieldName: string): CustomFieldV4<TestEntity>;
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    toJSON(): {
        [key: string]: any;
    };
}
import { TestEntityLink, TestEntityLinkType } from './TestEntityLink';
export interface TestEntityType {
    keyTestEntity: number;
    stringProperty?: string | null;
    guidProperty?: string | null;
    booleanProperty?: boolean | null;
    int64Property?: BigNumber | null;
    doubleProperty?: number | null;
    decimalProperty?: BigNumber | null;
    dateProperty?: Moment | null;
    timeOfDayProperty?: Time | null;
    dataTimeOffsetDataTimeProperty?: Moment | null;
    dataTimeOffsetTimestampProperty?: Moment | null;
    toMultiLink: TestEntityLinkType[];
}
export declare namespace TestEntity {
    /**
     * Static representation of the [[keyTestEntity]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const KEY_TEST_ENTITY: NumberField<TestEntity>;
    /**
     * Static representation of the [[stringProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const STRING_PROPERTY: StringField<TestEntity>;
    /**
     * Static representation of the [[guidProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const GUID_PROPERTY: StringField<TestEntity>;
    /**
     * Static representation of the [[booleanProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BOOLEAN_PROPERTY: BooleanField<TestEntity>;
    /**
     * Static representation of the [[int64Property]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const INT_64_PROPERTY: BigNumberField<TestEntity>;
    /**
     * Static representation of the [[doubleProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DOUBLE_PROPERTY: NumberField<TestEntity>;
    /**
     * Static representation of the [[decimalProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DECIMAL_PROPERTY: BigNumberField<TestEntity>;
    /**
     * Static representation of the [[dateProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATE_PROPERTY: DateField<TestEntity>;
    /**
     * Static representation of the [[timeOfDayProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const TIME_OF_DAY_PROPERTY: TimeField<TestEntity>;
    /**
     * Static representation of the [[dataTimeOffsetDataTimeProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATA_TIME_OFFSET_DATA_TIME_PROPERTY: DateField<TestEntity>;
    /**
     * Static representation of the [[dataTimeOffsetTimestampProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATA_TIME_OFFSET_TIMESTAMP_PROPERTY: DateField<TestEntity>;
    /**
     * Static representation of the one-to-many navigation property [[toMultiLink]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const TO_MULTI_LINK: OneToManyLink<TestEntity, TestEntityLink>;
    /**
     * All fields of the TestEntity entity.
     */
    const _allFields: Array<NumberField<TestEntity> | StringField<TestEntity> | BooleanField<TestEntity> | BigNumberField<TestEntity> | DateField<TestEntity> | TimeField<TestEntity> | OneToManyLink<TestEntity, TestEntityLink>>;
    /**
     * All fields selector.
     */
    const ALL_FIELDS: AllFields<TestEntity>;
    /**
     * All key fields of the TestEntity entity.
     */
    const _keyFields: Array<Field<TestEntity>>;
    /**
     * Mapping of all key field names to the respective static field property TestEntity.
     */
    const _keys: {
        [keys: string]: Field<TestEntity>;
    };
}
//# sourceMappingURL=TestEntity.d.ts.map