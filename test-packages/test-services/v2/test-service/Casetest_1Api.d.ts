import { Casetest_1 } from './Casetest_1';
import { Casetest_1RequestBuilder } from './Casetest_1RequestBuilder';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  EntityBuilderType,
  EntityApi
} from '@sap-cloud-sdk/odata-v2';
export declare class Casetest_1Api<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<Casetest_1<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  constructor(deSerializers?: DeSerializersT);
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof Casetest_1;
  requestBuilder(): Casetest_1RequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    Casetest_1<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<Casetest_1<DeSerializersT>, DeSerializersT, NullableT>;
  private _fieldBuilder;
  get fieldBuilder(): any;
  private _schema;
  get schema(): any;
}
//# sourceMappingURL=Casetest_1Api.d.ts.map
