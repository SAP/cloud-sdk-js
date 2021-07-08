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
exports.TestEntityLvl2MultiLink = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var TestEntityLvl2MultiLinkRequestBuilder_1 = require('./TestEntityLvl2MultiLinkRequestBuilder');
var core_1 = require('@sap-cloud-sdk/core');
/**
 * This class represents the entity "A_TestEntityLvl2MultiLink" of service "API_TEST_SRV".
 */
var TestEntityLvl2MultiLink = /** @class */ (function (_super) {
  __extends(TestEntityLvl2MultiLink, _super);
  function TestEntityLvl2MultiLink() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns an entity builder to construct instances of `TestEntityLvl2MultiLink`.
   * @returns A builder that constructs instances of entity type `TestEntityLvl2MultiLink`.
   */
  TestEntityLvl2MultiLink.builder = function () {
    return core_1.EntityV2.entityBuilder(TestEntityLvl2MultiLink);
  };
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityLvl2MultiLink` entity type.
   * @returns A `TestEntityLvl2MultiLink` request builder.
   */
  TestEntityLvl2MultiLink.requestBuilder = function () {
    return new TestEntityLvl2MultiLinkRequestBuilder_1.TestEntityLvl2MultiLinkRequestBuilder();
  };
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityLvl2MultiLink`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityLvl2MultiLink`.
   */
  TestEntityLvl2MultiLink.customField = function (fieldName) {
    return core_1.EntityV2.customFieldSelector(
      fieldName,
      TestEntityLvl2MultiLink
    );
  };
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  TestEntityLvl2MultiLink.prototype.toJSON = function () {
    return __assign(__assign({}, this), this._customFields);
  };
  /**
   * Technical entity name for TestEntityLvl2MultiLink.
   */
  TestEntityLvl2MultiLink._entityName = 'A_TestEntityLvl2MultiLink';
  /**
   * Default url path for the according service.
   */
  TestEntityLvl2MultiLink._defaultServicePath =
    '/sap/opu/odata/sap/API_TEST_SRV';
  return TestEntityLvl2MultiLink;
})(core_1.EntityV2);
exports.TestEntityLvl2MultiLink = TestEntityLvl2MultiLink;
(function (TestEntityLvl2MultiLink) {
  var _fieldBuilder = new core_1.FieldBuilder(TestEntityLvl2MultiLink);
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityLvl2MultiLink.KEY_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'KeyProperty',
    'Edm.String',
    false
  );
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityLvl2MultiLink.STRING_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'StringProperty',
    'Edm.String',
    true
  );
  /**
   * Static representation of the [[booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityLvl2MultiLink.BOOLEAN_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'BooleanProperty',
    'Edm.Boolean',
    true
  );
  /**
   * Static representation of the [[guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityLvl2MultiLink.GUID_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'GuidProperty',
    'Edm.Guid',
    true
  );
  /**
   * Static representation of the [[int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityLvl2MultiLink.INT_16_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'Int16Property',
    'Edm.Int16',
    true
  );
  /**
   * All fields of the TestEntityLvl2MultiLink entity.
   */
  TestEntityLvl2MultiLink._allFields = [
    TestEntityLvl2MultiLink.KEY_PROPERTY,
    TestEntityLvl2MultiLink.STRING_PROPERTY,
    TestEntityLvl2MultiLink.BOOLEAN_PROPERTY,
    TestEntityLvl2MultiLink.GUID_PROPERTY,
    TestEntityLvl2MultiLink.INT_16_PROPERTY
  ];
  /**
   * All fields selector.
   */
  TestEntityLvl2MultiLink.ALL_FIELDS = new core_1.AllFields(
    '*',
    TestEntityLvl2MultiLink
  );
  /**
   * All key fields of the TestEntityLvl2MultiLink entity.
   */
  TestEntityLvl2MultiLink._keyFields = [TestEntityLvl2MultiLink.KEY_PROPERTY];
  /**
   * Mapping of all key field names to the respective static field property TestEntityLvl2MultiLink.
   */
  TestEntityLvl2MultiLink._keys = TestEntityLvl2MultiLink._keyFields.reduce(
    function (acc, field) {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
})(
  (TestEntityLvl2MultiLink =
    exports.TestEntityLvl2MultiLink || (exports.TestEntityLvl2MultiLink = {}))
);
exports.TestEntityLvl2MultiLink = TestEntityLvl2MultiLink;
//# sourceMappingURL=TestEntityLvl2MultiLink.js.map
