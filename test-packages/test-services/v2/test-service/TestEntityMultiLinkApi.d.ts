import { TestEntityMultiLink } from './TestEntityMultiLink';
import { TestEntityMultiLinkRequestBuilder } from './TestEntityMultiLinkRequestBuilder';
import { TestEntityLvl2MultiLinkApi } from './TestEntityLvl2MultiLinkApi';
import { TestEntityLvl2SingleLinkApi } from './TestEntityLvl2SingleLinkApi';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  EdmTypeField,
  Link,
  OneToOneLink
} from '@sap-cloud-sdk/odata-v2';
export declare class TestEntityMultiLinkApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<TestEntityMultiLink<DeSerializersT>, DeSerializersT>
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
  entityConstructor: typeof TestEntityMultiLink;
  requestBuilder(): TestEntityMultiLinkRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    TestEntityMultiLink<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    TestEntityMultiLink<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<typeof TestEntityMultiLink, DeSerializersT>;
  private _schema?;
  get schema(): {
    KEY_PROPERTY: EdmTypeField<
      TestEntityMultiLink<
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
      TestEntityMultiLink<
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
      TestEntityMultiLink<
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
      TestEntityMultiLink<
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
      TestEntityMultiLink<
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
    /**
     * Static representation of the one-to-many navigation property [[toMultiLink]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_MULTI_LINK: Link<
      TestEntityMultiLink<DeSerializersT>,
      DeSerializersT,
      TestEntityLvl2MultiLinkApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property [[toSingleLink]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_SINGLE_LINK: OneToOneLink<
      TestEntityMultiLink<DeSerializersT>,
      DeSerializersT,
      TestEntityLvl2SingleLinkApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<
      TestEntityMultiLink<
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
//# sourceMappingURL=TestEntityMultiLinkApi.d.ts.map
