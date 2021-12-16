import { TestEntityWithSharedEntityType2 } from './TestEntityWithSharedEntityType2';
import { TestEntityWithSharedEntityType2RequestBuilder } from './TestEntityWithSharedEntityType2RequestBuilder';
import { CustomField, DefaultDeSerializers, DeSerializers } from '@sap-cloud-sdk/odata-v4';
import { EdmTypeField, AllFields, EntityBuilderType, EntityApi } from '@sap-cloud-sdk/odata-common/internal';
export declare class TestEntityWithSharedEntityType2Api<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements EntityApi<TestEntityWithSharedEntityType2<DeSerializersT>, DeSerializersT> {
    deSerializers: DeSerializersT;
    constructor(deSerializers?: DeSerializersT);
    private navigationPropertyFields;
    _addNavigationProperties(linkedApis: [
    ]): this;
    entityConstructor: typeof TestEntityWithSharedEntityType2;
    requestBuilder(): TestEntityWithSharedEntityType2RequestBuilder<DeSerializersT>;
    entityBuilder(): EntityBuilderType<TestEntityWithSharedEntityType2<DeSerializersT>, DeSerializersT>;
    customField<NullableT extends boolean = false>(fieldName: string, isNullable?: NullableT): CustomField<TestEntityWithSharedEntityType2<DeSerializersT>, DeSerializersT, NullableT>;
    get schema(): {
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: AllFields<TestEntityWithSharedEntityType2<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>;
        /**
     * Static representation of the [[keyProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
        KEY_PROPERTY: EdmTypeField<TestEntityWithSharedEntityType2<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.String", false, true>;
    };
}
//# sourceMappingURL=TestEntityWithSharedEntityType2Api.d.ts.map