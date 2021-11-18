'use strict';
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
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const internal_1 = require('@sap-cloud-sdk/odata-common/internal');
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
class TestComplexType1Field extends internal_1.ComplexTypeField {
  /**
   * Creates an instance of TestComplexType1Field.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(fieldName, fieldOf, fieldOptions) {
    super(fieldName, fieldOf, TestComplexType1, fieldOptions);
    this._fieldBuilder = new internal_1.FieldBuilder(this);
    /**
     * Representation of the [[TestComplexType1.stringProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    this.stringProperty = this._fieldBuilder.buildEdmTypeField(
      'StringProperty',
      'Edm.String',
      false
    );
  }
}
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
   * @deprecated Since v1.25.0. Use `deserializeComplexType` of the `@sap-cloud-sdk/odata-v2` or `@sap-cloud-sdk/odata-v4` package instead.
   */
  function build(json) {
    return (0, odata_v4_1.deserializeComplexType)(json, TestComplexType1);
  }
  TestComplexType1.build = build;
})(
  (TestComplexType1 =
    exports.TestComplexType1 || (exports.TestComplexType1 = {}))
);
//# sourceMappingURL=TestComplexType1.js.map
