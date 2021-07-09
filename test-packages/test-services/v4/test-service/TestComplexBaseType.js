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
exports.TestComplexBaseType =
  exports.TestComplexBaseTypeField =
  exports.createTestComplexBaseType =
    void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require('@sap-cloud-sdk/core');
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
  function TestComplexBaseTypeField(fieldName, fieldOf, fieldOptions) {
    var _this =
      _super.call(
        this,
        fieldName,
        fieldOf,
        TestComplexBaseType,
        fieldOptions
      ) || this;
    _this._fieldBuilder = new core_1.FieldBuilder(_this);
    /**
     * Representation of the [[TestComplexBaseType.baseStringProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    _this.baseStringProperty = _this._fieldBuilder.buildEdmTypeField(
      'BaseStringProperty',
      'Edm.String',
      true
    );
    return _this;
  }
  return TestComplexBaseTypeField;
})(core_1.ComplexTypeField);
exports.TestComplexBaseTypeField = TestComplexBaseTypeField;
var TestComplexBaseType;
(function (TestComplexBaseType) {
  /**
   * Metadata information on all properties of the `TestComplexBaseType` complex type.
   */
  TestComplexBaseType._propertyMetadata = [
    {
      originalName: 'BaseStringProperty',
      name: 'baseStringProperty',
      type: 'Edm.String',
      isCollection: false
    }
  ];
  /**
   * @deprecated Since v1.25.0. Use `deserializeComplexTypeV2` or `deserializeComplexTypeV4` of the `@sap-cloud-sdk/core` package instead.
   */
  function build(json) {
    return core_1.deserializeComplexTypeV4(json, TestComplexBaseType);
  }
  TestComplexBaseType.build = build;
})(
  (TestComplexBaseType =
    exports.TestComplexBaseType || (exports.TestComplexBaseType = {}))
);
//# sourceMappingURL=TestComplexBaseType.js.map
