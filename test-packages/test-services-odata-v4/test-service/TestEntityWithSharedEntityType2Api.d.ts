/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityWithSharedEntityType2 } from './TestEntityWithSharedEntityType2';
import { TestEntityWithSharedEntityType2RequestBuilder } from './TestEntityWithSharedEntityType2RequestBuilder';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  OrderableEdmTypeField
} from '@sap-cloud-sdk/odata-v4';
export declare class TestEntityWithSharedEntityType2Api<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<TestEntityWithSharedEntityType2<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  constructor(deSerializers?: DeSerializersT);
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof TestEntityWithSharedEntityType2;
  requestBuilder(): TestEntityWithSharedEntityType2RequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    TestEntityWithSharedEntityType2<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    TestEntityWithSharedEntityType2<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof TestEntityWithSharedEntityType2,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    KEY_PROPERTY: OrderableEdmTypeField<
      TestEntityWithSharedEntityType2<
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
      false,
      true
    >;
    ALL_FIELDS: AllFields<
      TestEntityWithSharedEntityType2<
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
//# sourceMappingURL=TestEntityWithSharedEntityType2Api.d.ts.map
