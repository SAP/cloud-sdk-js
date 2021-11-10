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
exports.TestLvl2NestedComplexType =
  exports.TestLvl2NestedComplexTypeField =
  exports.createTestLvl2NestedComplexType =
    void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
var odata_common_1 = require('@sap-cloud-sdk/odata-common');
/**
 * @deprecated Since v1.6.0. Use [[TestLvl2NestedComplexType.build]] instead.
 */
function createTestLvl2NestedComplexType(json) {
  return TestLvl2NestedComplexType.build(json);
}
exports.createTestLvl2NestedComplexType = createTestLvl2NestedComplexType;
/**
 * TestLvl2NestedComplexTypeField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
var TestLvl2NestedComplexTypeField = /** @class */ (function (_super) {
  __extends(TestLvl2NestedComplexTypeField, _super);
  /**
   * Creates an instance of TestLvl2NestedComplexTypeField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  function TestLvl2NestedComplexTypeField(fieldName, fieldOf, fieldOptions) {
    var _this =
      _super.call(
        this,
        fieldName,
        fieldOf,
        TestLvl2NestedComplexType,
        fieldOptions
      ) || this;
    _this._fieldBuilder = new odata_common_1.FieldBuilder(_this);
    /**
     * Representation of the [[TestLvl2NestedComplexType.stringProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    _this.stringProperty = _this._fieldBuilder.buildEdmTypeField(
      'StringProperty',
      'Edm.String',
      true
    );
    return _this;
  }
  return TestLvl2NestedComplexTypeField;
})(odata_common_1.ComplexTypeField);
exports.TestLvl2NestedComplexTypeField = TestLvl2NestedComplexTypeField;
var TestLvl2NestedComplexType;
(function (TestLvl2NestedComplexType) {
  /**
   * Metadata information on all properties of the `TestLvl2NestedComplexType` complex type.
   */
  TestLvl2NestedComplexType._propertyMetadata = [
    {
      originalName: 'StringProperty',
      name: 'stringProperty',
      type: 'Edm.String',
      isCollection: false
    }
  ];
  /**
   * @deprecated Since v1.25.0. Use `deserializeComplexType` of the `@sap-cloud-sdk/odata-v2 or @sap-cloud-sdk/odata-v4` package instead.
   */
  function build(json) {
    return (0, odata_v4_1.deserializeComplexType)(
      json,
      TestLvl2NestedComplexType
    );
  }
  TestLvl2NestedComplexType.build = build;
})(
  (TestLvl2NestedComplexType =
    exports.TestLvl2NestedComplexType ||
    (exports.TestLvl2NestedComplexType = {}))
);
//# sourceMappingURL=TestLvl2NestedComplexType.js.map
