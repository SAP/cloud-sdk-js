import { TestEntity3 } from './TestEntity3';
import { TestEntity3RequestBuilder } from './TestEntity3RequestBuilder';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  EntityBuilderType,
  EntityApi
} from '@sap-cloud-sdk/odata-v4';
export declare class TestEntity3Api<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<TestEntity3<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  constructor(deSerializers?: DeSerializersT);
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof TestEntity3;
  requestBuilder(): TestEntity3RequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    TestEntity3<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<TestEntity3<DeSerializersT>, DeSerializersT, NullableT>;
  private _fieldBuilder;
  get fieldBuilder(): any;
  private _schema;
  get schema(): any;
}
//# sourceMappingURL=TestEntity3Api.d.ts.map
