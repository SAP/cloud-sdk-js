import { TestEntity4 } from './TestEntity4';
import { TestEntity4RequestBuilder } from './TestEntity4RequestBuilder';
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
export declare class TestEntity4Api<
  T extends DeSerializers = DefaultDeSerializers
> implements EntityApi<TestEntity4<T>, T>
{
  deSerializers: T;
  constructor(deSerializers?: T);
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof TestEntity4;
  requestBuilder(): TestEntity4RequestBuilder<T>;
  entityBuilder(): EntityBuilderType<TestEntity4<T>, T>;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<TestEntity4<T>, T, NullableT>;
  get schema(): {
    /**
     *
     * All fields selector.
     */
    ALL_FIELDS: AllFields<
      TestEntity4<
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
      TestEntity4<
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
     * Static representation of the [[booleanProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    BOOLEAN_PROPERTY: EdmTypeField<
      TestEntity4<
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
  };
}
//# sourceMappingURL=TestEntity4Api.d.ts.map
