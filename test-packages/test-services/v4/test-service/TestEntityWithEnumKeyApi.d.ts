import { TestEntityWithEnumKey } from './TestEntityWithEnumKey';
import { TestEntityWithEnumKeyRequestBuilder } from './TestEntityWithEnumKeyRequestBuilder';
import { TestEnumType } from './TestEnumType';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  EntityBuilderType,
  EntityApi,
  EnumField
} from '@sap-cloud-sdk/odata-v4';
export declare class TestEntityWithEnumKeyApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<TestEntityWithEnumKey<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  constructor(deSerializers?: DeSerializersT);
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof TestEntityWithEnumKey;
  requestBuilder(): TestEntityWithEnumKeyRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    TestEntityWithEnumKey<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    TestEntityWithEnumKey<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
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
      DeSerializersT,
      TestEnumType,
      false,
      true
    >;
  };
}
//# sourceMappingURL=TestEntityWithEnumKeyApi.d.ts.map
