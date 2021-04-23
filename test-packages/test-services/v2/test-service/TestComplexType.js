"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestComplexType = exports.TestComplexTypeField = exports.createTestComplexType_1 = void 0;
var TestNestedComplexType_1 = require("./TestNestedComplexType");
var core_1 = require("@sap-cloud-sdk/core");
/**
 * @deprecated Since v1.6.0. Use [[TestComplexType.build]] instead.
 */
function createTestComplexType_1(json) {
    return TestComplexType.build(json);
}
exports.createTestComplexType_1 = createTestComplexType_1;
/**
 * TestComplexTypeField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
var TestComplexTypeField = /** @class */ (function (_super) {
    __extends(TestComplexTypeField, _super);
    /**
     * Creates an instance of TestComplexTypeField.
     *
     * @param fieldName - Actual name of the field as used in the OData request.
     * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
     */
    function TestComplexTypeField(fieldName, fieldOf) {
        var _this = _super.call(this, fieldName, fieldOf, TestComplexType) || this;
        /**
         * Representation of the [[TestComplexType.stringProperty]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.stringProperty = new core_1.ComplexTypeStringPropertyField('StringProperty', _this, 'Edm.String');
        /**
         * Representation of the [[TestComplexType.booleanProperty]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.booleanProperty = new core_1.ComplexTypeBooleanPropertyField('BooleanProperty', _this, 'Edm.Boolean');
        /**
         * Representation of the [[TestComplexType.guidProperty]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.guidProperty = new core_1.ComplexTypeStringPropertyField('GuidProperty', _this, 'Edm.Guid');
        /**
         * Representation of the [[TestComplexType.int16Property]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.int16Property = new core_1.ComplexTypeNumberPropertyField('Int16Property', _this, 'Edm.Int16');
        /**
         * Representation of the [[TestComplexType.int32Property]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.int32Property = new core_1.ComplexTypeNumberPropertyField('Int32Property', _this, 'Edm.Int32');
        /**
         * Representation of the [[TestComplexType.int64Property]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.int64Property = new core_1.ComplexTypeBigNumberPropertyField('Int64Property', _this, 'Edm.Int64');
        /**
         * Representation of the [[TestComplexType.decimalProperty]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.decimalProperty = new core_1.ComplexTypeBigNumberPropertyField('DecimalProperty', _this, 'Edm.Decimal');
        /**
         * Representation of the [[TestComplexType.singleProperty]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.singleProperty = new core_1.ComplexTypeNumberPropertyField('SingleProperty', _this, 'Edm.Single');
        /**
         * Representation of the [[TestComplexType.doubleProperty]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.doubleProperty = new core_1.ComplexTypeNumberPropertyField('DoubleProperty', _this, 'Edm.Double');
        /**
         * Representation of the [[TestComplexType.floatProperty]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.floatProperty = new core_1.ComplexTypeNumberPropertyField('FloatProperty', _this, 'Edm.Float');
        /**
         * Representation of the [[TestComplexType.timeProperty]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.timeProperty = new core_1.ComplexTypeTimePropertyField('TimeProperty', _this, 'Edm.Time');
        /**
         * Representation of the [[TestComplexType.dateTimeProperty]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.dateTimeProperty = new core_1.ComplexTypeDatePropertyField('DateTimeProperty', _this, 'Edm.DateTime');
        /**
         * Representation of the [[TestComplexType.dateTimeOffSetProperty]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.dateTimeOffSetProperty = new core_1.ComplexTypeDatePropertyField('DateTimeOffSetProperty', _this, 'Edm.DateTimeOffset');
        /**
         * Representation of the [[TestComplexType.byteProperty]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.byteProperty = new core_1.ComplexTypeNumberPropertyField('ByteProperty', _this, 'Edm.Byte');
        /**
         * Representation of the [[TestComplexType.sByteProperty]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.sByteProperty = new core_1.ComplexTypeNumberPropertyField('SByteProperty', _this, 'Edm.SByte');
        /**
         * Representation of the [[TestComplexType.somethingTheSdkDoesNotSupport]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.somethingTheSdkDoesNotSupport = new core_1.ComplexTypeAnyPropertyField('SomethingTheSDKDoesNotSupport', _this, 'Edm.Any');
        /**
         * Representation of the [[TestComplexType.complexTypeProperty]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.complexTypeProperty = new TestNestedComplexType_1.TestNestedComplexTypeField('ComplexTypeProperty', _this);
        return _this;
    }
    return TestComplexTypeField;
}(core_1.ComplexTypeField));
exports.TestComplexTypeField = TestComplexTypeField;
var TestComplexType;
(function (TestComplexType) {
    /**
     * Metadata information on all properties of the `TestComplexType` complex type.
     */
    TestComplexType._propertyMetadata = [{
            originalName: 'StringProperty',
            name: 'stringProperty',
            type: 'Edm.String',
            isCollection: false
        }, {
            originalName: 'BooleanProperty',
            name: 'booleanProperty',
            type: 'Edm.Boolean',
            isCollection: false
        }, {
            originalName: 'GuidProperty',
            name: 'guidProperty',
            type: 'Edm.Guid',
            isCollection: false
        }, {
            originalName: 'Int16Property',
            name: 'int16Property',
            type: 'Edm.Int16',
            isCollection: false
        }, {
            originalName: 'Int32Property',
            name: 'int32Property',
            type: 'Edm.Int32',
            isCollection: false
        }, {
            originalName: 'Int64Property',
            name: 'int64Property',
            type: 'Edm.Int64',
            isCollection: false
        }, {
            originalName: 'DecimalProperty',
            name: 'decimalProperty',
            type: 'Edm.Decimal',
            isCollection: false
        }, {
            originalName: 'SingleProperty',
            name: 'singleProperty',
            type: 'Edm.Single',
            isCollection: false
        }, {
            originalName: 'DoubleProperty',
            name: 'doubleProperty',
            type: 'Edm.Double',
            isCollection: false
        }, {
            originalName: 'FloatProperty',
            name: 'floatProperty',
            type: 'Edm.Float',
            isCollection: false
        }, {
            originalName: 'TimeProperty',
            name: 'timeProperty',
            type: 'Edm.Time',
            isCollection: false
        }, {
            originalName: 'DateTimeProperty',
            name: 'dateTimeProperty',
            type: 'Edm.DateTime',
            isCollection: false
        }, {
            originalName: 'DateTimeOffSetProperty',
            name: 'dateTimeOffSetProperty',
            type: 'Edm.DateTimeOffset',
            isCollection: false
        }, {
            originalName: 'ByteProperty',
            name: 'byteProperty',
            type: 'Edm.Byte',
            isCollection: false
        }, {
            originalName: 'SByteProperty',
            name: 'sByteProperty',
            type: 'Edm.SByte',
            isCollection: false
        }, {
            originalName: 'SomethingTheSDKDoesNotSupport',
            name: 'somethingTheSdkDoesNotSupport',
            type: 'Edm.Any',
            isCollection: false
        }, {
            originalName: 'ComplexTypeProperty',
            name: 'complexTypeProperty',
            type: TestNestedComplexType_1.TestNestedComplexType,
            isCollection: false
        }];
    /**
     * @deprecated Since v1.25.0. Use `deserializeComplexTypeV2` or `deserializeComplexTypeV4` of the `@sap-cloud-sdk/core` package instead.
     */
    function build(json) {
        return core_1.deserializeComplexTypeV2(json, TestComplexType);
    }
    TestComplexType.build = build;
})(TestComplexType = exports.TestComplexType || (exports.TestComplexType = {}));
//# sourceMappingURL=TestComplexType.js.map