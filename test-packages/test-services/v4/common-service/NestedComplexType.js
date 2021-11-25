'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.NestedComplexType = exports.NestedComplexTypeField = void 0;
const internal_1 = require('@sap-cloud-sdk/odata-common/internal');
/**
 * NestedComplexTypeField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
class NestedComplexTypeField extends internal_1.ComplexTypeField {
  /**
   * Creates an instance of NestedComplexTypeField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(fieldName, fieldOf, fieldOptions) {
    super(fieldName, fieldOf, NestedComplexType, fieldOptions);
    this._fieldBuilder = new internal_1.FieldBuilder(this);
    /**
     * Representation of the [[NestedComplexType.stringProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    this.stringProperty = this._fieldBuilder.buildEdmTypeField(
      'StringProperty',
      'Edm.String',
      true
    );
  }
}
exports.NestedComplexTypeField = NestedComplexTypeField;
var NestedComplexType;
(function (NestedComplexType) {
  /**
   * Metadata information on all properties of the `NestedComplexType` complex type.
   */
  NestedComplexType._propertyMetadata = [
    {
      originalName: 'StringProperty',
      name: 'stringProperty',
      type: 'Edm.String',
      isCollection: false
    }
  ];
})(
  (NestedComplexType =
    exports.NestedComplexType || (exports.NestedComplexType = {}))
);
//# sourceMappingURL=NestedComplexType.js.map
