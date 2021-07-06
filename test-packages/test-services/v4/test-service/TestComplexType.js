'use strict';
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      if (typeof b !== 'function' && b !== null)
        throw new TypeError(
          'Class extends value ' + String(b) + ' is not a constructor or null'
        );
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestComplexType =
  exports.TestComplexTypeField =
  exports.createTestComplexType =
    void 0;
var TestNestedComplexType_1 = require('./TestNestedComplexType');
var core_1 = require('@sap-cloud-sdk/core');
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
  /**
   * Creates an instance of TestComplexTypeField.
   *
   * @param fieldName - Actual name of the field as used in the OData request.
   * @param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.
   */
  function TestComplexTypeField(fieldName, fieldOf, isNullable) {
    if (isNullable === void 0) {
      isNullable = false;
    }
    var _this = _super.call(this, fieldName, fieldOf, TestComplexType) || this;
    /**
     * Representation of the [[TestComplexType.stringProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    _this.stringProperty = new core_1.EdmField(
      'StringProperty',
      _this,
      'Edm.String',
      false
    );
    /**
     * Representation of the [[TestComplexType.booleanProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    _this.booleanProperty = new core_1.EdmField(
      'BooleanProperty',
      _this,
      'Edm.Boolean',
      true
    );
    /**
     * Representation of the [[TestComplexType.guidProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    _this.guidProperty = new core_1.EdmField(
      'GuidProperty',
      _this,
      'Edm.Guid',
      true
    );
    /**
     * Representation of the [[TestComplexType.int16Property]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    _this.int16Property = new core_1.OrderableEdmField(
      'Int16Property',
      _this,
      'Edm.Int16',
      true
    );
    /**
     * Representation of the [[TestComplexType.int32Property]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    _this.int32Property = new core_1.OrderableEdmField(
      'Int32Property',
      _this,
      'Edm.Int32',
      true
    );
    /**
     * Representation of the [[TestComplexType.int64Property]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    _this.int64Property = new core_1.OrderableEdmField(
      'Int64Property',
      _this,
      'Edm.Int64',
      true
    );
    /**
     * Representation of the [[TestComplexType.decimalProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    _this.decimalProperty = new core_1.OrderableEdmField(
      'DecimalProperty',
      _this,
      'Edm.Decimal',
      true
    );
    /**
     * Representation of the [[TestComplexType.singleProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    _this.singleProperty = new core_1.OrderableEdmField(
      'SingleProperty',
      _this,
      'Edm.Single',
      true
    );
    /**
     * Representation of the [[TestComplexType.doubleProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    _this.doubleProperty = new core_1.OrderableEdmField(
      'DoubleProperty',
      _this,
      'Edm.Double',
      true
    );
    /**
     * Representation of the [[TestComplexType.floatProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    _this.floatProperty = new core_1.OrderableEdmField(
      'FloatProperty',
      _this,
      'Edm.Float',
      true
    );
    /**
     * Representation of the [[TestComplexType.timeOfDayProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    _this.timeOfDayProperty = new core_1.OrderableEdmField(
      'TimeOfDayProperty',
      _this,
      'Edm.TimeOfDay',
      true
    );
    /**
     * Representation of the [[TestComplexType.dateProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    _this.dateProperty = new core_1.OrderableEdmField(
      'DateProperty',
      _this,
      'Edm.Date',
      true
    );
    /**
     * Representation of the [[TestComplexType.dateTimeOffSetProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    _this.dateTimeOffSetProperty = new core_1.OrderableEdmField(
      'DateTimeOffSetProperty',
      _this,
      'Edm.DateTimeOffset',
      true
    );
    /**
     * Representation of the [[TestComplexType.byteProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    _this.byteProperty = new core_1.OrderableEdmField(
      'ByteProperty',
      _this,
      'Edm.Byte',
      true
    );
    /**
     * Representation of the [[TestComplexType.sByteProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    _this.sByteProperty = new core_1.OrderableEdmField(
      'SByteProperty',
      _this,
      'Edm.SByte',
      true
    );
    /**
     * Representation of the [[TestComplexType.geographyPointProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    _this.geographyPointProperty = new core_1.EdmField(
      'GeographyPointProperty',
      _this,
      'Edm.Any',
      true
    );
    /**
     * Representation of the [[TestComplexType.enumProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    _this.enumProperty = new core_1.EdmField(
      'EnumProperty',
      _this,
      'Edm.Enum',
      true
    );
    /**
     * Representation of the [[TestComplexType.somethingTheSdkDoesNotSupport]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    _this.somethingTheSdkDoesNotSupport = new core_1.EdmField(
      'SomethingTheSDKDoesNotSupport',
      _this,
      'Edm.Any',
      true
    );
    /**
     * Representation of the [[TestComplexType.complexTypeProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    _this.complexTypeProperty =
      new TestNestedComplexType_1.TestNestedComplexTypeField(
        'ComplexTypeProperty',
        _this,
        true
      );
    /**
     * Representation of the [[TestComplexType.collectionStringProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    _this.collectionStringProperty = new core_1.CollectionField(
      'CollectionStringProperty',
      _this,
      'Edm.String',
      true
    );
    /**
     * Representation of the [[TestComplexType.collectionComplexTypeProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    _this.collectionComplexTypeProperty = new core_1.CollectionField(
      'CollectionComplexTypeProperty',
      _this,
      TestNestedComplexType_1.TestNestedComplexType,
      true
    );
    /**
     * Representation of the [[TestComplexType.baseStringProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    _this.baseStringProperty = new core_1.EdmField(
      'BaseStringProperty',
      _this,
      'Edm.String',
      true
    );
    return _this;
  }
  return TestComplexTypeField;
})(core_1.ComplexTypeField);
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
  /**
   * @deprecated Since v1.25.0. Use `deserializeComplexTypeV2` or `deserializeComplexTypeV4` of the `@sap-cloud-sdk/core` package instead.
   */
  function build(json) {
    return core_1.deserializeComplexTypeV4(json, TestComplexType);
  }
  TestComplexType.build = build;
})(
  (TestComplexType = exports.TestComplexType || (exports.TestComplexType = {}))
);
//# sourceMappingURL=TestComplexType.js.map
