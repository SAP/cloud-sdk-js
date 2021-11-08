'use strict';
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
const odata_v2_1 = require('@sap-cloud-sdk/odata-v2');
const odata_common_1 = require('@sap-cloud-sdk/odata-common');
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
class TestLvl2NestedComplexTypeField extends odata_common_1.ComplexTypeField {
  /**
   * Creates an instance of TestLvl2NestedComplexTypeField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(fieldName, fieldOf, fieldOptions) {
    super(fieldName, fieldOf, TestLvl2NestedComplexType, fieldOptions);
    this._fieldBuilder = new odata_common_1.FieldBuilder(this);
    /**
     * Representation of the [[TestLvl2NestedComplexType.stringProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    this.stringProperty = this._fieldBuilder.buildEdmTypeField(
      'StringProperty',
      'Edm.String',
      true
    );
  }
}
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
   * @deprecated Since v1.25.0. Use `deserializeComplexTypeV2` or `deserializeComplexTypeV4` of the `../../../../core` package instead.
   */
  function build(json) {
    return (0, odata_v2_1.deserializeComplexType)(
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
