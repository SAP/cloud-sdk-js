import { TestEntityLink } from './TestEntityLink';
import { TestEntityLinkRequestBuilder } from './TestEntityLinkRequestBuilder';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers
} from '@sap-cloud-sdk/odata-v4';
import {
  OrderableEdmTypeField,
  EdmTypeField,
  AllFields,
  EntityBuilderType,
  EntityApi
} from '@sap-cloud-sdk/odata-common/internal';
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
  get schema(): {
    /**
     *
     * All fields selector.
     */
    ALL_FIELDS: AllFields<
      TestEntityLink<
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
    /**
     * Static representation of the [[keyTestEntityLink]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    KEY_TEST_ENTITY_LINK: OrderableEdmTypeField<
      TestEntityLink<
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
      'Edm.Int32',
      false,
      true
    >;
    /**
     * Static representation of the [[keyToTestEntity]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    KEY_TO_TEST_ENTITY: OrderableEdmTypeField<
      TestEntityLink<
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
      'Edm.Int32',
      false,
      true
    >;
    /**
     * Static representation of the [[stringProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    STRING_PROPERTY: EdmTypeField<
      TestEntityLink<
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
      true,
      true
    >;
  };
}
//# sourceMappingURL=TestEntityLinkApi.d.ts.map
