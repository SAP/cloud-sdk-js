import { Photos } from './Photos';
import { PhotosRequestBuilder } from './PhotosRequestBuilder';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  EdmTypeField
} from '@sap-cloud-sdk/odata-v4';
export declare class PhotosApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<Photos<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  constructor(deSerializers?: DeSerializersT);
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof Photos;
  requestBuilder(): PhotosRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<Photos<DeSerializersT>, DeSerializersT>;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<Photos<DeSerializersT>, DeSerializersT, NullableT>;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<typeof Photos, DeSerializersT>;
  private _schema?;
  get schema(): {
    ID: EdmTypeField<
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
      DeSerializersT,
      'Edm.Int64',
      boolean,
      boolean
    >;
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
      DeSerializersT,
      'Edm.String',
      boolean,
      boolean
    >;
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
  };
}
//# sourceMappingURL=PhotosApi.d.ts.map
