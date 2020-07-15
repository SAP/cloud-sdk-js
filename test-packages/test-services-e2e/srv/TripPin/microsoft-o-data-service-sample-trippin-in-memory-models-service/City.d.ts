import { ComplexTypeField, ComplexTypeStringPropertyField, Entity, FieldType } from '@sap-cloud-sdk/core/v4';
/**
 * City
 */
export interface City {
    /**
     * Name.
     * @nullable
     */
    name?: string;
    /**
     * Country Region.
     * @nullable
     */
    countryRegion?: string;
    /**
     * Region.
     * @nullable
     */
    region?: string;
}
/**
 * @deprecated Since v1.6.0. Use [[City.build]] instead.
 */
export declare function createCity(json: any): City;
/**
 * CityField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export declare class CityField<EntityT extends Entity> extends ComplexTypeField<EntityT> {
    /**
     * Representation of the [[City.name]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    name: ComplexTypeStringPropertyField<EntityT>;
    /**
     * Representation of the [[City.countryRegion]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    countryRegion: ComplexTypeStringPropertyField<EntityT>;
    /**
     * Representation of the [[City.region]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    region: ComplexTypeStringPropertyField<EntityT>;
}
export declare namespace City {
    function build(json: {
        [keys: string]: FieldType;
    }): City;
}
//# sourceMappingURL=City.d.ts.map