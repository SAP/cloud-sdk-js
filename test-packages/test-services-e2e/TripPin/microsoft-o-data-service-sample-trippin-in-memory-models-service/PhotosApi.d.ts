import { Photos } from './Photos';
import { PhotosRequestBuilder } from './PhotosRequestBuilder';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers
} from '@sap-cloud-sdk/odata-v4';
import {
  OrderableEdmTypeField,
  EdmTypeField,
  AllFields,
  EntityBuilderType,
  EntityApi
} from '@sap-cloud-sdk/odata-common/internal';
export declare class PhotosApi<T extends DeSerializers = DefaultDeSerializers>
  implements EntityApi<Photos<T>, T>
{
  deSerializers: T;
  constructor(deSerializers?: T);
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof Photos;
  requestBuilder(): PhotosRequestBuilder<T>;
  entityBuilder(): EntityBuilderType<Photos<T>, T>;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<Photos<T>, T, NullableT>;
  get schema(): {
    /**
     *
     * All fields selector.
     */
    ALL_FIELDS: AllFields<
      Photos<
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
     * Static representation of the [[id]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    ID: OrderableEdmTypeField<
      Photos<
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
      'Edm.Int64',
      false,
      true
    >;
    /**
     * Static representation of the [[name]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    NAME: EdmTypeField<
      Photos<
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
      true,
      true
    >;
  };
}
//# sourceMappingURL=PhotosApi.d.ts.map
