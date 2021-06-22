/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { AirportsRequestBuilder } from './AirportsRequestBuilder';
import { AirportLocation, AirportLocationField } from './AirportLocation';
import {
  AllFields,
  CustomFieldV4,
  EntityBuilderType,
  EntityV4,
  Field,
  StringField
} from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "Airports" of service "Microsoft.OData.SampleService.Models.TripPin".
 */
export class Airports extends EntityV4 implements AirportsType {
  /**
   * Technical entity name for Airports.
   */
  static _entityName = 'Airports';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath =
    'V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/';
  /**
   * Icao Code.
   */
  icaoCode!: string;
  /**
   * Name.
   */
  name!: string;
  /**
   * Iata Code.
   */
  iataCode!: string;
  /**
   * Location.
   */
  location!: AirportLocation;

  /**
   * Returns an entity builder to construct instances of `Airports`.
   * @returns A builder that constructs instances of entity type `Airports`.
   */
  static builder(): EntityBuilderType<Airports, AirportsType> {
    return EntityV4.entityBuilder(Airports);
  }

  /**
   * Returns a request builder to construct requests for operations on the `Airports` entity type.
   * @returns A `Airports` request builder.
   */
  static requestBuilder(): AirportsRequestBuilder {
    return new AirportsRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `Airports`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `Airports`.
   */
  static customField(fieldName: string): CustomFieldV4<Airports> {
    return EntityV4.customFieldSelector(fieldName, Airports);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface AirportsType {
  icaoCode: string;
  name: string;
  iataCode: string;
  location: AirportLocation;
}

export namespace Airports {
  /**
   * Static representation of the [[icaoCode]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ICAO_CODE: StringField<Airports> = new StringField(
    'IcaoCode',
    Airports,
    'Edm.String'
  );
  /**
   * Static representation of the [[name]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const NAME: StringField<Airports> = new StringField(
    'Name',
    Airports,
    'Edm.String'
  );
  /**
   * Static representation of the [[iataCode]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const IATA_CODE: StringField<Airports> = new StringField(
    'IataCode',
    Airports,
    'Edm.String'
  );
  /**
   * Static representation of the [[location]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const LOCATION: AirportLocationField<Airports> =
    new AirportLocationField('Location', Airports);
  /**
   * All fields of the Airports entity.
   */
  export const _allFields: Array<
    StringField<Airports> | AirportLocationField<Airports>
  > = [
    Airports.ICAO_CODE,
    Airports.NAME,
    Airports.IATA_CODE,
    Airports.LOCATION
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<Airports> = new AllFields('*', Airports);
  /**
   * All key fields of the Airports entity.
   */
  export const _keyFields: Array<Field<Airports>> = [Airports.ICAO_CODE];
  /**
   * Mapping of all key field names to the respective static field property Airports.
   */
  export const _keys: { [keys: string]: Field<Airports> } =
    Airports._keyFields.reduce(
      (acc: { [keys: string]: Field<Airports> }, field: Field<Airports>) => {
        acc[field._fieldName] = field;
        return acc;
      },
      {}
    );
}
