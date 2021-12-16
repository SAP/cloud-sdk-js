import { TestEntity } from './TestEntity';
import { TestEntityRequestBuilder } from './TestEntityRequestBuilder';
import { TestEntityMultiLink } from './TestEntityMultiLink';
import { TestEntityMultiLinkApi } from './TestEntityMultiLinkApi';
import { TestEntitySingleLink } from './TestEntitySingleLink';
import { TestEntitySingleLinkApi } from './TestEntitySingleLinkApi';
import { TestComplexType, TestComplexTypeField } from './TestComplexType';
import { TestEnumType } from './TestEnumType';
import { TestEnumTypeInt64 } from './TestEnumTypeInt64';
import { TestEnumTypeWithOneMember } from './TestEnumTypeWithOneMember';
import { CustomField, DefaultDeSerializers, DeSerializers } from '@sap-cloud-sdk/odata-v4';
import { EdmTypeField, OrderableEdmTypeField, CollectionField, EnumField, OneToManyLink, OneToOneLink, AllFields, EntityBuilderType, EntityApi } from '@sap-cloud-sdk/odata-common/internal';
export declare class TestEntityApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements EntityApi<TestEntity<DeSerializersT>, DeSerializersT> {
    deSerializers: DeSerializersT;
    constructor(deSerializers?: DeSerializersT);
    private navigationPropertyFields;
    _addNavigationProperties(linkedApis: [
        TestEntityMultiLinkApi<DeSerializersT>,
        TestEntityMultiLinkApi<DeSerializersT>,
        TestEntitySingleLinkApi<DeSerializersT>
    ]): this;
    entityConstructor: typeof TestEntity;
    requestBuilder(): TestEntityRequestBuilder<DeSerializersT>;
    entityBuilder(): EntityBuilderType<TestEntity<DeSerializersT>, DeSerializersT>;
    customField<NullableT extends boolean = false>(fieldName: string, isNullable?: NullableT): CustomField<TestEntity<DeSerializersT>, DeSerializersT, NullableT>;
    get schema(): {
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: AllFields<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>;
        /**
         * Static representation of the one-to-many navigation property [[toMultiLink]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_MULTI_LINK: OneToManyLink<TestEntity<DeSerializersT>, DeSerializersT, TestEntityMultiLink<DeSerializersT>>;
        /**
         * Static representation of the one-to-many navigation property [[toOtherMultiLink]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_OTHER_MULTI_LINK: OneToManyLink<TestEntity<DeSerializersT>, DeSerializersT, TestEntityMultiLink<DeSerializersT>>;
        /**
         * Static representation of the one-to-one navigation property [[toSingleLink]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_SINGLE_LINK: OneToOneLink<TestEntity<DeSerializersT>, DeSerializersT, TestEntitySingleLink<DeSerializersT>>;
        /**
     * Static representation of the [[keyPropertyGuid]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
        KEY_PROPERTY_GUID: EdmTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Guid", false, true>;
        /**
         * Static representation of the [[keyPropertyString]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        KEY_PROPERTY_STRING: EdmTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.String", false, true>;
        /**
         * Static representation of the [[stringProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        STRING_PROPERTY: EdmTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.String", true, true>;
        /**
         * Static representation of the [[booleanProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BOOLEAN_PROPERTY: EdmTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Boolean", true, true>;
        /**
         * Static representation of the [[guidProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        GUID_PROPERTY: EdmTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Guid", true, true>;
        /**
         * Static representation of the [[int16Property]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INT_16_PROPERTY: OrderableEdmTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Int16", true, true>;
        /**
         * Static representation of the [[int32Property]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INT_32_PROPERTY: OrderableEdmTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Int32", true, true>;
        /**
         * Static representation of the [[int64Property]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INT_64_PROPERTY: OrderableEdmTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Int64", true, true>;
        /**
         * Static representation of the [[decimalProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DECIMAL_PROPERTY: OrderableEdmTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Decimal", true, true>;
        /**
         * Static representation of the [[singleProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SINGLE_PROPERTY: OrderableEdmTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Single", true, true>;
        /**
         * Static representation of the [[doubleProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DOUBLE_PROPERTY: OrderableEdmTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Double", true, true>;
        /**
         * Static representation of the [[floatProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FLOAT_PROPERTY: OrderableEdmTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Float", true, true>;
        /**
         * Static representation of the [[timeOfDayProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TIME_OF_DAY_PROPERTY: OrderableEdmTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.TimeOfDay", true, true>;
        /**
         * Static representation of the [[dateProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATE_PROPERTY: OrderableEdmTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Date", true, true>;
        /**
         * Static representation of the [[dateTimeOffSetProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATE_TIME_OFF_SET_PROPERTY: OrderableEdmTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.DateTimeOffset", true, true>;
        /**
         * Static representation of the [[durationProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DURATION_PROPERTY: OrderableEdmTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Duration", true, true>;
        /**
         * Static representation of the [[byteProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BYTE_PROPERTY: OrderableEdmTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Byte", true, true>;
        /**
         * Static representation of the [[sByteProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        S_BYTE_PROPERTY: OrderableEdmTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.SByte", true, true>;
        /**
         * Static representation of the [[geographyPointProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        GEOGRAPHY_POINT_PROPERTY: EdmTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Any", true, true>;
        /**
         * Static representation of the [[somethingTheSdkDoesNotSupport]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SOMETHING_THE_SDK_DOES_NOT_SUPPORT: EdmTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Any", true, true>;
        /**
         * Static representation of the [[collectionProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COLLECTION_PROPERTY: CollectionField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.String", true, true>;
        /**
         * Static representation of the [[complexTypeProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COMPLEX_TYPE_PROPERTY: TestComplexTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, true, true>;
        /**
         * Static representation of the [[complexTypeCollectionProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COMPLEX_TYPE_COLLECTION_PROPERTY: CollectionField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, TestComplexType<DefaultDeSerializers>, true, true>;
        /**
         * Static representation of the [[enumProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENUM_PROPERTY: EnumField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, TestEnumType, true, true>;
        /**
         * Static representation of the [[enumPropertyInt64]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENUM_PROPERTY_INT_64: EnumField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, TestEnumTypeInt64, true, true>;
        /**
         * Static representation of the [[enumPropertyWithOneMember]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENUM_PROPERTY_WITH_ONE_MEMBER: EnumField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, TestEnumTypeWithOneMember, true, true>;
        /**
         * Static representation of the [[enumCollectionProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENUM_COLLECTION_PROPERTY: CollectionField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, typeof TestEnumType, true, true>;
    };
}
//# sourceMappingURL=TestEntityApi.d.ts.map