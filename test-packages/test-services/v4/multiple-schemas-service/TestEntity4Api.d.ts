import { TestEntity4 } from './TestEntity4';
import { TestEntity4RequestBuilder } from './TestEntity4RequestBuilder';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  EntityBuilderType,
  EntityApi
} from '@sap-cloud-sdk/odata-v4';
export declare class TestEntity4Api<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<TestEntity4<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  constructor(deSerializers?: DeSerializersT);
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof TestEntity4;
  requestBuilder(): TestEntity4RequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    TestEntity4<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<TestEntity4<DeSerializersT>, DeSerializersT, NullableT>;
  private _fieldBuilder;
  get fieldBuilder(): any;
  private _schema;
  get schema(): any;
}
//# sourceMappingURL=TestEntity4Api.d.ts.map
