"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var TestNestedComplexType_1 = require("./TestNestedComplexType");
var v4_1 = require("@sap-cloud-sdk/core/v4");
/**
 * @deprecated Since v1.6.0. Use [[TestComplexType.build]] instead.
 */
function createTestComplexType(json) {
    return TestComplexType.build(json);
}
exports.createTestComplexType = createTestComplexType;
/**
 * TestComplexTypeField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
var TestComplexTypeField = /** @class */ (function (_super) {
    __extends(TestComplexTypeField, _super);
    function TestComplexTypeField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Representation of the [[TestComplexType.stringProperty]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.stringProperty = new v4_1.ComplexTypeStringPropertyField('StringProperty', _this, 'Edm.String');
        /**
         * Representation of the [[TestComplexType.booleanProperty]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.booleanProperty = new v4_1.ComplexTypeBooleanPropertyField('BooleanProperty', _this, 'Edm.Boolean');
        /**
         * Representation of the [[TestComplexType.guidProperty]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.guidProperty = new v4_1.ComplexTypeStringPropertyField('GuidProperty', _this, 'Edm.Guid');
        /**
         * Representation of the [[TestComplexType.int16Property]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.int16Property = new v4_1.ComplexTypeNumberPropertyField('Int16Property', _this, 'Edm.Int16');
        /**
         * Representation of the [[TestComplexType.int32Property]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.int32Property = new v4_1.ComplexTypeNumberPropertyField('Int32Property', _this, 'Edm.Int32');
        /**
         * Representation of the [[TestComplexType.int64Property]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.int64Property = new v4_1.ComplexTypeBigNumberPropertyField('Int64Property', _this, 'Edm.Int64');
        /**
         * Representation of the [[TestComplexType.decimalProperty]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.decimalProperty = new v4_1.ComplexTypeBigNumberPropertyField('DecimalProperty', _this, 'Edm.Decimal');
        /**
         * Representation of the [[TestComplexType.singleProperty]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.singleProperty = new v4_1.ComplexTypeNumberPropertyField('SingleProperty', _this, 'Edm.Single');
        /**
         * Representation of the [[TestComplexType.doubleProperty]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.doubleProperty = new v4_1.ComplexTypeNumberPropertyField('DoubleProperty', _this, 'Edm.Double');
        /**
         * Representation of the [[TestComplexType.floatProperty]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.floatProperty = new v4_1.ComplexTypeNumberPropertyField('FloatProperty', _this, 'Edm.Float');
        /**
         * Representation of the [[TestComplexType.timeProperty]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.timeProperty = new v4_1.ComplexTypeTimePropertyField('TimeProperty', _this, 'Edm.Time');
        /**
         * Representation of the [[TestComplexType.dateTimeProperty]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.dateTimeProperty = new v4_1.ComplexTypeDatePropertyField('DateTimeProperty', _this, 'Edm.DateTime');
        /**
         * Representation of the [[TestComplexType.dateTimeOffSetProperty]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.dateTimeOffSetProperty = new v4_1.ComplexTypeDatePropertyField('DateTimeOffSetProperty', _this, 'Edm.DateTimeOffset');
        /**
         * Representation of the [[TestComplexType.byteProperty]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.byteProperty = new v4_1.ComplexTypeNumberPropertyField('ByteProperty', _this, 'Edm.Byte');
        /**
         * Representation of the [[TestComplexType.sByteProperty]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.sByteProperty = new v4_1.ComplexTypeNumberPropertyField('SByteProperty', _this, 'Edm.SByte');
        /**
         * Representation of the [[TestComplexType.complexTypeProperty]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.complexTypeProperty = new TestNestedComplexType_1.TestNestedComplexTypeField('ComplexTypeProperty', _this);
        /**
         * Representation of the [[TestComplexType.baseStringProperty]] property for query construction.
         * Use to reference this property in query operations such as 'filter' in the fluent request API.
         */
        _this.baseStringProperty = new v4_1.ComplexTypeStringPropertyField('BaseStringProperty', _this, 'Edm.String');
        return _this;
    }
    return TestComplexTypeField;
}(v4_1.ComplexTypeField));
exports.TestComplexTypeField = TestComplexTypeField;
var TestComplexType;
(function (TestComplexType) {
    function build(json) {
        return v4_1.createComplexType(json, {
            StringProperty: function (stringProperty) { return ({ stringProperty: v4_1.edmToTs(stringProperty, 'Edm.String') }); },
            BooleanProperty: function (booleanProperty) { return ({ booleanProperty: v4_1.edmToTs(booleanProperty, 'Edm.Boolean') }); },
            GuidProperty: function (guidProperty) { return ({ guidProperty: v4_1.edmToTs(guidProperty, 'Edm.Guid') }); },
            Int16Property: function (int16Property) { return ({ int16Property: v4_1.edmToTs(int16Property, 'Edm.Int16') }); },
            Int32Property: function (int32Property) { return ({ int32Property: v4_1.edmToTs(int32Property, 'Edm.Int32') }); },
            Int64Property: function (int64Property) { return ({ int64Property: v4_1.edmToTs(int64Property, 'Edm.Int64') }); },
            DecimalProperty: function (decimalProperty) { return ({ decimalProperty: v4_1.edmToTs(decimalProperty, 'Edm.Decimal') }); },
            SingleProperty: function (singleProperty) { return ({ singleProperty: v4_1.edmToTs(singleProperty, 'Edm.Single') }); },
            DoubleProperty: function (doubleProperty) { return ({ doubleProperty: v4_1.edmToTs(doubleProperty, 'Edm.Double') }); },
            FloatProperty: function (floatProperty) { return ({ floatProperty: v4_1.edmToTs(floatProperty, 'Edm.Float') }); },
            TimeProperty: function (timeProperty) { return ({ timeProperty: v4_1.edmToTs(timeProperty, 'Edm.Time') }); },
            DateTimeProperty: function (dateTimeProperty) { return ({ dateTimeProperty: v4_1.edmToTs(dateTimeProperty, 'Edm.DateTime') }); },
            DateTimeOffSetProperty: function (dateTimeOffSetProperty) { return ({ dateTimeOffSetProperty: v4_1.edmToTs(dateTimeOffSetProperty, 'Edm.DateTimeOffset') }); },
            ByteProperty: function (byteProperty) { return ({ byteProperty: v4_1.edmToTs(byteProperty, 'Edm.Byte') }); },
            SByteProperty: function (sByteProperty) { return ({ sByteProperty: v4_1.edmToTs(sByteProperty, 'Edm.SByte') }); },
            ComplexTypeProperty: function (complexTypeProperty) { return ({ complexTypeProperty: TestNestedComplexType_1.TestNestedComplexType.build(complexTypeProperty) }); },
            BaseStringProperty: function (baseStringProperty) { return ({ baseStringProperty: v4_1.edmToTs(baseStringProperty, 'Edm.String') }); }
        });
    }
    TestComplexType.build = build;
})(TestComplexType = exports.TestComplexType || (exports.TestComplexType = {}));
//# sourceMappingURL=TestComplexType.js.map