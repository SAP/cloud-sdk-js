import { MultiSchemaTestEntity } from './MultiSchemaTestEntity';
import { MultiSchemaTestEntityRequestBuilder } from './MultiSchemaTestEntityRequestBuilder';
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
export declare class MultiSchemaTestEntityApi<
  T extends DeSerializers = DefaultDeSerializers
> implements EntityApi<MultiSchemaTestEntity<T>, T>
{
  deSerializers: T;
  constructor(deSerializers?: T);
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof MultiSchemaTestEntity;
  requestBuilder(): MultiSchemaTestEntityRequestBuilder<T>;
  entityBuilder(): EntityBuilderType<MultiSchemaTestEntity<T>, T>;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<MultiSchemaTestEntity<T>, T, NullableT>;
  get schema(): {
    /**
     *
     * All fields selector.
     */
    ALL_FIELDS: AllFields<
      MultiSchemaTestEntity<
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
      MultiSchemaTestEntity<
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
//# sourceMappingURL=MultiSchemaTestEntityApi.d.ts.map
