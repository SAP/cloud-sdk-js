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
exports.TestEntityLvl3MultiLink = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var TestEntityLvl3MultiLinkRequestBuilder_1 = require('./TestEntityLvl3MultiLinkRequestBuilder');
var core_1 = require('@sap-cloud-sdk/core');
/**
 * This class represents the entity "A_TestEntityLvl3MultiLink" of service "API_TEST_SRV".
 */
var TestEntityLvl3MultiLink = /** @class */ (function (_super) {
  __extends(TestEntityLvl3MultiLink, _super);
  function TestEntityLvl3MultiLink() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns an entity builder to construct instances of `TestEntityLvl3MultiLink`.
   * @returns A builder that constructs instances of entity type `TestEntityLvl3MultiLink`.
   */
  TestEntityLvl3MultiLink.builder = function () {
    return core_1.EntityV4.entityBuilder(TestEntityLvl3MultiLink);
  };
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityLvl3MultiLink` entity type.
   * @returns A `TestEntityLvl3MultiLink` request builder.
   */
  TestEntityLvl3MultiLink.requestBuilder = function () {
    return new TestEntityLvl3MultiLinkRequestBuilder_1.TestEntityLvl3MultiLinkRequestBuilder();
  };
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityLvl3MultiLink`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityLvl3MultiLink`.
   */
  TestEntityLvl3MultiLink.customField = function (fieldName) {
    return core_1.EntityV4.customFieldSelector(
      fieldName,
      TestEntityLvl3MultiLink
    );
  };
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  TestEntityLvl3MultiLink.prototype.toJSON = function () {
    return __assign(__assign({}, this), this._customFields);
  };
  /**
   * Technical entity name for TestEntityLvl3MultiLink.
   */
  TestEntityLvl3MultiLink._entityName = 'A_TestEntityLvl3MultiLink';
  /**
   * Default url path for the according service.
   */
  TestEntityLvl3MultiLink._defaultServicePath =
    '/sap/opu/odata/sap/API_TEST_SRV';
  return TestEntityLvl3MultiLink;
})(core_1.EntityV4);
exports.TestEntityLvl3MultiLink = TestEntityLvl3MultiLink;
(function (TestEntityLvl3MultiLink) {
  var _fieldBuilder = new core_1.FieldBuilder(TestEntityLvl3MultiLink);
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityLvl3MultiLink.STRING_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'StringProperty',
    'Edm.String',
    true
  );
  /**
   * Static representation of the [[guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityLvl3MultiLink.GUID_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'GuidProperty',
    'Edm.Guid',
    true
  );
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityLvl3MultiLink.KEY_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'KeyProperty',
    'Edm.String',
    false
  );
  /**
   * All fields of the TestEntityLvl3MultiLink entity.
   */
  TestEntityLvl3MultiLink._allFields = [
    TestEntityLvl3MultiLink.STRING_PROPERTY,
    TestEntityLvl3MultiLink.GUID_PROPERTY,
    TestEntityLvl3MultiLink.KEY_PROPERTY
  ];
  /**
   * All fields selector.
   */
  TestEntityLvl3MultiLink.ALL_FIELDS = new core_1.AllFields(
    '*',
    TestEntityLvl3MultiLink
  );
  /**
   * All key fields of the TestEntityLvl3MultiLink entity.
   */
  TestEntityLvl3MultiLink._keyFields = [TestEntityLvl3MultiLink.KEY_PROPERTY];
  /**
   * Mapping of all key field names to the respective static field property TestEntityLvl3MultiLink.
   */
  TestEntityLvl3MultiLink._keys = TestEntityLvl3MultiLink._keyFields.reduce(
    function (acc, field) {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
})(
  (TestEntityLvl3MultiLink =
    exports.TestEntityLvl3MultiLink || (exports.TestEntityLvl3MultiLink = {}))
);
exports.TestEntityLvl3MultiLink = TestEntityLvl3MultiLink;
//# sourceMappingURL=TestEntityLvl3MultiLink.js.map
