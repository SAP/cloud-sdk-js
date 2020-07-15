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
    function LocationField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
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
    function build(json) {
        return v4_1.createComplexType(json, {
            Address: function (address) { return ({ address: v4_1.edmToTs(address, 'Edm.String') }); },
            City: function (city) { return ({ city: City_1.City.build(city) }); }
        });
    }
    Location.build = build;
})(Location = exports.Location || (exports.Location = {}));
//# sourceMappingURL=Location.js.map