/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { AirportsRequestBuilder } from './AirportsRequestBuilder';
import { AirportLocation, AirportLocationField } from './AirportLocation';
import { AllFields, CustomField, Entity, EntityBuilderType, Field, StringField } from '@sap-cloud-sdk/core/v4';

/**
 * This class represents the entity "Airports" of service "Microsoft.OData.Service.Sample.TrippinInMemory.Models".
 */
export class Airports extends Entity implements AirportsType {
  /**
   * Technical entity name for Airports.
   */
  static _entityName = 'Airports';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for Airports.
   */
  static _serviceName = 'Microsoft.OData.Service.Sample.TrippinInMemory.Models';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = 'TripPinRESTierService/(S(duh2c3dgb1c5lzc0bqwgyekc))/';
  /**
   * Name.
   * @nullable
   */
  name?: string;
  /**
   * Icao Code.
   */
  icaoCode!: string;
  /**
   * Iata Code.
   * @nullable
   */
  iataCode?: string;
  /**
   * Location.
   * @nullable
   */
  location?: AirportLocation;

  /**
   * Returns an entity builder to construct instances `Airports`.
   * @returns A builder that constructs instances of entity type `Airports`.
   */
  static builder(): EntityBuilderType<Airports, AirportsTypeForceMandatory> {
    return Entity.entityBuilder(Airports);
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
  static customField(fieldName: string): CustomField<Airports> {
    return Entity.customFieldSelector(fieldName, Airports);
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
  name?: string;
  icaoCode: string;
  iataCode?: string;
  location?: AirportLocation;
}

export interface AirportsTypeForceMandatory {
  name: string;
  icaoCode: string;
  iataCode: string;
  location: AirportLocation;
}

export namespace Airports {
  /**
   * Static representation of the [[name]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const NAME: StringField<Airports> = new StringField('Name', Airports, 'Edm.String');
  /**
   * Static representation of the [[icaoCode]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ICAO_CODE: StringField<Airports> = new StringField('IcaoCode', Airports, 'Edm.String');
  /**
   * Static representation of the [[iataCode]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const IATA_CODE: StringField<Airports> = new StringField('IataCode', Airports, 'Edm.String');
  /**
   * Static representation of the [[location]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const LOCATION: AirportLocationField<Airports> = new AirportLocationField('Location', Airports);
  /**
   * All fields of the Airports entity.
   */
  export const _allFields: Array<StringField<Airports> | AirportLocationField<Airports>> = [
    Airports.NAME,
    Airports.ICAO_CODE,
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
  export const _keys: { [keys: string]: Field<Airports> } = Airports._keyFields.reduce((acc: { [keys: string]: Field<Airports> }, field: Field<Airports>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
