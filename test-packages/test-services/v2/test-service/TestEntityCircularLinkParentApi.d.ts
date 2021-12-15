import { TestEntityCircularLinkParent } from './TestEntityCircularLinkParent';
import { TestEntityCircularLinkParentRequestBuilder } from './TestEntityCircularLinkParentRequestBuilder';
import { TestEntityCircularLinkChild } from './TestEntityCircularLinkChild';
import { TestEntityCircularLinkChildApi } from './TestEntityCircularLinkChildApi';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers
} from '@sap-cloud-sdk/odata-v2';
import {
  EdmTypeField,
  Link,
  AllFields,
  EntityBuilderType,
  EntityApi
} from '@sap-cloud-sdk/odata-common/internal';
export declare class TestEntityCircularLinkParentApi<
  T extends DeSerializers = DefaultDeSerializers
> implements EntityApi<TestEntityCircularLinkParent<T>, T>
{
  deSerializers: T;
  constructor(deSerializers?: T);
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [TestEntityCircularLinkChildApi<T>]
  ): this;
  entityConstructor: typeof TestEntityCircularLinkParent;
  requestBuilder(): TestEntityCircularLinkParentRequestBuilder<T>;
  entityBuilder(): EntityBuilderType<TestEntityCircularLinkParent<T>, T>;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<TestEntityCircularLinkParent<T>, T, NullableT>;
  get schema(): {
    /**
     *
     * All fields selector.
     */
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
          any
        >
      >
    >;
    /**
     * Static representation of the one-to-many navigation property [[toChild]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_CHILD: Link<
      TestEntityCircularLinkParent<T>,
      T,
      TestEntityCircularLinkChild<T>
    >;
    /**
     * Static representation of the [[keyProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
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
//# sourceMappingURL=TestEntityCircularLinkParentApi.d.ts.map
