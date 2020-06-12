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
var core_1 = require("@sap-cloud-sdk/core");
/**
 * @deprecated Since v1.6.0. Use [[TestNestedComplexOnlyPrimitiveType.build]] instead.
 */
function createTestNestedComplexOnlyPrimitiveType(json) {
    return TestNestedComplexOnlyPrimitiveType.build(json);
}
exports.createTestNestedComplexOnlyPrimitiveType = createTestNestedComplexOnlyPrimitiveType;
/**
 * TestNestedComplexOnlyPrimitiveTypeField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
var TestNestedComplexOnlyPrimitiveTypeField = /** @class */ (function (_super) {
    __extends(TestNestedComplexOnlyPrimitiveTypeField, _super);
    function TestNestedComplexOnlyPrimitiveTypeField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Representation of the [[TestNestedComplexOnlyPrimitiveType.stringProperty]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.stringProperty = new core_1.ComplexTypeStringPropertyField('StringProperty', _this, 'Edm.String');
        return _this;
    }
    return TestNestedComplexOnlyPrimitiveTypeField;
}(core_1.ComplexTypeField));
exports.TestNestedComplexOnlyPrimitiveTypeField = TestNestedComplexOnlyPrimitiveTypeField;
var TestNestedComplexOnlyPrimitiveType;
(function (TestNestedComplexOnlyPrimitiveType) {
    function build(json) {
        return core_1.createComplexType(json, {
            StringProperty: function (stringProperty) { return ({ stringProperty: core_1.edmToTs(stringProperty, 'Edm.String') }); }
        });
    }
    TestNestedComplexOnlyPrimitiveType.build = build;
})(TestNestedComplexOnlyPrimitiveType = exports.TestNestedComplexOnlyPrimitiveType || (exports.TestNestedComplexOnlyPrimitiveType = {}));
//# sourceMappingURL=TestNestedComplexOnlyPrimitiveType.js.map