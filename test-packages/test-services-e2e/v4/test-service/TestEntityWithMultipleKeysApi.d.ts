import { TestEntityWithMultipleKeys } from './TestEntityWithMultipleKeys';
import { TestEntityWithMultipleKeysRequestBuilder } from './TestEntityWithMultipleKeysRequestBuilder';
import { CustomField, DefaultDeSerializers, DeSerializers, AllFields, EntityBuilderType, EntityApi, FieldBuilder, OrderableEdmTypeField } from '@sap-cloud-sdk/odata-v4';
export declare class TestEntityWithMultipleKeysApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements EntityApi<TestEntityWithMultipleKeys<DeSerializersT>, DeSerializersT> {
    deSerializers: DeSerializersT;
    constructor(deSerializers?: DeSerializersT);
    private navigationPropertyFields;
    _addNavigationProperties(linkedApis: [
    ]): this;
    entityConstructor: typeof TestEntityWithMultipleKeys;
    requestBuilder(): TestEntityWithMultipleKeysRequestBuilder<DeSerializersT>;
    entityBuilder(): EntityBuilderType<TestEntityWithMultipleKeys<DeSerializersT>, DeSerializersT>;
    customField<NullableT extends boolean = false>(fieldName: string, isNullable?: NullableT): CustomField<TestEntityWithMultipleKeys<DeSerializersT>, DeSerializersT, NullableT>;
    private _fieldBuilder?;
    get fieldBuilder(): FieldBuilder<typeof TestEntityWithMultipleKeys, DeSerializersT>;
    private _schema?;
    get schema(): {
        KEY_TEST_ENTITY_WITH_MULTIPLE_KEYS: OrderableEdmTypeField<TestEntityWithMultipleKeys<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Int32", false, true>;
        STRING_PROPERTY_WITH_MULTIPLE_KEYS: OrderableEdmTypeField<TestEntityWithMultipleKeys<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.String", false, true>;
        BOOLEAN_PROPERTY_WITH_MULTIPLE_KEYS: OrderableEdmTypeField<TestEntityWithMultipleKeys<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Boolean", false, true>;
        ALL_FIELDS: AllFields<TestEntityWithMultipleKeys<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>;
    };
}
//# sourceMappingURL=TestEntityWithMultipleKeysApi.d.ts.map