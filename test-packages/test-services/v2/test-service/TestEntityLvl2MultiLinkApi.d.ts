import { TestEntityLvl2MultiLink } from './TestEntityLvl2MultiLink';
import { TestEntityLvl2MultiLinkRequestBuilder } from './TestEntityLvl2MultiLinkRequestBuilder';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  EdmTypeField
} from '@sap-cloud-sdk/odata-v2';
export declare class TestEntityLvl2MultiLinkApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<TestEntityLvl2MultiLink<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  constructor(deSerializers?: DeSerializersT);
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
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
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof TestEntityLvl2MultiLink,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    KEY_PROPERTY: EdmTypeField<
      TestEntityLvl2MultiLink<
        DeSerializers<
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any
        >
      >,
      DeSerializersT,
      'Edm.String',
      boolean,
      boolean
    >;
    STRING_PROPERTY: EdmTypeField<
      TestEntityLvl2MultiLink<
        DeSerializers<
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any
        >
      >,
      DeSerializersT,
      'Edm.String',
      boolean,
      boolean
    >;
    BOOLEAN_PROPERTY: EdmTypeField<
      TestEntityLvl2MultiLink<
        DeSerializers<
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any
        >
      >,
      DeSerializersT,
      'Edm.Boolean',
      boolean,
      boolean
    >;
    GUID_PROPERTY: EdmTypeField<
      TestEntityLvl2MultiLink<
        DeSerializers<
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any
        >
      >,
      DeSerializersT,
      'Edm.Guid',
      boolean,
      boolean
    >;
    INT_16_PROPERTY: EdmTypeField<
      TestEntityLvl2MultiLink<
        DeSerializers<
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any
        >
      >,
      DeSerializersT,
      'Edm.Int16',
      boolean,
      boolean
    >;
    ALL_FIELDS: AllFields<
      TestEntityLvl2MultiLink<
        DeSerializers<
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any
        >
      >
    >;
  };
}
//# sourceMappingURL=TestEntityLvl2MultiLinkApi.d.ts.map
