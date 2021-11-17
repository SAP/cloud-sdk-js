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
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const odata_common_1 = require('@sap-cloud-sdk/odata-common/internal');
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
class TestComplexBaseTypeField extends odata_common_1.ComplexTypeField {
  /**
   * Creates an instance of TestComplexBaseTypeField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(fieldName, fieldOf, fieldOptions) {
    super(fieldName, fieldOf, TestComplexBaseType, fieldOptions);
    this._fieldBuilder = new odata_common_1.FieldBuilder(this);
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
   * @deprecated Since v1.25.0. Use `deserializeComplexType` of the `@sap-cloud-sdk/odata-v2` or `@sap-cloud-sdk/odata-v4` package instead.
   */
  function build(json) {
    return (0, odata_v4_1.deserializeComplexType)(json, TestComplexBaseType);
  }
  TestComplexBaseType.build = build;
})(
  (TestComplexBaseType =
    exports.TestComplexBaseType || (exports.TestComplexBaseType = {}))
);
//# sourceMappingURL=TestComplexBaseType.js.map
