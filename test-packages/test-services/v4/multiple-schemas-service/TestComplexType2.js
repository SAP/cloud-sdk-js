'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestComplexType2 = exports.TestComplexType2Field = void 0;
const internal_1 = require('@sap-cloud-sdk/odata-common/internal');
/**
 * TestComplexType2Field
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
class TestComplexType2Field extends internal_1.ComplexTypeField {
  /**
   * Creates an instance of TestComplexType2Field.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(fieldName, fieldOf, fieldOptions) {
    super(fieldName, fieldOf, TestComplexType2, fieldOptions);
    this._fieldBuilder = new internal_1.FieldBuilder(this);
    /**
     * Representation of the [[TestComplexType2.stringProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    this.stringProperty = this._fieldBuilder.buildEdmTypeField(
      'StringProperty',
      'Edm.String',
      false
    );
  }
}
exports.TestComplexType2Field = TestComplexType2Field;
var TestComplexType2;
(function (TestComplexType2) {
  /**
   * Metadata information on all properties of the `TestComplexType2` complex type.
   */
  TestComplexType2._propertyMetadata = [
    {
      originalName: 'StringProperty',
      name: 'stringProperty',
      type: 'Edm.String',
      isCollection: false
    }
  ];
})(
  (TestComplexType2 =
    exports.TestComplexType2 || (exports.TestComplexType2 = {}))
);
//# sourceMappingURL=TestComplexType2.js.map
