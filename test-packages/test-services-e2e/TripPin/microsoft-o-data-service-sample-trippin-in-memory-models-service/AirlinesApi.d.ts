import { Airlines } from './Airlines';
import { AirlinesRequestBuilder } from './AirlinesRequestBuilder';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  EntityBuilderType,
  EntityApi
} from '@sap-cloud-sdk/odata-v4';
export declare class AirlinesApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<Airlines<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  constructor(deSerializers?: DeSerializersT);
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof Airlines;
  requestBuilder(): AirlinesRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<Airlines<DeSerializersT>, DeSerializersT>;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<Airlines<DeSerializersT>, DeSerializersT, NullableT>;
  private _fieldBuilder;
  get fieldBuilder(): any;
  private _schema;
  get schema(): any;
}
//# sourceMappingURL=AirlinesApi.d.ts.map
