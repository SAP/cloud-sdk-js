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
exports.AirportLocation = exports.AirportLocationField = exports.createAirportLocation = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var City_1 = require("./City");
var v4_1 = require("@sap-cloud-sdk/core/v4");
/**
 * @deprecated Since v1.6.0. Use [[AirportLocation.build]] instead.
 */
function createAirportLocation(json) {
    return AirportLocation.build(json);
}
exports.createAirportLocation = createAirportLocation;
/**
 * AirportLocationField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
var AirportLocationField = /** @class */ (function (_super) {
    __extends(AirportLocationField, _super);
    /**
     * Creates an instance of AirportLocationField.
     *
     * @param fieldName - Actual name of the field as used in the OData request.
     * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
     */
    function AirportLocationField(fieldName, fieldOf) {
        var _this = _super.call(this, fieldName, fieldOf, AirportLocation) || this;
        /**
         * Representation of the [[AirportLocation.loc]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.loc = new v4_1.ComplexTypeAnyPropertyField('Loc', _this, 'Edm.Any');
        /**
         * Representation of the [[AirportLocation.address]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.address = new v4_1.ComplexTypeStringPropertyField('Address', _this, 'Edm.String');
        /**
         * Representation of the [[AirportLocation.city]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.city = new City_1.CityField('City', _this);
        return _this;
    }
    return AirportLocationField;
}(v4_1.ComplexTypeField));
exports.AirportLocationField = AirportLocationField;
var AirportLocation;
(function (AirportLocation) {
    /**
     * Metadata information on all properties of the `AirportLocation` complex type.
     */
    AirportLocation._propertyMetadata = [{
            originalName: 'Loc',
            name: 'loc',
            type: 'Edm.Any',
            isCollection: false
        }, {
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
        return v4_1.deserializeComplexType(json, AirportLocation);
    }
    AirportLocation.build = build;
})(AirportLocation = exports.AirportLocation || (exports.AirportLocation = {}));
//# sourceMappingURL=AirportLocation.js.map