import { TestEntitySharesEntityType2RequestBuilder } from './TestEntitySharesEntityType2RequestBuilder';
import { Moment, Duration } from 'moment';
import { BigNumber } from 'bignumber.js';
import { TestComplexType, TestComplexTypeField } from './TestComplexType';
import { TestEnumType } from './TestEnumType';
import { TestEnumTypeWithOneMember } from './TestEnumTypeWithOneMember';
import { AllFields, AnyField, BigNumberField, BooleanField, CollectionField, CustomFieldV4, DateField, DurationField, EntityBuilderType, EntityV4, EnumField, Field, NumberField, StringField, Time, TimeField } from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "A_TestEntitySharesEntityType2" of service "API_TEST_SRV".
 */
export declare class TestEntitySharesEntityType2 extends EntityV4 implements TestEntitySharesEntityType2Type {
    /**
     * Technical entity name for TestEntitySharesEntityType2.
     */
    static _entityName: string;
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
     * Geography Point Property.
     * @nullable
     */
    geographyPointProperty?: any;
    /**
     * Something The Sdk Does Not Support.
     * @nullable
     */
    somethingTheSdkDoesNotSupport?: any;
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
     * Enum Property.
     * @nullable
     */
    enumProperty?: TestEnumType;
    /**
     * Enum Property With One Member.
     * @nullable
     */
    enumPropertyWithOneMember?: TestEnumTypeWithOneMember;
    /**
     * Enum Collection Property.
     * @nullable
     */
    enumCollectionProperty?: TestEnumType[];
    /**
     * Returns an entity builder to construct instances of `TestEntitySharesEntityType2`.
     * @returns A builder that constructs instances of entity type `TestEntitySharesEntityType2`.
     */
    static builder(): EntityBuilderType<TestEntitySharesEntityType2, TestEntitySharesEntityType2Type>;
    /**
     * Returns a request builder to construct requests for operations on the `TestEntitySharesEntityType2` entity type.
     * @returns A `TestEntitySharesEntityType2` request builder.
     */
    static requestBuilder(): TestEntitySharesEntityType2RequestBuilder;
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntitySharesEntityType2`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `TestEntitySharesEntityType2`.
     */
    static customField(fieldName: string): CustomFieldV4<TestEntitySharesEntityType2>;
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    toJSON(): {
        [key: string]: any;
    };
}
export interface TestEntitySharesEntityType2Type {
    keyPropertyGuid: string;
    keyPropertyString: string;
    stringProperty?: string | null;
    booleanProperty?: boolean | null;
    guidProperty?: string | null;
    int16Property?: number | null;
    int32Property?: number | null;
    int64Property?: BigNumber | null;
    decimalProperty?: BigNumber | null;
    singleProperty?: number | null;
    doubleProperty?: number | null;
    floatProperty?: number | null;
    timeOfDayProperty?: Time | null;
    dateProperty?: Moment | null;
    dateTimeOffSetProperty?: Moment | null;
    durationProperty?: Duration | null;
    byteProperty?: number | null;
    sByteProperty?: number | null;
    geographyPointProperty?: any | null;
    somethingTheSdkDoesNotSupport?: any | null;
    collectionProperty?: string[] | null;
    complexTypeProperty?: TestComplexType | null;
    complexTypeCollectionProperty?: TestComplexType[] | null;
    enumProperty?: TestEnumType | null;
    enumPropertyWithOneMember?: TestEnumTypeWithOneMember | null;
    enumCollectionProperty?: TestEnumType[] | null;
}
export declare namespace TestEntitySharesEntityType2 {
    /**
     * Static representation of the [[keyPropertyGuid]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const KEY_PROPERTY_GUID: StringField<TestEntitySharesEntityType2>;
    /**
     * Static representation of the [[keyPropertyString]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const KEY_PROPERTY_STRING: StringField<TestEntitySharesEntityType2>;
    /**
     * Static representation of the [[stringProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const STRING_PROPERTY: StringField<TestEntitySharesEntityType2>;
    /**
     * Static representation of the [[booleanProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BOOLEAN_PROPERTY: BooleanField<TestEntitySharesEntityType2>;
    /**
     * Static representation of the [[guidProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const GUID_PROPERTY: StringField<TestEntitySharesEntityType2>;
    /**
     * Static representation of the [[int16Property]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const INT_16_PROPERTY: NumberField<TestEntitySharesEntityType2>;
    /**
     * Static representation of the [[int32Property]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const INT_32_PROPERTY: NumberField<TestEntitySharesEntityType2>;
    /**
     * Static representation of the [[int64Property]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const INT_64_PROPERTY: BigNumberField<TestEntitySharesEntityType2>;
    /**
     * Static representation of the [[decimalProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DECIMAL_PROPERTY: BigNumberField<TestEntitySharesEntityType2>;
    /**
     * Static representation of the [[singleProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const SINGLE_PROPERTY: NumberField<TestEntitySharesEntityType2>;
    /**
     * Static representation of the [[doubleProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DOUBLE_PROPERTY: NumberField<TestEntitySharesEntityType2>;
    /**
     * Static representation of the [[floatProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const FLOAT_PROPERTY: NumberField<TestEntitySharesEntityType2>;
    /**
     * Static representation of the [[timeOfDayProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const TIME_OF_DAY_PROPERTY: TimeField<TestEntitySharesEntityType2>;
    /**
     * Static representation of the [[dateProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATE_PROPERTY: DateField<TestEntitySharesEntityType2>;
    /**
     * Static representation of the [[dateTimeOffSetProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DATE_TIME_OFF_SET_PROPERTY: DateField<TestEntitySharesEntityType2>;
    /**
     * Static representation of the [[durationProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const DURATION_PROPERTY: DurationField<TestEntitySharesEntityType2>;
    /**
     * Static representation of the [[byteProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const BYTE_PROPERTY: NumberField<TestEntitySharesEntityType2>;
    /**
     * Static representation of the [[sByteProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const S_BYTE_PROPERTY: NumberField<TestEntitySharesEntityType2>;
    /**
     * Static representation of the [[geographyPointProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const GEOGRAPHY_POINT_PROPERTY: AnyField<TestEntitySharesEntityType2>;
    /**
     * Static representation of the [[somethingTheSdkDoesNotSupport]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const SOMETHING_THE_SDK_DOES_NOT_SUPPORT: AnyField<TestEntitySharesEntityType2>;
    /**
     * Static representation of the [[collectionProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const COLLECTION_PROPERTY: CollectionField<TestEntitySharesEntityType2, 'Edm.String'>;
    /**
     * Static representation of the [[complexTypeProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const COMPLEX_TYPE_PROPERTY: TestComplexTypeField<TestEntitySharesEntityType2>;
    /**
     * Static representation of the [[complexTypeCollectionProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const COMPLEX_TYPE_COLLECTION_PROPERTY: CollectionField<TestEntitySharesEntityType2, TestComplexType>;
    /**
     * Static representation of the [[enumProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const ENUM_PROPERTY: EnumField<TestEntitySharesEntityType2>;
    /**
     * Static representation of the [[enumPropertyWithOneMember]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const ENUM_PROPERTY_WITH_ONE_MEMBER: EnumField<TestEntitySharesEntityType2>;
    /**
     * Static representation of the [[enumCollectionProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const ENUM_COLLECTION_PROPERTY: CollectionField<TestEntitySharesEntityType2, 'Edm.Enum'>;
    /**
     * All fields of the TestEntitySharesEntityType2 entity.
     */
    const _allFields: Array<StringField<TestEntitySharesEntityType2> | BooleanField<TestEntitySharesEntityType2> | NumberField<TestEntitySharesEntityType2> | BigNumberField<TestEntitySharesEntityType2> | TimeField<TestEntitySharesEntityType2> | DateField<TestEntitySharesEntityType2> | DurationField<TestEntitySharesEntityType2> | AnyField<TestEntitySharesEntityType2> | CollectionField<TestEntitySharesEntityType2, 'Edm.String'> | TestComplexTypeField<TestEntitySharesEntityType2> | CollectionField<TestEntitySharesEntityType2, TestComplexType> | EnumField<TestEntitySharesEntityType2> | CollectionField<TestEntitySharesEntityType2, 'Edm.Enum'>>;
    /**
     * All fields selector.
     */
    const ALL_FIELDS: AllFields<TestEntitySharesEntityType2>;
    /**
     * All key fields of the TestEntitySharesEntityType2 entity.
     */
    const _keyFields: Array<Field<TestEntitySharesEntityType2>>;
    /**
     * Mapping of all key field names to the respective static field property TestEntitySharesEntityType2.
     */
    const _keys: {
        [keys: string]: Field<TestEntitySharesEntityType2>;
    };
}
//# sourceMappingURL=TestEntitySharesEntityType2.d.ts.map