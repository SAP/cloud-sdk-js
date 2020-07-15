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
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var NewComePeopleRequestBuilder_1 = require("./NewComePeopleRequestBuilder");
var Location_1 = require("./Location");
var v4_1 = require("@sap-cloud-sdk/core/v4");
/**
 * This class represents the entity "NewComePeople" of service "Microsoft.OData.Service.Sample.TrippinInMemory.Models".
 */
var NewComePeople = /** @class */ (function (_super) {
    __extends(NewComePeople, _super);
    function NewComePeople() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns an entity builder to construct instances `NewComePeople`.
     * @returns A builder that constructs instances of entity type `NewComePeople`.
     */
    NewComePeople.builder = function () {
        return v4_1.Entity.entityBuilder(NewComePeople);
    };
    /**
     * Returns a request builder to construct requests for operations on the `NewComePeople` entity type.
     * @returns A `NewComePeople` request builder.
     */
    NewComePeople.requestBuilder = function () {
        return new NewComePeopleRequestBuilder_1.NewComePeopleRequestBuilder();
    };
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `NewComePeople`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `NewComePeople`.
     */
    NewComePeople.customField = function (fieldName) {
        return v4_1.Entity.customFieldSelector(fieldName, NewComePeople);
    };
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    NewComePeople.prototype.toJSON = function () {
        return __assign(__assign({}, this), this._customFields);
    };
    /**
     * Technical entity name for NewComePeople.
     */
    NewComePeople._entityName = 'NewComePeople';
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for NewComePeople.
     */
    NewComePeople._serviceName = 'Microsoft.OData.Service.Sample.TrippinInMemory.Models';
    /**
     * Default url path for the according service.
     */
    NewComePeople._defaultServicePath = 'TripPinRESTierService/(S(duh2c3dgb1c5lzc0bqwgyekc))/';
    return NewComePeople;
}(v4_1.Entity));
exports.NewComePeople = NewComePeople;
(function (NewComePeople) {
    /**
     * Static representation of the [[userName]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    NewComePeople.USER_NAME = new v4_1.StringField('UserName', NewComePeople, 'Edm.String');
    /**
     * Static representation of the [[firstName]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    NewComePeople.FIRST_NAME = new v4_1.StringField('FirstName', NewComePeople, 'Edm.String');
    /**
     * Static representation of the [[lastName]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    NewComePeople.LAST_NAME = new v4_1.StringField('LastName', NewComePeople, 'Edm.String');
    /**
     * Static representation of the [[middleName]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    NewComePeople.MIDDLE_NAME = new v4_1.StringField('MiddleName', NewComePeople, 'Edm.String');
    /**
     * Static representation of the [[age]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    NewComePeople.AGE = new v4_1.BigNumberField('Age', NewComePeople, 'Edm.Int64');
    /**
     * Static representation of the [[emails]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    NewComePeople.EMAILS = new v4_1.CollectionField('Emails', NewComePeople, new v4_1.StringField('', NewComePeople, 'Edm.String'));
    /**
     * Static representation of the [[addressInfo]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    NewComePeople.ADDRESS_INFO = new v4_1.CollectionField('AddressInfo', NewComePeople, new Location_1.LocationField('', NewComePeople));
    /**
     * Static representation of the [[homeAddress]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    NewComePeople.HOME_ADDRESS = new Location_1.LocationField('HomeAddress', NewComePeople);
    /**
     * All fields of the NewComePeople entity.
     */
    NewComePeople._allFields = [
        NewComePeople.USER_NAME,
        NewComePeople.FIRST_NAME,
        NewComePeople.LAST_NAME,
        NewComePeople.MIDDLE_NAME,
        NewComePeople.AGE,
        NewComePeople.EMAILS,
        NewComePeople.ADDRESS_INFO,
        NewComePeople.HOME_ADDRESS
    ];
    /**
     * All fields selector.
     */
    NewComePeople.ALL_FIELDS = new v4_1.AllFields('*', NewComePeople);
    /**
     * All key fields of the NewComePeople entity.
     */
    NewComePeople._keyFields = [NewComePeople.USER_NAME];
    /**
     * Mapping of all key field names to the respective static field property NewComePeople.
     */
    NewComePeople._keys = NewComePeople._keyFields.reduce(function (acc, field) {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(NewComePeople = exports.NewComePeople || (exports.NewComePeople = {}));
exports.NewComePeople = NewComePeople;
//# sourceMappingURL=NewComePeople.js.map