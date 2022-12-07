"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyComplexReturnType = exports.MyComplexReturnTypeField = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * MyComplexReturnTypeField
 * @typeParam EntityT - Type of the entity the complex type field belongs to.
 */
class MyComplexReturnTypeField extends odata_v4_1.ComplexTypeField {
    /**
     * Creates an instance of MyComplexReturnTypeField.
     * @param fieldName - Actual name of the field as used in the OData request.
     * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
     */
    constructor(fieldName, fieldOf, deSerializers, fieldOptions) {
        super(fieldName, fieldOf, deSerializers, MyComplexReturnType, fieldOptions);
        this._fieldBuilder = new odata_v4_1.FieldBuilder(this, this.deSerializers);
        /**
         * Representation of the {@link MyComplexReturnType.someMessage} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.someMessage = this._fieldBuilder.buildEdmTypeField('someMessage', 'Edm.String', true);
        /**
         * Representation of the {@link MyComplexReturnType.someId} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.someId = this._fieldBuilder.buildEdmTypeField('someId', 'Edm.Int32', true);
    }
}
exports.MyComplexReturnTypeField = MyComplexReturnTypeField;
var MyComplexReturnType;
(function (MyComplexReturnType) {
    /**
     * Metadata information on all properties of the `MyComplexReturnType` complex type.
     */
    MyComplexReturnType._propertyMetadata = [
        {
            originalName: 'someMessage',
            name: 'someMessage',
            type: 'Edm.String',
            isCollection: false
        },
        {
            originalName: 'someId',
            name: 'someId',
            type: 'Edm.Int32',
            isCollection: false
        }
    ];
})(MyComplexReturnType = exports.MyComplexReturnType || (exports.MyComplexReturnType = {}));
//# sourceMappingURL=MyComplexReturnType.js.map