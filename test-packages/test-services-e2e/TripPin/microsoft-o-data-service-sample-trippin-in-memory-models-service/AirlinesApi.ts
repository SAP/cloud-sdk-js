/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Airlines } from './Airlines';
import { AirlinesRequestBuilder } from './AirlinesRequestBuilder';
import {
  CustomField,
  defaultDeSerializers,
  DefaultDeSerializers,
  DeSerializers,
  mergeDefaultDeSerializersWith,
  EdmTypeField,
  AllFields,
  FieldBuilder,
  entityBuilder,
  EntityBuilderType,
  EntityApi,
  Time
} from '@sap-cloud-sdk/odata-v4';
import { BigNumber } from 'bignumber.js';
import { Moment, Duration } from 'moment';
export class AirlinesApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<Airlines<DeSerializersT>, DeSerializersT>
{
  public deSerializers: DeSerializersT;

  constructor(deSerializers: DeSerializersT = defaultDeSerializers as any) {
    this.deSerializers = deSerializers;
  }

  private navigationPropertyFields!: {};

  _addNavigationProperties(linkedApis: []): this {
    this.navigationPropertyFields = {};
    return this;
  }

  entityConstructor = Airlines;

  requestBuilder(): AirlinesRequestBuilder<DeSerializersT> {
    return new AirlinesRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<Airlines<DeSerializersT>, DeSerializersT> {
    return entityBuilder(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<Airlines<DeSerializersT>, DeSerializersT, NullableT> {
    return new CustomField(
      fieldName,
      this.entityConstructor,
      this.deSerializers,
      isNullable
    ) as any;
  }

  get schema() {
    const fieldBuilder = new FieldBuilder(Airlines, this.deSerializers);
    return {
      /**
       * Static representation of the [[airlineCode]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      AIRLINE_CODE: fieldBuilder.buildEdmTypeField(
        'AirlineCode',
        'Edm.String',
        false
      ),
      /**
       * Static representation of the [[name]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      NAME: fieldBuilder.buildEdmTypeField('Name', 'Edm.String', false),
      ...this.navigationPropertyFields,
      /**
       *
       * All fields selector.
       */
      ALL_FIELDS: new AllFields('*', Airlines)
    };
  }
}
