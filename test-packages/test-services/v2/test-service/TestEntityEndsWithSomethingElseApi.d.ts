import { TestEntityEndsWithSomethingElse } from './TestEntityEndsWithSomethingElse';
import { TestEntityEndsWithSomethingElseRequestBuilder } from './TestEntityEndsWithSomethingElseRequestBuilder';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  EntityBuilderType,
  EntityApi,
  EdmTypeField
} from '@sap-cloud-sdk/odata-v2';
export declare class TestEntityEndsWithSomethingElseApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<TestEntityEndsWithSomethingElse<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  constructor(deSerializers?: DeSerializersT);
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof TestEntityEndsWithSomethingElse;
  requestBuilder(): TestEntityEndsWithSomethingElseRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    TestEntityEndsWithSomethingElse<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    TestEntityEndsWithSomethingElse<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
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
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
  };
}
//# sourceMappingURL=TestEntityEndsWithSomethingElseApi.d.ts.map
