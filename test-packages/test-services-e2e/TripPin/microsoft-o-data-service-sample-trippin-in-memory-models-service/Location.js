"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = exports.LocationField = exports.createLocation = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var City_1 = require("./City");
var v4_1 = require("@sap-cloud-sdk/core/v4");
/**
 * @deprecated Since v1.6.0. Use [[Location.build]] instead.
 */
function createLocation(json) {
    return Location.build(json);
}
exports.createLocation = createLocation;
/**
 * LocationField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
var LocationField = /** @class */ (function (_super) {
    __extends(LocationField, _super);
    /**
     * Creates an instance of LocationField.
     *
     * @param fieldName - Actual name of the field as used in the OData request.
     * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
     */
    function LocationField(fieldName, fieldOf) {
        var _this = _super.call(this, fieldName, fieldOf, Location) || this;
        /**
         * Representation of the [[Location.address]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.address = new v4_1.ComplexTypeStringPropertyField('Address', _this, 'Edm.String');
        /**
         * Representation of the [[Location.city]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.city = new City_1.CityField('City', _this);
        return _this;
    }
    return LocationField;
}(v4_1.ComplexTypeField));
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
    /**
     * @deprecated Since v1.25.0. Use `deserializeComplexType` of the `@sap-cloud-sdk/core` package instead.
     */
    function build(json) {
        return v4_1.deserializeComplexType(json, Location);
    }
    Location.build = build;
})(Location = exports.Location || (exports.Location = {}));
//# sourceMappingURL=Location.js.map