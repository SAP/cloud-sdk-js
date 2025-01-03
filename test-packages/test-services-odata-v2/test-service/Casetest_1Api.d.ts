/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Casetest_1 } from './Casetest_1';
import { Casetest_1RequestBuilder } from './Casetest_1RequestBuilder';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  OrderableEdmTypeField
} from '@sap-cloud-sdk/odata-v2';
export declare class Casetest_1Api<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<Casetest_1<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): Casetest_1Api<DeSerializersT>;
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
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<typeof Casetest_1, DeSerializersT>;
  private _schema?;
  get schema(): {
    KEY_PROPERTY_STRING: OrderableEdmTypeField<
      Casetest_1<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ALL_FIELDS: AllFields<Casetest_1<DeSerializers>>;
  };
}
