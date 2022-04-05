import { TestEntityWithSharedEntityType1 } from './TestEntityWithSharedEntityType1';
import { TestEntityWithSharedEntityType1RequestBuilder } from './TestEntityWithSharedEntityType1RequestBuilder';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  EntityBuilderType,
  EntityApi
} from '@sap-cloud-sdk/odata-v4';
export declare class TestEntityWithSharedEntityType1Api<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<TestEntityWithSharedEntityType1<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  constructor(deSerializers?: DeSerializersT);
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof TestEntityWithSharedEntityType1;
  requestBuilder(): TestEntityWithSharedEntityType1RequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    TestEntityWithSharedEntityType1<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    TestEntityWithSharedEntityType1<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder;
  get fieldBuilder(): any;
  private _schema;
  get schema(): any;
}
//# sourceMappingURL=TestEntityWithSharedEntityType1Api.d.ts.map
