/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Photos } from './Photos';
import { PhotosRequestBuilder } from './PhotosRequestBuilder';
import {
  CustomField,
  defaultDeSerializers,
  DefaultDeSerializers,
  DeSerializers,
  mergeDefaultDeSerializersWith,
  AllFields,
  entityBuilder,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  Time,
  OrderableEdmTypeField,
  EdmTypeField
} from '@sap-cloud-sdk/odata-v4';
import { BigNumber } from 'bignumber.js';
import { Moment, Duration } from 'moment';
export class PhotosApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<Photos<DeSerializersT>, DeSerializersT>
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

  entityConstructor = Photos;

  requestBuilder(): PhotosRequestBuilder<DeSerializersT> {
    return new PhotosRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<Photos<DeSerializersT>, DeSerializersT> {
    return entityBuilder(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<Photos<DeSerializersT>, DeSerializersT, NullableT> {
    return new CustomField(
      fieldName,
      this.entityConstructor,
      this.deSerializers,
      isNullable
    ) as any;
  }

  get schema() {
    const fieldBuilder = new FieldBuilder(Photos, this.deSerializers);
    return {
      /**
       * Static representation of the [[id]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      ID: fieldBuilder.buildEdmTypeField('Id', 'Edm.Int64', false),
      /**
       * Static representation of the [[name]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      NAME: fieldBuilder.buildEdmTypeField('Name', 'Edm.String', true),
      ...this.navigationPropertyFields,
      /**
       *
       * All fields selector.
       */
      ALL_FIELDS: new AllFields('*', Photos)
    };
  }
}
