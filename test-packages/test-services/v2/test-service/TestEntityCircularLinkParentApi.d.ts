import { TestEntityCircularLinkParent } from './TestEntityCircularLinkParent';
import { TestEntityCircularLinkParentRequestBuilder } from './TestEntityCircularLinkParentRequestBuilder';
import { TestEntityCircularLinkChildApi } from './TestEntityCircularLinkChildApi';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  EntityBuilderType,
  EntityApi
} from '@sap-cloud-sdk/odata-v2';
export declare class TestEntityCircularLinkParentApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<TestEntityCircularLinkParent<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  constructor(deSerializers?: DeSerializersT);
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [TestEntityCircularLinkChildApi<DeSerializersT>]
  ): this;
  entityConstructor: typeof TestEntityCircularLinkParent;
  requestBuilder(): TestEntityCircularLinkParentRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    TestEntityCircularLinkParent<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    TestEntityCircularLinkParent<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder;
  get fieldBuilder(): any;
  private _schema;
  get schema(): any;
}
//# sourceMappingURL=TestEntityCircularLinkParentApi.d.ts.map
