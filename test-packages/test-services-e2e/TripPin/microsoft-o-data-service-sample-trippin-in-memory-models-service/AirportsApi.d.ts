/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Airports } from './Airports';
import { AirportsRequestBuilder } from './AirportsRequestBuilder';
import { AirportLocationField } from './AirportLocation';
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
export declare class AirportsApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<Airports<DeSerializersT>, DeSerializersT> {
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): AirportsApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof Airports;
  requestBuilder(): AirportsRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<Airports<DeSerializersT>, DeSerializersT>;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<Airports<DeSerializersT>, DeSerializersT, NullableT>;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<typeof Airports, DeSerializersT>;
  private _schema?;
  get schema(): {
    ICAO_CODE: OrderableEdmTypeField<
      Airports<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    NAME: OrderableEdmTypeField<
      Airports<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    IATA_CODE: OrderableEdmTypeField<
      Airports<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    LOCATION: AirportLocationField<
      Airports<DeSerializers>,
      DeSerializersT,
      false,
      true
    >;
    ALL_FIELDS: AllFields<Airports<DeSerializers>>;
  };
}
