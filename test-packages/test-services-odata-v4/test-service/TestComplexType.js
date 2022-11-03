"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestComplexType = exports.TestComplexTypeField = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestNestedComplexType_1 = require("./TestNestedComplexType");
const TestEnumType_1 = require("./TestEnumType");
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * TestComplexTypeField
 * @typeParam EntityT - Type of the entity the complex type field belongs to.
 */
class TestComplexTypeField extends odata_v4_1.ComplexTypeField {
    /**
     * Creates an instance of TestComplexTypeField.
     * @param fieldName - Actual name of the field as used in the OData request.
     * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
     */
    constructor(fieldName, fieldOf, deSerializers, fieldOptions) {
        super(fieldName, fieldOf, deSerializers, TestComplexType, fieldOptions);
        this._fieldBuilder = new odata_v4_1.FieldBuilder(this, this.deSerializers);
        /**
         * Representation of the {@link TestComplexType.stringProperty} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.stringProperty = this._fieldBuilder.buildEdmTypeField('StringProperty', 'Edm.String', false);
        /**
         * Representation of the {@link TestComplexType.booleanProperty} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.booleanProperty = this._fieldBuilder.buildEdmTypeField('BooleanProperty', 'Edm.Boolean', true);
        /**
         * Representation of the {@link TestComplexType.guidProperty} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.guidProperty = this._fieldBuilder.buildEdmTypeField('GuidProperty', 'Edm.Guid', true);
        /**
         * Representation of the {@link TestComplexType.int16Property} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.int16Property = this._fieldBuilder.buildEdmTypeField('Int16Property', 'Edm.Int16', true);
        /**
         * Representation of the {@link TestComplexType.int32Property} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.int32Property = this._fieldBuilder.buildEdmTypeField('Int32Property', 'Edm.Int32', true);
        /**
         * Representation of the {@link TestComplexType.int64Property} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.int64Property = this._fieldBuilder.buildEdmTypeField('Int64Property', 'Edm.Int64', true);
        /**
         * Representation of the {@link TestComplexType.decimalProperty} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.decimalProperty = this._fieldBuilder.buildEdmTypeField('DecimalProperty', 'Edm.Decimal', true);
        /**
         * Representation of the {@link TestComplexType.singleProperty} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.singleProperty = this._fieldBuilder.buildEdmTypeField('SingleProperty', 'Edm.Single', true);
        /**
         * Representation of the {@link TestComplexType.doubleProperty} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.doubleProperty = this._fieldBuilder.buildEdmTypeField('DoubleProperty', 'Edm.Double', true);
        /**
         * Representation of the {@link TestComplexType.floatProperty} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.floatProperty = this._fieldBuilder.buildEdmTypeField('FloatProperty', 'Edm.Float', true);
        /**
         * Representation of the {@link TestComplexType.timeOfDayProperty} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.timeOfDayProperty = this._fieldBuilder.buildEdmTypeField('TimeOfDayProperty', 'Edm.TimeOfDay', true);
        /**
         * Representation of the {@link TestComplexType.dateProperty} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.dateProperty = this._fieldBuilder.buildEdmTypeField('DateProperty', 'Edm.Date', true);
        /**
         * Representation of the {@link TestComplexType.dateTimeOffSetProperty} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.dateTimeOffSetProperty = this._fieldBuilder.buildEdmTypeField('DateTimeOffSetProperty', 'Edm.DateTimeOffset', true);
        /**
         * Representation of the {@link TestComplexType.byteProperty} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.byteProperty = this._fieldBuilder.buildEdmTypeField('ByteProperty', 'Edm.Byte', true);
        /**
         * Representation of the {@link TestComplexType.sByteProperty} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.sByteProperty = this._fieldBuilder.buildEdmTypeField('SByteProperty', 'Edm.SByte', true);
        /**
         * Representation of the {@link TestComplexType.geographyPointProperty} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.geographyPointProperty = this._fieldBuilder.buildEdmTypeField('GeographyPointProperty', 'Edm.Any', true);
        /**
         * Representation of the {@link TestComplexType.enumProperty} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.enumProperty = this._fieldBuilder.buildEnumField('EnumProperty', TestEnumType_1.TestEnumType, true);
        /**
         * Representation of the {@link TestComplexType.somethingTheSdkDoesNotSupport} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.somethingTheSdkDoesNotSupport = this._fieldBuilder.buildEdmTypeField('SomethingTheSDKDoesNotSupport', 'Edm.Any', true);
        /**
         * Representation of the {@link TestComplexType.complexTypeProperty} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.complexTypeProperty = this._fieldBuilder.buildComplexTypeField('ComplexTypeProperty', TestNestedComplexType_1.TestNestedComplexTypeField, true);
        /**
         * Representation of the {@link TestComplexType.collectionStringProperty} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.collectionStringProperty = this._fieldBuilder.buildCollectionField('CollectionStringProperty', 'Edm.String', true);
        /**
         * Representation of the {@link TestComplexType.collectionEnumProperty} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.collectionEnumProperty = this._fieldBuilder.buildCollectionField('CollectionEnumProperty', TestEnumType_1.TestEnumType, true);
        /**
         * Representation of the {@link TestComplexType.collectionComplexTypeProperty} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.collectionComplexTypeProperty = this._fieldBuilder.buildCollectionField('CollectionComplexTypeProperty', TestNestedComplexType_1.TestNestedComplexType, true);
        /**
         * Representation of the {@link TestComplexType.baseStringProperty} property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        this.baseStringProperty = this._fieldBuilder.buildEdmTypeField('BaseStringProperty', 'Edm.String', true);
    }
}
exports.TestComplexTypeField = TestComplexTypeField;
var TestComplexType;
(function (TestComplexType) {
    /**
     * Metadata information on all properties of the `TestComplexType` complex type.
     */
    TestComplexType._propertyMetadata = [
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
        },
        {
            originalName: 'GuidProperty',
            name: 'guidProperty',
            type: 'Edm.Guid',
            isCollection: false
        },
        {
            originalName: 'Int16Property',
            name: 'int16Property',
            type: 'Edm.Int16',
            isCollection: false
        },
        {
            originalName: 'Int32Property',
            name: 'int32Property',
            type: 'Edm.Int32',
            isCollection: false
        },
        {
            originalName: 'Int64Property',
            name: 'int64Property',
            type: 'Edm.Int64',
            isCollection: false
        },
        {
            originalName: 'DecimalProperty',
            name: 'decimalProperty',
            type: 'Edm.Decimal',
            isCollection: false
        },
        {
            originalName: 'SingleProperty',
            name: 'singleProperty',
            type: 'Edm.Single',
            isCollection: false
        },
        {
            originalName: 'DoubleProperty',
            name: 'doubleProperty',
            type: 'Edm.Double',
            isCollection: false
        },
        {
            originalName: 'FloatProperty',
            name: 'floatProperty',
            type: 'Edm.Float',
            isCollection: false
        },
        {
            originalName: 'TimeOfDayProperty',
            name: 'timeOfDayProperty',
            type: 'Edm.TimeOfDay',
            isCollection: false
        },
        {
            originalName: 'DateProperty',
            name: 'dateProperty',
            type: 'Edm.Date',
            isCollection: false
        },
        {
            originalName: 'DateTimeOffSetProperty',
            name: 'dateTimeOffSetProperty',
            type: 'Edm.DateTimeOffset',
            isCollection: false
        },
        {
            originalName: 'ByteProperty',
            name: 'byteProperty',
            type: 'Edm.Byte',
            isCollection: false
        },
        {
            originalName: 'SByteProperty',
            name: 'sByteProperty',
            type: 'Edm.SByte',
            isCollection: false
        },
        {
            originalName: 'GeographyPointProperty',
            name: 'geographyPointProperty',
            type: 'Edm.Any',
            isCollection: false
        },
        {
            originalName: 'EnumProperty',
            name: 'enumProperty',
            type: 'Edm.Enum',
            isCollection: false
        },
        {
            originalName: 'SomethingTheSDKDoesNotSupport',
            name: 'somethingTheSdkDoesNotSupport',
            type: 'Edm.Any',
            isCollection: false
        },
        {
            originalName: 'ComplexTypeProperty',
            name: 'complexTypeProperty',
            type: TestNestedComplexType_1.TestNestedComplexType,
            isCollection: false
        },
        {
            originalName: 'CollectionStringProperty',
            name: 'collectionStringProperty',
            type: 'Edm.String',
            isCollection: true
        },
        {
            originalName: 'CollectionEnumProperty',
            name: 'collectionEnumProperty',
            type: 'Edm.Enum',
            isCollection: true
        },
        {
            originalName: 'CollectionComplexTypeProperty',
            name: 'collectionComplexTypeProperty',
            type: TestNestedComplexType_1.TestNestedComplexType,
            isCollection: true
        },
        {
            originalName: 'BaseStringProperty',
            name: 'baseStringProperty',
            type: 'Edm.String',
            isCollection: false
        }
    ];
})(TestComplexType = exports.TestComplexType || (exports.TestComplexType = {}));
//# sourceMappingURL=TestComplexType.js.map