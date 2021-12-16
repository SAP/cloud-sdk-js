import { TestEntityCircularLinkChild } from './TestEntityCircularLinkChild';
import { TestEntityCircularLinkChildRequestBuilder } from './TestEntityCircularLinkChildRequestBuilder';
import { TestEntityCircularLinkParent } from './TestEntityCircularLinkParent';
import { TestEntityCircularLinkParentApi } from './TestEntityCircularLinkParentApi';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers
} from '@sap-cloud-sdk/odata-v4';
import {
  EdmTypeField,
  OneToOneLink,
  AllFields,
  EntityBuilderType,
  EntityApi
} from '@sap-cloud-sdk/odata-common/internal';
export declare class TestEntityCircularLinkChildApi<
  T extends DeSerializers = DefaultDeSerializers
> implements EntityApi<TestEntityCircularLinkChild<T>, T>
{
  deSerializers: T;
  constructor(deSerializers?: T);
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [TestEntityCircularLinkParentApi<T>]
  ): this;
  entityConstructor: typeof TestEntityCircularLinkChild;
  requestBuilder(): TestEntityCircularLinkChildRequestBuilder<T>;
  entityBuilder(): EntityBuilderType<TestEntityCircularLinkChild<T>, T>;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<TestEntityCircularLinkChild<T>, T, NullableT>;
  get schema(): {
    /**
     *
     * All fields selector.
     */
    ALL_FIELDS: AllFields<
      TestEntityCircularLinkChild<
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
     * Static representation of the one-to-one navigation property [[toParent]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_PARENT: OneToOneLink<
      TestEntityCircularLinkChild<T>,
      T,
      TestEntityCircularLinkParent<T>
    >;
    /**
     * Static representation of the [[keyProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    KEY_PROPERTY: EdmTypeField<
      TestEntityCircularLinkChild<
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
//# sourceMappingURL=TestEntityCircularLinkChildApi.d.ts.map
