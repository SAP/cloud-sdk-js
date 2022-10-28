"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestComplexType1 = exports.TestComplexType1Field = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * TestComplexType1Field
 * @typeParam EntityT - Type of the entity the complex type field belongs to.
 */
class TestComplexType1Field extends odata_v4_1.ComplexTypeField {
    /**
     * Creates an instance of TestComplexType1Field.
     * @param fieldName - Actual name of the field as used in the OData request.
     * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
     */
    constructor(fieldName, fieldOf, deSerializers, fieldOptions) {
        super(fieldName, fieldOf, deSerializers, TestComplexType1, fieldOptions);
        this._fieldBuilder = new odata_v4_1.FieldBuilder(this, this.deSerializers);
        /**
         * Representation of the {@link TestComplexType1.stringProperty} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.stringProperty = this._fieldBuilder.buildEdmTypeField('StringProperty', 'Edm.String', false);
    }
}
exports.TestComplexType1Field = TestComplexType1Field;
var TestComplexType1;
(function (TestComplexType1) {
    /**
     * Metadata information on all properties of the `TestComplexType1` complex type.
     */
    TestComplexType1._propertyMetadata = [{
            originalName: 'StringProperty',
            name: 'stringProperty',
            type: 'Edm.String',
            isCollection: false
        }];
})(TestComplexType1 = exports.TestComplexType1 || (exports.TestComplexType1 = {}));
//# sourceMappingURL=TestComplexType1.js.map