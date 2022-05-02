import { TestEntityCircularLinkParent } from './TestEntityCircularLinkParent';
import { TestEntityCircularLinkParentRequestBuilder } from './TestEntityCircularLinkParentRequestBuilder';
import { TestEntityCircularLinkChildApi } from './TestEntityCircularLinkChildApi';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  EdmTypeField,
  OneToOneLink,
  OneToManyLink
} from '@sap-cloud-sdk/odata-v4';
export declare class TestEntityCircularLinkParentApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<TestEntityCircularLinkParent<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  constructor(deSerializers?: DeSerializersT);
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [
      TestEntityCircularLinkChildApi<DeSerializersT>,
      TestEntityCircularLinkChildApi<DeSerializersT>
    ]
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
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof TestEntityCircularLinkParent,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    KEY_PROPERTY: EdmTypeField<
      TestEntityCircularLinkParent<
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
     * Static representation of the one-to-one navigation property [[toFirstChild]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_FIRST_CHILD: OneToOneLink<
      TestEntityCircularLinkParent<DeSerializersT>,
      DeSerializersT,
      TestEntityCircularLinkChildApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property [[toChildren]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_CHILDREN: OneToManyLink<
      TestEntityCircularLinkParent<DeSerializersT>,
      DeSerializersT,
      TestEntityCircularLinkChildApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<
      TestEntityCircularLinkParent<
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
//# sourceMappingURL=TestEntityCircularLinkParentApi.d.ts.map
