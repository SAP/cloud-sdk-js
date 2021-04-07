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
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.Testentity_1 = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var Testentity_1RequestBuilder_1 = require('./Testentity_1RequestBuilder');
var TestComplexType_1 = require('./TestComplexType');
var core_1 = require('@sap-cloud-sdk/core');
/**
 * This class represents the entity "A_Testentity" of service "API_TEST_SRV".
 */
var Testentity_1 = /** @class */ (function (_super) {
  __extends(Testentity_1, _super);
  function Testentity_1() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns an entity builder to construct instances of `Testentity_1`.
   * @returns A builder that constructs instances of entity type `Testentity_1`.
   */
  Testentity_1.builder = function () {
    return core_1.EntityV2.entityBuilder(Testentity_1);
  };
  /**
   * Returns a request builder to construct requests for operations on the `Testentity_1` entity type.
   * @returns A `Testentity_1` request builder.
   */
  Testentity_1.requestBuilder = function () {
    return new Testentity_1RequestBuilder_1.Testentity_1RequestBuilder();
  };
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `Testentity_1`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `Testentity_1`.
   */
  Testentity_1.customField = function (fieldName) {
    return core_1.EntityV2.customFieldSelector(fieldName, Testentity_1);
  };
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  Testentity_1.prototype.toJSON = function () {
    return __assign(__assign({}, this), this._customFields);
  };
  /**
   * Technical entity name for Testentity_1.
   */
  Testentity_1._entityName = 'A_Testentity';
  /**
   * Default url path for the according service.
   */
  Testentity_1._defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  return Testentity_1;
})(core_1.EntityV2);
exports.Testentity_1 = Testentity_1;
var TestEntityMultiLink_1 = require('./TestEntityMultiLink');
var TestEntityOtherMultiLink_1 = require('./TestEntityOtherMultiLink');
var TestEntitySingleLink_1 = require('./TestEntitySingleLink');
(function (Testentity_1) {
  /**
   * Static representation of the [[keyPropertyGuid]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  Testentity_1.KEY_PROPERTY_GUID = new core_1.StringField(
    'KeyPropertyGuid',
    Testentity_1,
    'Edm.Guid'
  );
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  Testentity_1.KEY_PROPERTY_STRING = new core_1.StringField(
    'KeyPropertyString',
    Testentity_1,
    'Edm.String'
  );
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  Testentity_1.STRING_PROPERTY = new core_1.StringField(
    'StringProperty',
    Testentity_1,
    'Edm.String'
  );
  /**
   * Static representation of the [[booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  Testentity_1.BOOLEAN_PROPERTY = new core_1.BooleanField(
    'BooleanProperty',
    Testentity_1,
    'Edm.Boolean'
  );
  /**
   * Static representation of the [[guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  Testentity_1.GUID_PROPERTY = new core_1.StringField(
    'GuidProperty',
    Testentity_1,
    'Edm.Guid'
  );
  /**
   * Static representation of the [[int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  Testentity_1.INT_16_PROPERTY = new core_1.NumberField(
    'Int16Property',
    Testentity_1,
    'Edm.Int16'
  );
  /**
   * Static representation of the [[int32Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  Testentity_1.INT_32_PROPERTY = new core_1.NumberField(
    'Int32Property',
    Testentity_1,
    'Edm.Int32'
  );
  /**
   * Static representation of the [[int64Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  Testentity_1.INT_64_PROPERTY = new core_1.BigNumberField(
    'Int64Property',
    Testentity_1,
    'Edm.Int64'
  );
  /**
   * Static representation of the [[decimalProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  Testentity_1.DECIMAL_PROPERTY = new core_1.BigNumberField(
    'DecimalProperty',
    Testentity_1,
    'Edm.Decimal'
  );
  /**
   * Static representation of the [[singleProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  Testentity_1.SINGLE_PROPERTY = new core_1.NumberField(
    'SingleProperty',
    Testentity_1,
    'Edm.Single'
  );
  /**
   * Static representation of the [[doubleProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  Testentity_1.DOUBLE_PROPERTY = new core_1.NumberField(
    'DoubleProperty',
    Testentity_1,
    'Edm.Double'
  );
  /**
   * Static representation of the [[floatProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  Testentity_1.FLOAT_PROPERTY = new core_1.NumberField(
    'FloatProperty',
    Testentity_1,
    'Edm.Float'
  );
  /**
   * Static representation of the [[timeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  Testentity_1.TIME_PROPERTY = new core_1.TimeField(
    'TimeProperty',
    Testentity_1,
    'Edm.Time'
  );
  /**
   * Static representation of the [[dateTimeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  Testentity_1.DATE_TIME_PROPERTY = new core_1.DateField(
    'DateTimeProperty',
    Testentity_1,
    'Edm.DateTime'
  );
  /**
   * Static representation of the [[dateTimeOffSetProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  Testentity_1.DATE_TIME_OFF_SET_PROPERTY = new core_1.DateField(
    'DateTimeOffSetProperty',
    Testentity_1,
    'Edm.DateTimeOffset'
  );
  /**
   * Static representation of the [[byteProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  Testentity_1.BYTE_PROPERTY = new core_1.NumberField(
    'ByteProperty',
    Testentity_1,
    'Edm.Byte'
  );
  /**
   * Static representation of the [[sByteProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  Testentity_1.S_BYTE_PROPERTY = new core_1.NumberField(
    'SByteProperty',
    Testentity_1,
    'Edm.SByte'
  );
  /**
   * Static representation of the [[somethingTheSdkDoesNotSupport]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  Testentity_1.SOMETHING_THE_SDK_DOES_NOT_SUPPORT = new core_1.AnyField(
    'SomethingTheSDKDoesNotSupport',
    Testentity_1,
    'Edm.Any'
  );
  /**
   * Static representation of the [[complexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  Testentity_1.COMPLEX_TYPE_PROPERTY = new TestComplexType_1.TestComplexTypeField(
    'ComplexTypeProperty',
    Testentity_1
  );
  /**
   * Static representation of the one-to-many navigation property [[toMultiLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  Testentity_1.TO_MULTI_LINK = new core_1.Link(
    'to_MultiLink',
    Testentity_1,
    TestEntityMultiLink_1.TestEntityMultiLink
  );
  /**
   * Static representation of the one-to-many navigation property [[toOtherMultiLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  Testentity_1.TO_OTHER_MULTI_LINK = new core_1.Link(
    'to_OtherMultiLink',
    Testentity_1,
    TestEntityOtherMultiLink_1.TestEntityOtherMultiLink
  );
  /**
   * Static representation of the one-to-one navigation property [[toSingleLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  Testentity_1.TO_SINGLE_LINK = new core_1.OneToOneLink(
    'to_SingleLink',
    Testentity_1,
    TestEntitySingleLink_1.TestEntitySingleLink
  );
  /**
   * All fields of the Testentity_1 entity.
   */
  Testentity_1._allFields = [
    Testentity_1.KEY_PROPERTY_GUID,
    Testentity_1.KEY_PROPERTY_STRING,
    Testentity_1.STRING_PROPERTY,
    Testentity_1.BOOLEAN_PROPERTY,
    Testentity_1.GUID_PROPERTY,
    Testentity_1.INT_16_PROPERTY,
    Testentity_1.INT_32_PROPERTY,
    Testentity_1.INT_64_PROPERTY,
    Testentity_1.DECIMAL_PROPERTY,
    Testentity_1.SINGLE_PROPERTY,
    Testentity_1.DOUBLE_PROPERTY,
    Testentity_1.FLOAT_PROPERTY,
    Testentity_1.TIME_PROPERTY,
    Testentity_1.DATE_TIME_PROPERTY,
    Testentity_1.DATE_TIME_OFF_SET_PROPERTY,
    Testentity_1.BYTE_PROPERTY,
    Testentity_1.S_BYTE_PROPERTY,
    Testentity_1.SOMETHING_THE_SDK_DOES_NOT_SUPPORT,
    Testentity_1.COMPLEX_TYPE_PROPERTY,
    Testentity_1.TO_MULTI_LINK,
    Testentity_1.TO_OTHER_MULTI_LINK,
    Testentity_1.TO_SINGLE_LINK
  ];
  /**
   * All fields selector.
   */
  Testentity_1.ALL_FIELDS = new core_1.AllFields('*', Testentity_1);
  /**
   * All key fields of the Testentity_1 entity.
   */
  Testentity_1._keyFields = [
    Testentity_1.KEY_PROPERTY_GUID,
    Testentity_1.KEY_PROPERTY_STRING
  ];
  /**
   * Mapping of all key field names to the respective static field property Testentity_1.
   */
  Testentity_1._keys = Testentity_1._keyFields.reduce(function (acc, field) {
    acc[field._fieldName] = field;
    return acc;
  }, {});
})((Testentity_1 = exports.Testentity_1 || (exports.Testentity_1 = {})));
exports.Testentity_1 = Testentity_1;
//# sourceMappingURL=Testentity_1.js.map
