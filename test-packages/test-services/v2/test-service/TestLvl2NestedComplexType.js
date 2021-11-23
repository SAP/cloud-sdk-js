'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestLvl2NestedComplexType = exports.TestLvl2NestedComplexTypeField =
  void 0;
const internal_1 = require('@sap-cloud-sdk/odata-common/internal');
/**
 * TestLvl2NestedComplexTypeField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
class TestLvl2NestedComplexTypeField extends internal_1.ComplexTypeField {
  /**
   * Creates an instance of TestLvl2NestedComplexTypeField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(fieldName, fieldOf, fieldOptions) {
    super(fieldName, fieldOf, TestLvl2NestedComplexType, fieldOptions);
    this._fieldBuilder = new internal_1.FieldBuilder(this);
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
})(
  (TestLvl2NestedComplexType =
    exports.TestLvl2NestedComplexType ||
    (exports.TestLvl2NestedComplexType = {}))
);
//# sourceMappingURL=TestLvl2NestedComplexType.js.map
