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
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      if (typeof b !== 'function' && b !== null)
        throw new TypeError(
          'Class extends value ' + String(b) + ' is not a constructor or null'
        );
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
exports.TestComplexType1 =
  exports.TestComplexType1Field =
  exports.createTestComplexType1 =
    void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require('@sap-cloud-sdk/core');
/**
 * @deprecated Since v1.6.0. Use [[TestComplexType1.build]] instead.
 */
function createTestComplexType1(json) {
  return TestComplexType1.build(json);
}
exports.createTestComplexType1 = createTestComplexType1;
/**
 * TestComplexType1Field
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
var TestComplexType1Field = /** @class */ (function (_super) {
  __extends(TestComplexType1Field, _super);
  /**
   * Creates an instance of TestComplexType1Field.
   *
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  function TestComplexType1Field(fieldName, fieldOf, fieldOptions) {
    var _this =
      _super.call(this, fieldName, fieldOf, TestComplexType1, fieldOptions) ||
      this;
    _this._fieldBuilder = new core_1.FieldBuilder(_this);
    /**
     * Representation of the [[TestComplexType1.stringProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    _this.stringProperty = _this._fieldBuilder.buildEdmTypeField(
      'StringProperty',
      'Edm.String',
      false
    );
    return _this;
  }
  return TestComplexType1Field;
})(core_1.ComplexTypeField);
exports.TestComplexType1Field = TestComplexType1Field;
var TestComplexType1;
(function (TestComplexType1) {
  /**
   * Metadata information on all properties of the `TestComplexType1` complex type.
   */
  TestComplexType1._propertyMetadata = [
    {
      originalName: 'StringProperty',
      name: 'stringProperty',
      type: 'Edm.String',
      isCollection: false
    }
  ];
  /**
   * @deprecated Since v1.25.0. Use `deserializeComplexTypeV2` or `deserializeComplexTypeV4` of the `@sap-cloud-sdk/core` package instead.
   */
  function build(json) {
    return core_1.deserializeComplexTypeV4(json, TestComplexType1);
  }
  TestComplexType1.build = build;
})(
  (TestComplexType1 =
    exports.TestComplexType1 || (exports.TestComplexType1 = {}))
);
//# sourceMappingURL=TestComplexType1.js.map
