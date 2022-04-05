import { TestEntityLink } from './TestEntityLink';
import { TestEntityLinkRequestBuilder } from './TestEntityLinkRequestBuilder';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  EntityBuilderType,
  EntityApi
} from '@sap-cloud-sdk/odata-v4';
export declare class TestEntityLinkApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<TestEntityLink<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  constructor(deSerializers?: DeSerializersT);
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof TestEntityLink;
  requestBuilder(): TestEntityLinkRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    TestEntityLink<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<TestEntityLink<DeSerializersT>, DeSerializersT, NullableT>;
  private _fieldBuilder;
  get fieldBuilder(): any;
  private _schema;
  get schema(): any;
}
//# sourceMappingURL=TestEntityLinkApi.d.ts.map
