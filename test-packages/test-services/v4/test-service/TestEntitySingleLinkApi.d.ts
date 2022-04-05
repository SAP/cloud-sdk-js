import { TestEntitySingleLink } from './TestEntitySingleLink';
import { TestEntitySingleLinkRequestBuilder } from './TestEntitySingleLinkRequestBuilder';
import { TestEntityLvl2MultiLinkApi } from './TestEntityLvl2MultiLinkApi';
import { TestEntityLvl2SingleLinkApi } from './TestEntityLvl2SingleLinkApi';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  EntityBuilderType,
  EntityApi
} from '@sap-cloud-sdk/odata-v4';
export declare class TestEntitySingleLinkApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<TestEntitySingleLink<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  constructor(deSerializers?: DeSerializersT);
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [
      TestEntityLvl2MultiLinkApi<DeSerializersT>,
      TestEntityLvl2SingleLinkApi<DeSerializersT>
    ]
  ): this;
  entityConstructor: typeof TestEntitySingleLink;
  requestBuilder(): TestEntitySingleLinkRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    TestEntitySingleLink<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    TestEntitySingleLink<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder;
  get fieldBuilder(): any;
  private _schema;
  get schema(): any;
}
//# sourceMappingURL=TestEntitySingleLinkApi.d.ts.map
