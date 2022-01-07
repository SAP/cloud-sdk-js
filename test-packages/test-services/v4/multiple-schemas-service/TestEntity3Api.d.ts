import { TestEntity3 } from './TestEntity3';
import { TestEntity3RequestBuilder } from './TestEntity3RequestBuilder';
import { TestComplexType2Field } from './TestComplexType2';
import { TestEnumType2 } from './TestEnumType2';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers
} from '@sap-cloud-sdk/odata-v4';
import {
  EdmTypeField,
  EnumField,
  AllFields,
  EntityBuilderType,
  EntityApi
} from '@sap-cloud-sdk/odata-common/internal';
export declare class TestEntity3Api<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<TestEntity3<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  constructor(deSerializers?: DeSerializersT);
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof TestEntity3;
  requestBuilder(): TestEntity3RequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    TestEntity3<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<TestEntity3<DeSerializersT>, DeSerializersT, NullableT>;
  get schema(): {
    /**
     *
     * All fields selector.
     */
    ALL_FIELDS: AllFields<
      TestEntity3<
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
      TestEntity3<
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
     * Static representation of the [[enumProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ENUM_PROPERTY: EnumField<
      TestEntity3<
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
      TestEnumType2,
      true,
      true
    >;
    /**
     * Static representation of the [[complexTypeProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    COMPLEX_TYPE_PROPERTY: TestComplexType2Field<
      TestEntity3<
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
      true,
      true
    >;
  };
}
//# sourceMappingURL=TestEntity3Api.d.ts.map
