'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CommonComplexType = exports.CommonComplexTypeField = void 0;
const internal_1 = require('@sap-cloud-sdk/odata-common/internal');
/**
 * CommonComplexTypeField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
class CommonComplexTypeField extends internal_1.ComplexTypeField {
  /**
   * Creates an instance of CommonComplexTypeField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(fieldName, fieldOf, fieldOptions) {
    super(fieldName, fieldOf, CommonComplexType, fieldOptions);
    this._fieldBuilder = new internal_1.FieldBuilder(this);
    /**
     * Representation of the [[CommonComplexType.stringProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    this.stringProperty = this._fieldBuilder.buildEdmTypeField(
      'StringProperty',
      'Edm.String',
      false
    );
    /**
     * Representation of the [[CommonComplexType.booleanProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    this.booleanProperty = this._fieldBuilder.buildEdmTypeField(
      'BooleanProperty',
      'Edm.Boolean',
      true
    );
  }
}
exports.CommonComplexTypeField = CommonComplexTypeField;
var CommonComplexType;
(function (CommonComplexType) {
  /**
   * Metadata information on all properties of the `CommonComplexType` complex type.
   */
  CommonComplexType._propertyMetadata = [
    {
      originalName: 'StringProperty',
      name: 'stringProperty',
      type: 'Edm.String',
      isCollection: false
    },
    {
      originalName: 'BooleanProperty',
      name: 'booleanProperty',
      type: 'Edm.Boolean',
      isCollection: false
    }
  ];
})(
  (CommonComplexType =
    exports.CommonComplexType || (exports.CommonComplexType = {}))
);
//# sourceMappingURL=CommonComplexType.js.map
