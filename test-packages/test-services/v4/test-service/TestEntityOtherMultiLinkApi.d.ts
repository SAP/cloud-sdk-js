import { TestEntityOtherMultiLink } from './TestEntityOtherMultiLink';
import { TestEntityOtherMultiLinkRequestBuilder } from './TestEntityOtherMultiLinkRequestBuilder';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers
} from '@sap-cloud-sdk/odata-v4';
import {
  EdmTypeField,
  AllFields,
  EntityBuilderType,
  EntityApi
} from '@sap-cloud-sdk/odata-common/internal';
export declare class TestEntityOtherMultiLinkApi<
  T extends DeSerializers = DefaultDeSerializers
> implements EntityApi<TestEntityOtherMultiLink<T>, T>
{
  deSerializers: T;
  constructor(deSerializers?: T);
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof TestEntityOtherMultiLink;
  requestBuilder(): TestEntityOtherMultiLinkRequestBuilder<T>;
  entityBuilder(): EntityBuilderType<TestEntityOtherMultiLink<T>, T>;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<TestEntityOtherMultiLink<T>, T, NullableT>;
  get schema(): {
    /**
     *
     * All fields selector.
     */
    ALL_FIELDS: AllFields<
      TestEntityOtherMultiLink<
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
     * Static representation of the [[keyProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    KEY_PROPERTY: EdmTypeField<
      TestEntityOtherMultiLink<
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
//# sourceMappingURL=TestEntityOtherMultiLinkApi.d.ts.map
