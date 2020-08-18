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
exports.TestComplexBaseType = exports.TestComplexBaseTypeField = exports.createTestComplexBaseType = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var v4_1 = require("@sap-cloud-sdk/core/v4");
/**
 * @deprecated Since v1.6.0. Use [[TestComplexBaseType.build]] instead.
 */
function createTestComplexBaseType(json) {
    return TestComplexBaseType.build(json);
}
exports.createTestComplexBaseType = createTestComplexBaseType;
/**
 * TestComplexBaseTypeField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
var TestComplexBaseTypeField = /** @class */ (function (_super) {
    __extends(TestComplexBaseTypeField, _super);
    /**
     * Creates an instance of TestComplexBaseTypeField.
     *
     * @param fieldName - Actual name of the field as used in the OData request.
     * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
     */
    function TestComplexBaseTypeField(fieldName, fieldOf) {
        var _this = _super.call(this, fieldName, fieldOf, TestComplexBaseType) || this;
        /**
         * Representation of the [[TestComplexBaseType.baseStringProperty]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.baseStringProperty = new v4_1.ComplexTypeStringPropertyField('BaseStringProperty', _this, 'Edm.String');
        return _this;
    }
    return TestComplexBaseTypeField;
}(v4_1.ComplexTypeField));
exports.TestComplexBaseTypeField = TestComplexBaseTypeField;
var TestComplexBaseType;
(function (TestComplexBaseType) {
    /**
     * Metadata information on all properties of the `TestComplexBaseType` complex type.
     */
    TestComplexBaseType._propertyMetadata = [{
            originalName: 'BaseStringProperty',
            name: 'baseStringProperty',
            type: 'Edm.String',
            isCollection: false
        }];
    /**
     * @deprecated Since v1.25.0. Use `deserializeComplexType` of the `@sap-cloud-sdk/core` package instead.
     */
    function build(json) {
        return v4_1.deserializeComplexType(json, TestComplexBaseType);
    }
    TestComplexBaseType.build = build;
})(TestComplexBaseType = exports.TestComplexBaseType || (exports.TestComplexBaseType = {}));
//# sourceMappingURL=TestComplexBaseType.js.map