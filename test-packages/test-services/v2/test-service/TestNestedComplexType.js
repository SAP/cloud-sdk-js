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
exports.TestNestedComplexType =
  exports.TestNestedComplexTypeField =
  exports.createTestNestedComplexType =
    void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var TestLvl2NestedComplexType_1 = require('./TestLvl2NestedComplexType');
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
  /**
   * Creates an instance of TestNestedComplexTypeField.
   *
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  function TestNestedComplexTypeField(fieldName, fieldOf, fieldOptions) {
    var _this =
      _super.call(
        this,
        fieldName,
        fieldOf,
        TestNestedComplexType,
        fieldOptions
      ) || this;
    _this._fieldBuilder = new core_1.FieldBuilder(_this);
    /**
     * Representation of the [[TestNestedComplexType.stringProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    _this.stringProperty = _this._fieldBuilder.buildEdmTypeField(
      'StringProperty',
      'Edm.String',
      true
    );
    /**
     * Representation of the [[TestNestedComplexType.complexTypeProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    _this.complexTypeProperty = _this._fieldBuilder.buildComplexTypeField(
      'ComplexTypeProperty',
      TestLvl2NestedComplexType_1.TestLvl2NestedComplexTypeField,
      true
    );
    return _this;
  }
  return TestNestedComplexTypeField;
})(core_1.ComplexTypeField);
exports.TestNestedComplexTypeField = TestNestedComplexTypeField;
var TestNestedComplexType;
(function (TestNestedComplexType) {
  /**
   * Metadata information on all properties of the `TestNestedComplexType` complex type.
   */
  TestNestedComplexType._propertyMetadata = [
    {
      originalName: 'StringProperty',
      name: 'stringProperty',
      type: 'Edm.String',
      isCollection: false
    },
    {
      originalName: 'ComplexTypeProperty',
      name: 'complexTypeProperty',
      type: TestLvl2NestedComplexType_1.TestLvl2NestedComplexType,
      isCollection: false
    }
  ];
  /**
   * @deprecated Since v1.25.0. Use `deserializeComplexTypeV2` or `deserializeComplexTypeV4` of the `@sap-cloud-sdk/core` package instead.
   */
  function build(json) {
    return core_1.deserializeComplexTypeV2(json, TestNestedComplexType);
  }
  TestNestedComplexType.build = build;
})(
  (TestNestedComplexType =
    exports.TestNestedComplexType || (exports.TestNestedComplexType = {}))
);
//# sourceMappingURL=TestNestedComplexType.js.map
