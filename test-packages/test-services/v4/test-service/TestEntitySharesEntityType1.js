"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
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
exports.TestEntitySharesEntityType1 = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var TestEntitySharesEntityType1RequestBuilder_1 = require("./TestEntitySharesEntityType1RequestBuilder");
var core_1 = require("@sap-cloud-sdk/core");
/**
 * This class represents the entity "A_TestEntitySharesEntityType1" of service "API_TEST_SRV".
 */
var TestEntitySharesEntityType1 = /** @class */ (function (_super) {
    __extends(TestEntitySharesEntityType1, _super);
    function TestEntitySharesEntityType1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns an entity builder to construct instances of `TestEntitySharesEntityType1`.
     * @returns A builder that constructs instances of entity type `TestEntitySharesEntityType1`.
     */
    TestEntitySharesEntityType1.builder = function () {
        return core_1.EntityV4.entityBuilder(TestEntitySharesEntityType1);
    };
    /**
     * Returns a request builder to construct requests for operations on the `TestEntitySharesEntityType1` entity type.
     * @returns A `TestEntitySharesEntityType1` request builder.
     */
    TestEntitySharesEntityType1.requestBuilder = function () {
        return new TestEntitySharesEntityType1RequestBuilder_1.TestEntitySharesEntityType1RequestBuilder();
    };
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntitySharesEntityType1`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `TestEntitySharesEntityType1`.
     */
    TestEntitySharesEntityType1.customField = function (fieldName) {
        return core_1.EntityV4.customFieldSelector(fieldName, TestEntitySharesEntityType1);
    };
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    TestEntitySharesEntityType1.prototype.toJSON = function () {
        return __assign(__assign({}, this), this._customFields);
    };
    /**
     * Technical entity name for TestEntitySharesEntityType1.
     */
    TestEntitySharesEntityType1._entityName = 'A_TestEntitySharesEntityType1';
    /**
     * Default url path for the according service.
     */
    TestEntitySharesEntityType1._defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
    return TestEntitySharesEntityType1;
}(core_1.EntityV4));
exports.TestEntitySharesEntityType1 = TestEntitySharesEntityType1;
(function (TestEntitySharesEntityType1) {
    /**
     * Static representation of the [[keyProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType1.KEY_PROPERTY = new core_1.StringField('KeyProperty', TestEntitySharesEntityType1, 'Edm.String');
    /**
     * All fields of the TestEntitySharesEntityType1 entity.
     */
    TestEntitySharesEntityType1._allFields = [
        TestEntitySharesEntityType1.KEY_PROPERTY
    ];
    /**
     * All fields selector.
     */
    TestEntitySharesEntityType1.ALL_FIELDS = new core_1.AllFields('*', TestEntitySharesEntityType1);
    /**
     * All key fields of the TestEntitySharesEntityType1 entity.
     */
    TestEntitySharesEntityType1._keyFields = [TestEntitySharesEntityType1.KEY_PROPERTY];
    /**
     * Mapping of all key field names to the respective static field property TestEntitySharesEntityType1.
     */
    TestEntitySharesEntityType1._keys = TestEntitySharesEntityType1._keyFields.reduce(function (acc, field) {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(TestEntitySharesEntityType1 = exports.TestEntitySharesEntityType1 || (exports.TestEntitySharesEntityType1 = {}));
exports.TestEntitySharesEntityType1 = TestEntitySharesEntityType1;
//# sourceMappingURL=TestEntitySharesEntityType1.js.map