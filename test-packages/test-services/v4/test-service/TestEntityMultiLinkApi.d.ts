import { TestEntityMultiLink } from './TestEntityMultiLink';
import { TestEntityMultiLinkRequestBuilder } from './TestEntityMultiLinkRequestBuilder';
import { TestEntityLvl2MultiLink } from './TestEntityLvl2MultiLink';
import { TestEntityLvl2MultiLinkApi } from './TestEntityLvl2MultiLinkApi';
import { TestEntityLvl2SingleLink } from './TestEntityLvl2SingleLink';
import { TestEntityLvl2SingleLinkApi } from './TestEntityLvl2SingleLinkApi';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers
} from '@sap-cloud-sdk/odata-v4';
import {
  EdmTypeField,
  OrderableEdmTypeField,
  OneToManyLink,
  OneToOneLink,
  AllFields,
  EntityBuilderType,
  EntityApi
} from '@sap-cloud-sdk/odata-common/internal';
export declare class TestEntityMultiLinkApi<
  T extends DeSerializers = DefaultDeSerializers
> implements EntityApi<TestEntityMultiLink<T>, T>
{
  deSerializers: T;
  constructor(deSerializers?: T);
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [TestEntityLvl2MultiLinkApi<T>, TestEntityLvl2SingleLinkApi<T>]
  ): this;
  entityConstructor: typeof TestEntityMultiLink;
  requestBuilder(): TestEntityMultiLinkRequestBuilder<T>;
  entityBuilder(): EntityBuilderType<TestEntityMultiLink<T>, T>;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<TestEntityMultiLink<T>, T, NullableT>;
  get schema(): {
    /**
     *
     * All fields selector.
     */
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
          any,
          any,
          any
        >
      >
    >;
    /**
     * Static representation of the one-to-many navigation property [[toMultiLink1]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_MULTI_LINK_1: OneToManyLink<
      TestEntityMultiLink<T>,
      T,
      TestEntityLvl2MultiLink<T>
    >;
    /**
     * Static representation of the one-to-one navigation property [[toSingleLink]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_SINGLE_LINK: OneToOneLink<
      TestEntityMultiLink<T>,
      T,
      TestEntityLvl2SingleLink<T>
    >;
    /**
     * Static representation of the [[stringProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
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
          any,
          any,
          any
        >
      >,
      T,
      'Edm.String',
      true,
      true
    >;
    /**
     * Static representation of the [[booleanProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
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
          any,
          any,
          any
        >
      >,
      T,
      'Edm.Boolean',
      true,
      true
    >;
    /**
     * Static representation of the [[guidProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
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
          any,
          any,
          any
        >
      >,
      T,
      'Edm.Guid',
      true,
      true
    >;
    /**
     * Static representation of the [[int16Property]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    INT_16_PROPERTY: OrderableEdmTypeField<
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
          any,
          any,
          any
        >
      >,
      T,
      'Edm.Int16',
      true,
      true
    >;
    /**
     * Static representation of the [[keyProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
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
          any,
          any,
          any
        >
      >,
      T,
      'Edm.String',
      false,
      true
    >;
  };
}
//# sourceMappingURL=TestEntityMultiLinkApi.d.ts.map
