import { TestEntityCircularLinkChild } from './TestEntityCircularLinkChild';
import { TestEntityCircularLinkChildRequestBuilder } from './TestEntityCircularLinkChildRequestBuilder';
import { TestEntityCircularLinkParentApi } from './TestEntityCircularLinkParentApi';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  EntityBuilderType,
  EntityApi
} from '@sap-cloud-sdk/odata-v4';
export declare class TestEntityCircularLinkChildApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<TestEntityCircularLinkChild<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  constructor(deSerializers?: DeSerializersT);
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [TestEntityCircularLinkParentApi<DeSerializersT>]
  ): this;
  entityConstructor: typeof TestEntityCircularLinkChild;
  requestBuilder(): TestEntityCircularLinkChildRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    TestEntityCircularLinkChild<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    TestEntityCircularLinkChild<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder;
  get fieldBuilder(): any;
  private _schema;
  get schema(): any;
}
//# sourceMappingURL=TestEntityCircularLinkChildApi.d.ts.map
