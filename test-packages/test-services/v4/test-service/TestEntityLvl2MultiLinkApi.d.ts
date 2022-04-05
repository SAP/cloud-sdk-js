import { TestEntityLvl2MultiLink } from './TestEntityLvl2MultiLink';
import { TestEntityLvl2MultiLinkRequestBuilder } from './TestEntityLvl2MultiLinkRequestBuilder';
import { TestEntityLvl3MultiLinkApi } from './TestEntityLvl3MultiLinkApi';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  EntityBuilderType,
  EntityApi
} from '@sap-cloud-sdk/odata-v4';
export declare class TestEntityLvl2MultiLinkApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<TestEntityLvl2MultiLink<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  constructor(deSerializers?: DeSerializersT);
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [TestEntityLvl3MultiLinkApi<DeSerializersT>]
  ): this;
  entityConstructor: typeof TestEntityLvl2MultiLink;
  requestBuilder(): TestEntityLvl2MultiLinkRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    TestEntityLvl2MultiLink<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    TestEntityLvl2MultiLink<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder;
  get fieldBuilder(): any;
  private _schema;
  get schema(): any;
}
//# sourceMappingURL=TestEntityLvl2MultiLinkApi.d.ts.map
