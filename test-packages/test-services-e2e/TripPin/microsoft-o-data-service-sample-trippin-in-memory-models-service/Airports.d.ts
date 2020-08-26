import { AirportsRequestBuilder } from './AirportsRequestBuilder';
import { AirportLocation, AirportLocationField } from './AirportLocation';
import { AllFields, CustomFieldV4, EntityBuilderType, EntityV4, Field, StringField } from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "Airports" of service "Microsoft.OData.Service.Sample.TrippinInMemory.Models".
 */
export declare class Airports extends EntityV4 implements AirportsType {
    /**
     * Technical entity name for Airports.
     */
    static _entityName: string;
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for Airports.
     */
    static _serviceName: string;
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath: string;
    /**
     * Name.
     * @nullable
     */
    name?: string;
    /**
     * Icao Code.
     */
    icaoCode: string;
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
    static builder(): EntityBuilderType<Airports, AirportsTypeForceMandatory>;
    /**
     * Returns a request builder to construct requests for operations on the `Airports` entity type.
     * @returns A `Airports` request builder.
     */
    static requestBuilder(): AirportsRequestBuilder;
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `Airports`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `Airports`.
     */
    static customField(fieldName: string): CustomFieldV4<Airports>;
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    toJSON(): {
        [key: string]: any;
    };
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
export declare namespace Airports {
    /**
     * Static representation of the [[name]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const NAME: StringField<Airports>;
    /**
     * Static representation of the [[icaoCode]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const ICAO_CODE: StringField<Airports>;
    /**
     * Static representation of the [[iataCode]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const IATA_CODE: StringField<Airports>;
    /**
     * Static representation of the [[location]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    const LOCATION: AirportLocationField<Airports>;
    /**
     * All fields of the Airports entity.
     */
    const _allFields: Array<StringField<Airports> | AirportLocationField<Airports>>;
    /**
     * All fields selector.
     */
    const ALL_FIELDS: AllFields<Airports>;
    /**
     * All key fields of the Airports entity.
     */
    const _keyFields: Array<Field<Airports>>;
    /**
     * Mapping of all key field names to the respective static field property Airports.
     */
    const _keys: {
        [keys: string]: Field<Airports>;
    };
}
//# sourceMappingURL=Airports.d.ts.map