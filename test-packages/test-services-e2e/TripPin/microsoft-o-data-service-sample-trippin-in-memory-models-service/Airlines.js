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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Airlines = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var AirlinesRequestBuilder_1 = require("./AirlinesRequestBuilder");
var core_1 = require("@sap-cloud-sdk/core");
/**
 * This class represents the entity "Airlines" of service "Microsoft.OData.Service.Sample.TrippinInMemory.Models".
 */
var Airlines = /** @class */ (function (_super) {
    __extends(Airlines, _super);
    function Airlines() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns an entity builder to construct instances `Airlines`.
     * @returns A builder that constructs instances of entity type `Airlines`.
     */
    Airlines.builder = function () {
        return Entity.entityBuilder(Airlines);
    };
    /**
     * Returns a request builder to construct requests for operations on the `Airlines` entity type.
     * @returns A `Airlines` request builder.
     */
    Airlines.requestBuilder = function () {
        return new AirlinesRequestBuilder_1.AirlinesRequestBuilder();
    };
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `Airlines`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `Airlines`.
     */
    Airlines.customField = function (fieldName) {
        return Entity.customFieldSelector(fieldName, Airlines);
    };
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    Airlines.prototype.toJSON = function () {
        return __assign(__assign({}, this), this._customFields);
    };
    /**
     * Technical entity name for Airlines.
     */
    Airlines._entityName = 'Airlines';
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for Airlines.
     */
    Airlines._serviceName = 'Microsoft.OData.Service.Sample.TrippinInMemory.Models';
    /**
     * Default url path for the according service.
     */
    Airlines._defaultServicePath = 'TripPinRESTierService/(S(duh2c3dgb1c5lzc0bqwgyekc))/';
    return Airlines;
}(Entityv4));
exports.Airlines = Airlines;
(function (Airlines) {
    /**
     * Static representation of the [[airlineCode]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    Airlines.AIRLINE_CODE = new core_1.StringField('AirlineCode', Airlines, 'Edm.String');
    /**
     * Static representation of the [[name]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    Airlines.NAME = new core_1.StringField('Name', Airlines, 'Edm.String');
    /**
     * All fields of the Airlines entity.
     */
    Airlines._allFields = [
        Airlines.AIRLINE_CODE,
        Airlines.NAME
    ];
    /**
     * All fields selector.
     */
    Airlines.ALL_FIELDS = new core_1.AllFields('*', Airlines);
    /**
     * All key fields of the Airlines entity.
     */
    Airlines._keyFields = [Airlines.AIRLINE_CODE];
    /**
     * Mapping of all key field names to the respective static field property Airlines.
     */
    Airlines._keys = Airlines._keyFields.reduce(function (acc, field) {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(Airlines = exports.Airlines || (exports.Airlines = {}));
exports.Airlines = Airlines;
//# sourceMappingURL=Airlines.js.map