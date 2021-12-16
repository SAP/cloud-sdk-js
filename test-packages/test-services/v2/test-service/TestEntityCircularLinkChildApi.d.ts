import { TestEntityCircularLinkChild } from './TestEntityCircularLinkChild';
import { TestEntityCircularLinkChildRequestBuilder } from './TestEntityCircularLinkChildRequestBuilder';
import { CustomField, DefaultDeSerializers, DeSerializers } from '@sap-cloud-sdk/odata-v2';
import { EdmTypeField, Link, AllFields, EntityBuilderType, EntityApi } from '@sap-cloud-sdk/odata-common/internal';
export declare class TestEntityCircularLinkChildApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements EntityApi<TestEntityCircularLinkChild<DeSerializersT>, DeSerializersT> {
    deSerializers: DeSerializersT;
    constructor(deSerializers?: DeSerializersT);
    private navigationPropertyFields;
    _addNavigationProperties(linkedApis: [
        TestEntityCircularLinkChildApi<DeSerializersT>
    ]): this;
    entityConstructor: typeof TestEntityCircularLinkChild;
    requestBuilder(): TestEntityCircularLinkChildRequestBuilder<DeSerializersT>;
    entityBuilder(): EntityBuilderType<TestEntityCircularLinkChild<DeSerializersT>, DeSerializersT>;
    customField<NullableT extends boolean = false>(fieldName: string, isNullable?: NullableT): CustomField<TestEntityCircularLinkChild<DeSerializersT>, DeSerializersT, NullableT>;
    get schema(): {
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: AllFields<TestEntityCircularLinkChild<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>;
        /**
         * Static representation of the one-to-many navigation property [[toParent]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_PARENT: Link<TestEntityCircularLinkChild<DeSerializersT>, DeSerializersT, TestEntityCircularLinkChild<DeSerializersT>>;
        /**
     * Static representation of the [[keyProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
        KEY_PROPERTY: EdmTypeField<TestEntityCircularLinkChild<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.String", false, true>;
    };
}
//# sourceMappingURL=TestEntityCircularLinkChildApi.d.ts.map