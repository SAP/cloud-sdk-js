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
 * @deprecated Since v1.6.0. Use [[EventLocation.build]] instead.
 */
function createEventLocation(json) {
    return EventLocation.build(json);
}
exports.createEventLocation = createEventLocation;
/**
 * EventLocationField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
var EventLocationField = /** @class */ (function (_super) {
    __extends(EventLocationField, _super);
    function EventLocationField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Representation of the [[EventLocation.buildingInfo]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.buildingInfo = new v4_1.ComplexTypeStringPropertyField('BuildingInfo', _this, 'Edm.String');
        /**
         * Representation of the [[EventLocation.address]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.address = new v4_1.ComplexTypeStringPropertyField('Address', _this, 'Edm.String');
        /**
         * Representation of the [[EventLocation.city]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.city = new City_1.CityField('City', _this);
        return _this;
    }
    return EventLocationField;
}(v4_1.ComplexTypeField));
exports.EventLocationField = EventLocationField;
var EventLocation;
(function (EventLocation) {
    function build(json) {
        return v4_1.createComplexType(json, {
            BuildingInfo: function (buildingInfo) { return ({ buildingInfo: v4_1.edmToTs(buildingInfo, 'Edm.String') }); },
            Address: function (address) { return ({ address: v4_1.edmToTs(address, 'Edm.String') }); },
            City: function (city) { return ({ city: City_1.City.build(city) }); }
        });
    }
    EventLocation.build = build;
})(EventLocation = exports.EventLocation || (exports.EventLocation = {}));
//# sourceMappingURL=EventLocation.js.map