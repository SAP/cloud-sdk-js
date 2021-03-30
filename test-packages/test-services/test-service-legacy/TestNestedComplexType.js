'use strict';
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestNestedComplexType = exports.TestNestedComplexTypeField = exports.createTestNestedComplexType = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require('@sap-cloud-sdk/core');
/**
 * @deprecated Since v1.6.0. Use [[TestNestedComplexType.build]] instead.
 */
function createTestNestedComplexType(json) {
  return TestNestedComplexType.build(json);
}
exports.createTestNestedComplexType = createTestNestedComplexType;
/**
 * TestNestedComplexTypeField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
var TestNestedComplexTypeField = /** @class */ (function (_super) {
  __extends(TestNestedComplexTypeField, _super);
  function TestNestedComplexTypeField() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    /**
     * Representation of the [[TestNestedComplexType.stringProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    _this.stringProperty = new core_1.ComplexTypeStringPropertyField(
      'StringProperty',
      _this,
      'Edm.String'
    );
    return _this;
  }
  return TestNestedComplexTypeField;
})(core_1.ComplexTypeField);
exports.TestNestedComplexTypeField = TestNestedComplexTypeField;
var TestNestedComplexType;
(function (TestNestedComplexType) {
  function build(json) {
    return core_1.createComplexType(json, {
      StringProperty: function (stringProperty) {
        return { stringProperty: core_1.edmToTs(stringProperty, 'Edm.String') };
      }
    });
  }
  TestNestedComplexType.build = build;
})(
  (TestNestedComplexType =
    exports.TestNestedComplexType || (exports.TestNestedComplexType = {}))
);
//# sourceMappingURL=TestNestedComplexType.js.map
