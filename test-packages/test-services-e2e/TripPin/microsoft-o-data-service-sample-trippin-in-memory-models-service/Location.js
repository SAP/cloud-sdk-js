"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = exports.LocationField = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const City_1 = require("./City");
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * LocationField
 * @typeParam EntityT - Type of the entity the complex type field belongs to.
 */
class LocationField extends odata_v4_1.ComplexTypeField {
    /**
     * Creates an instance of LocationField.
     * @param fieldName - Actual name of the field as used in the OData request.
     * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
     */
    constructor(fieldName, fieldOf, deSerializers, fieldOptions) {
        super(fieldName, fieldOf, deSerializers, Location, fieldOptions);
        this._fieldBuilder = new odata_v4_1.FieldBuilder(this, this.deSerializers);
        /**
         * Representation of the {@link Location.address} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.address = this._fieldBuilder.buildEdmTypeField('Address', 'Edm.String', false);
        /**
         * Representation of the {@link Location.city} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.city = this._fieldBuilder.buildComplexTypeField('City', City_1.CityField, false);
    }
}
exports.LocationField = LocationField;
var Location;
(function (Location) {
    /**
     * Metadata information on all properties of the `Location` complex type.
     */
    Location._propertyMetadata = [{
            originalName: 'Address',
            name: 'address',
            type: 'Edm.String',
            isCollection: false
        }, {
            originalName: 'City',
            name: 'city',
            type: City_1.City,
            isCollection: false
        }];
})(Location = exports.Location || (exports.Location = {}));
//# sourceMappingURL=Location.js.map