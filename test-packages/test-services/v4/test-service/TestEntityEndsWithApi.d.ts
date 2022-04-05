import { TestEntityEndsWith } from './TestEntityEndsWith';
import { TestEntityEndsWithRequestBuilder } from './TestEntityEndsWithRequestBuilder';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  EntityBuilderType,
  EntityApi
} from '@sap-cloud-sdk/odata-v4';
export declare class TestEntityEndsWithApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<TestEntityEndsWith<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  constructor(deSerializers?: DeSerializersT);
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof TestEntityEndsWith;
  requestBuilder(): TestEntityEndsWithRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    TestEntityEndsWith<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<TestEntityEndsWith<DeSerializersT>, DeSerializersT, NullableT>;
  private _fieldBuilder;
  get fieldBuilder(): any;
  private _schema;
  get schema(): any;
}
//# sourceMappingURL=TestEntityEndsWithApi.d.ts.map
