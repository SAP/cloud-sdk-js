import { TestEntity } from './TestEntity';
import { TestEntityRequestBuilder } from './TestEntityRequestBuilder';
import { TestEntityMultiLinkApi } from './TestEntityMultiLinkApi';
import { TestEntityOtherMultiLinkApi } from './TestEntityOtherMultiLinkApi';
import { TestEntitySingleLinkApi } from './TestEntitySingleLinkApi';
import { CustomField, DefaultDeSerializers, DeSerializers, EntityBuilderType, EntityApi } from '@sap-cloud-sdk/odata-v2';
export declare class TestEntityApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements EntityApi<TestEntity<DeSerializersT>, DeSerializersT> {
    deSerializers: DeSerializersT;
    private _entityBuilder;
    constructor(deSerializers?: DeSerializersT);
    private navigationPropertyFields;
    _addNavigationProperties(linkedApis: [
        TestEntityMultiLinkApi<DeSerializersT>,
        TestEntityOtherMultiLinkApi<DeSerializersT>,
        TestEntitySingleLinkApi<DeSerializersT>
    ]): this;
    entityConstructor: typeof TestEntity;
    requestBuilder(): TestEntityRequestBuilder<DeSerializersT>;
    entityBuilder(): EntityBuilderType<TestEntity<DeSerializersT>, DeSerializersT>;
    entityBuilderNew(): EntityBuilderType<TestEntity<DeSerializersT>, DeSerializersT>;
    customField<NullableT extends boolean = false>(fieldName: string, isNullable?: NullableT): CustomField<TestEntity<DeSerializersT>, DeSerializersT, NullableT>;
    private _fieldBuilder;
    get fieldBuilder(): any;
    private _schema;
    get schema(): any;
}
//# sourceMappingURL=TestEntityApi.d.ts.map