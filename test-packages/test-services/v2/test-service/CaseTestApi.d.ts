import { CaseTest } from './CaseTest';
import { CaseTestRequestBuilder } from './CaseTestRequestBuilder';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  EntityBuilderType,
  EntityApi,
  EdmTypeField
} from '@sap-cloud-sdk/odata-v2';
export declare class CaseTestApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<CaseTest<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  constructor(deSerializers?: DeSerializersT);
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof CaseTest;
  requestBuilder(): CaseTestRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<CaseTest<DeSerializersT>, DeSerializersT>;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<CaseTest<DeSerializersT>, DeSerializersT, NullableT>;
  get schema(): {
    /**
     *
     * All fields selector.
     */
    ALL_FIELDS: AllFields<
      CaseTest<
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
     * Static representation of the [[keyPropertyString]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    KEY_PROPERTY_STRING: EdmTypeField<
      CaseTest<
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
//# sourceMappingURL=CaseTestApi.d.ts.map
