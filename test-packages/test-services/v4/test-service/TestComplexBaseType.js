'use strict';
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
const core_1 = require('@sap-cloud-sdk/core');
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
class TestComplexBaseTypeField extends core_1.ComplexTypeField {
  /**
   * Creates an instance of TestComplexBaseTypeField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(fieldName, fieldOf, fieldOptions) {
    super(fieldName, fieldOf, TestComplexBaseType, fieldOptions);
    this._fieldBuilder = new core_1.FieldBuilder(this);
    /**
     * Representation of the [[TestComplexBaseType.baseStringProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    this.baseStringProperty = this._fieldBuilder.buildEdmTypeField(
      'BaseStringProperty',
      'Edm.String',
      true
    );
  }
}
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
    return (0, core_1.deserializeComplexTypeV4)(json, TestComplexBaseType);
  }
  TestComplexBaseType.build = build;
})(
  (TestComplexBaseType =
    exports.TestComplexBaseType || (exports.TestComplexBaseType = {}))
);
//# sourceMappingURL=TestComplexBaseType.js.map
