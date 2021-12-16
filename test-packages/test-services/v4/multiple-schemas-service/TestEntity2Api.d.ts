import { TestEntity2 } from './TestEntity2';
import { TestEntity2RequestBuilder } from './TestEntity2RequestBuilder';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers
} from '@sap-cloud-sdk/odata-v4';
import {
  EdmTypeField,
  OrderableEdmTypeField,
  AllFields,
  EntityBuilderType,
  EntityApi
} from '@sap-cloud-sdk/odata-common/internal';
export declare class TestEntity2Api<
  T extends DeSerializers = DefaultDeSerializers
> implements EntityApi<TestEntity2<T>, T>
{
  deSerializers: T;
  constructor(deSerializers?: T);
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof TestEntity2;
  requestBuilder(): TestEntity2RequestBuilder<T>;
  entityBuilder(): EntityBuilderType<TestEntity2<T>, T>;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<TestEntity2<T>, T, NullableT>;
  get schema(): {
    /**
     *
     * All fields selector.
     */
    ALL_FIELDS: AllFields<
      TestEntity2<
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
     * Static representation of the [[keyPropertyString]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    KEY_PROPERTY_STRING: EdmTypeField<
      TestEntity2<
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
    /**
     * Static representation of the [[singleProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    SINGLE_PROPERTY: OrderableEdmTypeField<
      TestEntity2<
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
      'Edm.Single',
      true,
      true
    >;
  };
}
//# sourceMappingURL=TestEntity2Api.d.ts.map
