import { TestEntityOtherMultiLink } from './TestEntityOtherMultiLink';
import { TestEntityOtherMultiLinkRequestBuilder } from './TestEntityOtherMultiLinkRequestBuilder';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  EntityBuilderType,
  EntityApi
} from '@sap-cloud-sdk/odata-v2';
export declare class TestEntityOtherMultiLinkApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<TestEntityOtherMultiLink<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  constructor(deSerializers?: DeSerializersT);
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof TestEntityOtherMultiLink;
  requestBuilder(): TestEntityOtherMultiLinkRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    TestEntityOtherMultiLink<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    TestEntityOtherMultiLink<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder;
  get fieldBuilder(): any;
  private _schema;
  get schema(): any;
}
//# sourceMappingURL=TestEntityOtherMultiLinkApi.d.ts.map
