import { City, CityField } from './City';
import { ComplexTypeField, ComplexTypeStringPropertyField, Entity, FieldType } from '@sap-cloud-sdk/core/v4';
/**
 * Location
 */
export interface Location {
    /**
     * Address.
     * @nullable
     */
    address?: string;
    /**
     * City.
     * @nullable
     */
    city?: City;
}
/**
 * @deprecated Since v1.6.0. Use [[Location.build]] instead.
 */
export declare function createLocation(json: any): Location;
/**
 * LocationField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export declare class LocationField<EntityT extends Entity> extends ComplexTypeField<EntityT> {
    /**
     * Representation of the [[Location.address]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    address: ComplexTypeStringPropertyField<EntityT>;
    /**
     * Representation of the [[Location.city]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    city: CityField<EntityT>;
}
export declare namespace Location {
    function build(json: {
        [keys: string]: FieldType | City;
    }): Location;
}
//# sourceMappingURL=Location.d.ts.map