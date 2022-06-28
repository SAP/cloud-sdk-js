import { TestEntityCircularLinkSelf } from './TestEntityCircularLinkSelf';
import { TestEntityCircularLinkSelfRequestBuilder } from './TestEntityCircularLinkSelfRequestBuilder';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  OrderableEdmTypeField,
  OneToOneLink
} from '@sap-cloud-sdk/odata-v4';
export declare class TestEntityCircularLinkSelfApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<TestEntityCircularLinkSelf<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  constructor(deSerializers?: DeSerializersT);
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [TestEntityCircularLinkSelfApi<DeSerializersT>]
  ): this;
  entityConstructor: typeof TestEntityCircularLinkSelf;
  requestBuilder(): TestEntityCircularLinkSelfRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    TestEntityCircularLinkSelf<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    TestEntityCircularLinkSelf<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof TestEntityCircularLinkSelf,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    KEY_PROPERTY: OrderableEdmTypeField<
      TestEntityCircularLinkSelf<
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
          any,
          any,
          any
        >
      >,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    /**
     * Static representation of the one-to-one navigation property [[toSelf]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_SELF: OneToOneLink<
      TestEntityCircularLinkSelf<DeSerializersT>,
      DeSerializersT,
      TestEntityCircularLinkSelfApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<
      TestEntityCircularLinkSelf<
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
          any,
          any,
          any
        >
      >
    >;
  };
}
//# sourceMappingURL=TestEntityCircularLinkSelfApi.d.ts.map
