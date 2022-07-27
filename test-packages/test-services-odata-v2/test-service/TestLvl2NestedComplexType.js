'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestLvl2NestedComplexType = exports.TestLvl2NestedComplexTypeField =
  void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require('@sap-cloud-sdk/odata-v2');
/**
 * TestLvl2NestedComplexTypeField
 * @typeParam EntityT - Type of the entity the complex type field belongs to.
 */
class TestLvl2NestedComplexTypeField extends odata_v2_1.ComplexTypeField {
  /**
   * Creates an instance of TestLvl2NestedComplexTypeField.
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  constructor(fieldName, fieldOf, deSerializers, fieldOptions) {
    super(
      fieldName,
      fieldOf,
      deSerializers,
      TestLvl2NestedComplexType,
      fieldOptions
    );
    this._fieldBuilder = new odata_v2_1.FieldBuilder(this, this.deSerializers);
    /**
     * Representation of the {@link TestLvl2NestedComplexType.stringProperty} property for query construction.
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
