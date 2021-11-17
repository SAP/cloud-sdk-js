'use strict';
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
const TestLvl2NestedComplexType_1 = require('./TestLvl2NestedComplexType');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const odata_common_1 = require('@sap-cloud-sdk/odata-common/internal');
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
class TestNestedComplexTypeField extends odata_common_1.ComplexTypeField {
  /**
   * Creates an instance of TestNestedComplexTypeField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(fieldName, fieldOf, fieldOptions) {
    super(fieldName, fieldOf, TestNestedComplexType, fieldOptions);
    this._fieldBuilder = new odata_common_1.FieldBuilder(this);
    /**
     * Representation of the [[TestNestedComplexType.stringProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    this.stringProperty = this._fieldBuilder.buildEdmTypeField(
      'StringProperty',
      'Edm.String',
      true
    );
    /**
     * Representation of the [[TestNestedComplexType.complexTypeProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    this.complexTypeProperty = this._fieldBuilder.buildComplexTypeField(
      'ComplexTypeProperty',
      TestLvl2NestedComplexType_1.TestLvl2NestedComplexTypeField,
      true
    );
  }
}
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
   * @deprecated Since v1.25.0. Use `deserializeComplexType` of the `@sap-cloud-sdk/odata-v2` or `@sap-cloud-sdk/odata-v4` package instead.
   */
  function build(json) {
    return (0, odata_v4_1.deserializeComplexType)(json, TestNestedComplexType);
  }
  TestNestedComplexType.build = build;
})(
  (TestNestedComplexType =
    exports.TestNestedComplexType || (exports.TestNestedComplexType = {}))
);
//# sourceMappingURL=TestNestedComplexType.js.map
