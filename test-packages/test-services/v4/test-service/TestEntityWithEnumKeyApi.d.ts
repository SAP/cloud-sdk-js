import { TestEntityWithEnumKey } from './TestEntityWithEnumKey';
import { TestEntityWithEnumKeyRequestBuilder } from './TestEntityWithEnumKeyRequestBuilder';
import { TestEnumType } from './TestEnumType';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers
} from '@sap-cloud-sdk/odata-v4';
import {
  EnumField,
  AllFields,
  EntityBuilderType,
  EntityApi
} from '@sap-cloud-sdk/odata-common/internal';
export declare class TestEntityWithEnumKeyApi<
  T extends DeSerializers = DefaultDeSerializers
> implements EntityApi<TestEntityWithEnumKey<T>, T>
{
  deSerializers: T;
  constructor(deSerializers?: T);
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof TestEntityWithEnumKey;
  requestBuilder(): TestEntityWithEnumKeyRequestBuilder<T>;
  entityBuilder(): EntityBuilderType<TestEntityWithEnumKey<T>, T>;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<TestEntityWithEnumKey<T>, T, NullableT>;
  get schema(): {
    /**
     *
     * All fields selector.
     */
    ALL_FIELDS: AllFields<
      TestEntityWithEnumKey<
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
     * Static representation of the [[keyPropertyEnum1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    KEY_PROPERTY_ENUM_1: EnumField<
      TestEntityWithEnumKey<
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
      TestEnumType,
      false,
      true
    >;
  };
}
//# sourceMappingURL=TestEntityWithEnumKeyApi.d.ts.map
