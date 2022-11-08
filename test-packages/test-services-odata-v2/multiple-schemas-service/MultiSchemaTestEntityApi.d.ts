/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { MultiSchemaTestEntity } from './MultiSchemaTestEntity';
import { MultiSchemaTestEntityRequestBuilder } from './MultiSchemaTestEntityRequestBuilder';
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
export declare class MultiSchemaTestEntityApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<MultiSchemaTestEntity<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  constructor(deSerializers?: DeSerializersT);
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof MultiSchemaTestEntity;
  requestBuilder(): MultiSchemaTestEntityRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    MultiSchemaTestEntity<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    MultiSchemaTestEntity<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof MultiSchemaTestEntity,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    KEY_PROPERTY: OrderableEdmTypeField<
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
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
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
  };
}
//# sourceMappingURL=MultiSchemaTestEntityApi.d.ts.map
