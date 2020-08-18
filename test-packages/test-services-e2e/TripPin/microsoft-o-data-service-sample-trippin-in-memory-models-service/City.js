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
exports.City = exports.CityField = exports.createCity = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var v4_1 = require("@sap-cloud-sdk/core/v4");
/**
 * @deprecated Since v1.6.0. Use [[City.build]] instead.
 */
function createCity(json) {
    return City.build(json);
}
exports.createCity = createCity;
/**
 * CityField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
var CityField = /** @class */ (function (_super) {
    __extends(CityField, _super);
    /**
     * Creates an instance of CityField.
     *
     * @param fieldName - Actual name of the field as used in the OData request.
     * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
     */
    function CityField(fieldName, fieldOf) {
        var _this = _super.call(this, fieldName, fieldOf, City) || this;
        /**
         * Representation of the [[City.name]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.name = new v4_1.ComplexTypeStringPropertyField('Name', _this, 'Edm.String');
        /**
         * Representation of the [[City.countryRegion]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.countryRegion = new v4_1.ComplexTypeStringPropertyField('CountryRegion', _this, 'Edm.String');
        /**
         * Representation of the [[City.region]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.region = new v4_1.ComplexTypeStringPropertyField('Region', _this, 'Edm.String');
        return _this;
    }
    return CityField;
}(v4_1.ComplexTypeField));
exports.CityField = CityField;
var City;
(function (City) {
    /**
     * Metadata information on all properties of the `City` complex type.
     */
    City._propertyMetadata = [{
            originalName: 'Name',
            name: 'name',
            type: 'Edm.String',
            isCollection: false
        }, {
            originalName: 'CountryRegion',
            name: 'countryRegion',
            type: 'Edm.String',
            isCollection: false
        }, {
            originalName: 'Region',
            name: 'region',
            type: 'Edm.String',
            isCollection: false
        }];
    /**
     * @deprecated Since v1.25.0. Use `deserializeComplexType` of the `@sap-cloud-sdk/core` package instead.
     */
    function build(json) {
        return v4_1.deserializeComplexType(json, City);
    }
    City.build = build;
})(City = exports.City || (exports.City = {}));
//# sourceMappingURL=City.js.map