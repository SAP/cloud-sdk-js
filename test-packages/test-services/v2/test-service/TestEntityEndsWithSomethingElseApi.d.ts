import { TestEntityEndsWithSomethingElse } from './TestEntityEndsWithSomethingElse';
import { TestEntityEndsWithSomethingElseRequestBuilder } from './TestEntityEndsWithSomethingElseRequestBuilder';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers
} from '@sap-cloud-sdk/odata-v2';
import {
  EdmTypeField,
  AllFields,
  EntityBuilderType,
  EntityApi
} from '@sap-cloud-sdk/odata-common/internal';
export declare class TestEntityEndsWithSomethingElseApi<
  T extends DeSerializers = DefaultDeSerializers
> implements EntityApi<TestEntityEndsWithSomethingElse<T>, T>
{
  deSerializers: T;
  constructor(deSerializers?: T);
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof TestEntityEndsWithSomethingElse;
  requestBuilder(): TestEntityEndsWithSomethingElseRequestBuilder<T>;
  entityBuilder(): EntityBuilderType<TestEntityEndsWithSomethingElse<T>, T>;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<TestEntityEndsWithSomethingElse<T>, T, NullableT>;
  get schema(): {
    /**
     *
     * All fields selector.
     */
    ALL_FIELDS: AllFields<
      TestEntityEndsWithSomethingElse<
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
     * Static representation of the [[keyProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    KEY_PROPERTY: EdmTypeField<
      TestEntityEndsWithSomethingElse<
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
//# sourceMappingURL=TestEntityEndsWithSomethingElseApi.d.ts.map
