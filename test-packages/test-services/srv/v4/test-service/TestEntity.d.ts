import { TestEntityRequestBuilder } from './TestEntityRequestBuilder';
import { Moment, Duration } from 'moment';
import { BigNumber } from 'bignumber.js';
import { TestComplexType, TestComplexTypeField } from './TestComplexType';
import { AllFields, BigNumberField, BooleanField, CollectionField, CustomField, DateField, DurationField, Entity, EntityBuilderType, Field, NumberField, OneToManyLink, OneToOneLink, StringField, Time, TimeField } from '@sap-cloud-sdk/core/v4';
/**
 * This class represents the entity "A_TestEntity" of service "API_TEST_SRV".
 */
export declare class TestEntity extends Entity implements TestEntityType {
    /**
     * Technical entity name for TestEntity.
     */
    static _entityName: string;
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for TestEntity.
     */
    static _serviceName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * Key Property Guid.
     */
    keyPropertyGuid: string;
    /**
     * Key Property String.
     */
    keyPropertyString: string;
    /**
     * String Property.
     * Maximum length: 10.
     * @nullable
     */
    stringProperty?: string;
    /**
     * Boolean Property.
     * @nullable
     */
    booleanProperty?: boolean;
    /**
     * Guid Property.
     * @nullable
     */
    guidProperty?: string;
    /**
     * Int 16 Property.
     * @nullable
     */
    int16Property?: number;
    /**
     * Int 32 Property.
     * @nullable
     */
    int32Property?: number;
    /**
     * Int 64 Property.
     * @nullable
     */
    int64Property?: BigNumber;
    /**
     * Decimal Property.
     * @nullable
     */
    decimalProperty?: BigNumber;
    /**
     * Single Property.
     * @nullable
     */
    singleProperty?: number;
    /**
     * Double Property.
     * @nullable
     */
    doubleProperty?: number;
    /**
     * Float Property.
     * @nullable
     */
    floatProperty?: number;
    /**
     * Time Of Day Property.
     * @nullable
     */
    timeOfDayProperty?: Time;
    /**
     * Date Property.
     * @nullable
     */
    dateProperty?: Moment;
    /**
     * Date Time Off Set Property.
     * @nullable
     */
    dateTimeOffSetProperty?: Moment;
    /**
     * Duration Property.
     * @nullable
     */
    durationProperty?: Duration;
    /**
     * Byte Property.
     * @nullable
     */
    byteProperty?: number;
    /**
     * S Byte Property.
     * @nullable
     */
    sByteProperty?: number;
    /**
     * Collection Property.
     * Maximum length: 10.
     * @nullable
     */
    collectionProperty?: string[];
    /**
     * Complex Type Property.
     * @nullable
     */
    complexTypeProperty?: TestComplexType;
    /**
     * Complex Type Collection Property.
     * @nullable
     */
    complexTypeCollectionProperty?: TestComplexType[];
    /**
     * One-to-many navigation property to the [[TestEntityMultiLink]] entity.
     */
    toMultiLink: TestEntityMultiLink[];
    /**
     * One-to-many navigation property to the [[TestEntityMultiLink]] entity.
     */
    toOtherMultiLink: TestEntityMultiLink[];
    /**
     * One-to-one navigation property to the [[TestEntitySingleLink]] entity.
     */
    toSingleLink: TestEntitySingleLink;
    /**
     * Returns an entity builder to construct instances `TestEntity`.
     * @returns A builder that constructs instances of entity type `TestEntity`.
     */
    static builder(): EntityBuilderType<TestEntity, TestEntityTypeForceMandatory>;
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
    static customField(fieldName: string): CustomField<TestEntity>;
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    toJSON(): {
        [key: string]: any;
    };
}
import { TestEntityMultiLink, TestEntityMultiLinkType } from './TestEntityMultiLink';
import { TestEntitySingleLink, TestEntitySingleLinkType } from './TestEntitySingleLink';
export interface TestEntityType {
    keyPropertyGuid: string;
    keyPropertyString: string;
    stringProperty?: string;
    booleanProperty?: boolean;
    guidProperty?: string;
    int16Property?: number;
    int32Property?: number;
    int64Property?: BigNumber;
    decimalProperty?: BigNumber;
    singleProperty?: number;
    doubleProperty?: number;
    floatProperty?: number;
    timeOfDayProperty?: Time;
    dateProperty?: Moment;
    dateTimeOffSetProperty?: Moment;
    durationProperty?: Duration;
    byteProperty?: number;
    sByteProperty?: number;
    collectionProperty?: string[];
    complexTypeProperty?: TestComplexType;
    complexTypeCollectionProperty?: TestComplexType[];
    toMultiLink: TestEntityMultiLinkType[];
    toOtherMultiLink: TestEntityMultiLinkType[];
    toSingleLink: TestEntitySingleLinkType;
}
export interface TestEntityTypeForceMandatory {
    keyPropertyGuid: string;
    keyPropertyString: string;
    stringProperty: string;
    booleanProperty: boolean;
    guidProperty: string;
    int16Property: number;
    int32Property: number;
    int64Property: BigNumber;
    decimalProperty: BigNumber;
    singleProperty: number;
    doubleProperty: number;
    floatProperty: number;
    timeOfDayProperty: Time;
    dateProperty: Moment;
    dateTimeOffSetProperty: Moment;
    durationProperty: Duration;
    byteProperty: number;
    sByteProperty: number;
    collectionProperty: string[];
    complexTypeProperty: TestComplexType;
    complexTypeCollectionProperty: TestComplexType[];
    toMultiLink: TestEntityMultiLinkType[];
    toOtherMultiLink: TestEntityMultiLinkType[];
    toSingleLink: TestEntitySingleLinkType;
}
export declare namespace TestEntity {
    /**
     * Static representation of the [[keyPropertyGuid]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const KEY_PROPERTY_GUID: StringField<TestEntity>;
    /**
     * Static representation of the [[keyPropertyString]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const KEY_PROPERTY_STRING: StringField<TestEntity>;
    /**
     * Static representation of the [[stringProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const STRING_PROPERTY: StringField<TestEntity>;
    /**
     * Static representation of the [[booleanProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BOOLEAN_PROPERTY: BooleanField<TestEntity>;
    /**
     * Static representation of the [[guidProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const GUID_PROPERTY: StringField<TestEntity>;
    /**
     * Static representation of the [[int16Property]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const INT_16_PROPERTY: NumberField<TestEntity>;
    /**
     * Static representation of the [[int32Property]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const INT_32_PROPERTY: NumberField<TestEntity>;
    /**
     * Static representation of the [[int64Property]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const INT_64_PROPERTY: BigNumberField<TestEntity>;
    /**
     * Static representation of the [[decimalProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DECIMAL_PROPERTY: BigNumberField<TestEntity>;
    /**
     * Static representation of the [[singleProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const SINGLE_PROPERTY: NumberField<TestEntity>;
    /**
     * Static representation of the [[doubleProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DOUBLE_PROPERTY: NumberField<TestEntity>;
    /**
     * Static representation of the [[floatProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const FLOAT_PROPERTY: NumberField<TestEntity>;
    /**
     * Static representation of the [[timeOfDayProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const TIME_OF_DAY_PROPERTY: TimeField<TestEntity>;
    /**
     * Static representation of the [[dateProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATE_PROPERTY: DateField<TestEntity>;
    /**
     * Static representation of the [[dateTimeOffSetProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATE_TIME_OFF_SET_PROPERTY: DateField<TestEntity>;
    /**
     * Static representation of the [[durationProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DURATION_PROPERTY: DurationField<TestEntity>;
    /**
     * Static representation of the [[byteProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BYTE_PROPERTY: NumberField<TestEntity>;
    /**
     * Static representation of the [[sByteProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const S_BYTE_PROPERTY: NumberField<TestEntity>;
    /**
     * Static representation of the [[collectionProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const COLLECTION_PROPERTY: CollectionField<TestEntity, 'Edm.String'>;
    /**
     * Static representation of the [[complexTypeProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const COMPLEX_TYPE_PROPERTY: TestComplexTypeField<TestEntity>;
    /**
     * Static representation of the [[complexTypeCollectionProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const COMPLEX_TYPE_COLLECTION_PROPERTY: CollectionField<TestEntity, typeof TestComplexType>;
    /**
     * Static representation of the one-to-many navigation property [[toMultiLink]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const TO_MULTI_LINK: OneToManyLink<TestEntity, TestEntityMultiLink>;
    /**
     * Static representation of the one-to-many navigation property [[toOtherMultiLink]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const TO_OTHER_MULTI_LINK: OneToManyLink<TestEntity, TestEntityMultiLink>;
    /**
     * Static representation of the one-to-one navigation property [[toSingleLink]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const TO_SINGLE_LINK: OneToOneLink<TestEntity, TestEntitySingleLink>;
    /**
     * All fields of the TestEntity entity.
     */
    const _allFields: Array<StringField<TestEntity> | BooleanField<TestEntity> | NumberField<TestEntity> | BigNumberField<TestEntity> | TimeField<TestEntity> | DateField<TestEntity> | DurationField<TestEntity> | CollectionField<TestEntity, 'Edm.String'> | TestComplexTypeField<TestEntity> | CollectionField<TestEntity, typeof TestComplexType> | OneToManyLink<TestEntity, TestEntityMultiLink> | OneToOneLink<TestEntity, TestEntitySingleLink>>;
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