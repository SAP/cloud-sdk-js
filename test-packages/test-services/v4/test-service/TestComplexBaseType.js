'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestComplexBaseType = exports.TestComplexBaseTypeField = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
/**
 * TestComplexBaseTypeField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
class TestComplexBaseTypeField extends odata_v4_1.ComplexTypeField {
  /**
   * Creates an instance of TestComplexBaseTypeField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(fieldName, fieldOf, deSerializers, fieldOptions) {
    super(fieldName, fieldOf, deSerializers, TestComplexBaseType, fieldOptions);
    this._fieldBuilder = new odata_v4_1.FieldBuilder(this, this.deSerializers);
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
})(
  (TestComplexBaseType =
    exports.TestComplexBaseType || (exports.TestComplexBaseType = {}))
);
//# sourceMappingURL=TestComplexBaseType.js.map
