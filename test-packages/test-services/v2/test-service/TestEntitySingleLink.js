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
exports.TestEntitySingleLink = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var TestEntitySingleLinkRequestBuilder_1 = require('./TestEntitySingleLinkRequestBuilder');
var core_1 = require('@sap-cloud-sdk/core');
/**
 * This class represents the entity "A_TestEntitySingleLink" of service "API_TEST_SRV".
 */
var TestEntitySingleLink = /** @class */ (function (_super) {
  __extends(TestEntitySingleLink, _super);
  function TestEntitySingleLink() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns an entity builder to construct instances of `TestEntitySingleLink`.
   * @returns A builder that constructs instances of entity type `TestEntitySingleLink`.
   */
  TestEntitySingleLink.builder = function () {
    return core_1.EntityV2.entityBuilder(TestEntitySingleLink);
  };
  /**
   * Returns a request builder to construct requests for operations on the `TestEntitySingleLink` entity type.
   * @returns A `TestEntitySingleLink` request builder.
   */
  TestEntitySingleLink.requestBuilder = function () {
    return new TestEntitySingleLinkRequestBuilder_1.TestEntitySingleLinkRequestBuilder();
  };
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntitySingleLink`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntitySingleLink`.
   */
  TestEntitySingleLink.customField = function (fieldName) {
    return core_1.EntityV2.customFieldSelector(fieldName, TestEntitySingleLink);
  };
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  TestEntitySingleLink.prototype.toJSON = function () {
    return __assign(__assign({}, this), this._customFields);
  };
  /**
   * Technical entity name for TestEntitySingleLink.
   */
  TestEntitySingleLink._entityName = 'A_TestEntitySingleLink';
  /**
   * Default url path for the according service.
   */
  TestEntitySingleLink._defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  return TestEntitySingleLink;
})(core_1.EntityV2);
exports.TestEntitySingleLink = TestEntitySingleLink;
var TestEntityLvl2MultiLink_1 = require('./TestEntityLvl2MultiLink');
var TestEntityLvl2SingleLink_1 = require('./TestEntityLvl2SingleLink');
(function (TestEntitySingleLink) {
  var _fieldBuilder = new core_1.FieldBuilder(TestEntitySingleLink);
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntitySingleLink.KEY_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'KeyProperty',
    'Edm.String',
    false
  );
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntitySingleLink.STRING_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'StringProperty',
    'Edm.String',
    true
  );
  /**
   * Static representation of the [[booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntitySingleLink.BOOLEAN_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'BooleanProperty',
    'Edm.Boolean',
    true
  );
  /**
   * Static representation of the [[guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntitySingleLink.GUID_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'GuidProperty',
    'Edm.Guid',
    true
  );
  /**
   * Static representation of the [[int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntitySingleLink.INT_16_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'Int16Property',
    'Edm.Int16',
    true
  );
  /**
   * Static representation of the one-to-many navigation property [[toMultiLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntitySingleLink.TO_MULTI_LINK = new core_1.Link(
    'to_MultiLink',
    TestEntitySingleLink,
    TestEntityLvl2MultiLink_1.TestEntityLvl2MultiLink
  );
  /**
   * Static representation of the one-to-one navigation property [[toSingleLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntitySingleLink.TO_SINGLE_LINK = new core_1.OneToOneLink(
    'to_SingleLink',
    TestEntitySingleLink,
    TestEntityLvl2SingleLink_1.TestEntityLvl2SingleLink
  );
  /**
   * All fields of the TestEntitySingleLink entity.
   */
  TestEntitySingleLink._allFields = [
    TestEntitySingleLink.KEY_PROPERTY,
    TestEntitySingleLink.STRING_PROPERTY,
    TestEntitySingleLink.BOOLEAN_PROPERTY,
    TestEntitySingleLink.GUID_PROPERTY,
    TestEntitySingleLink.INT_16_PROPERTY,
    TestEntitySingleLink.TO_MULTI_LINK,
    TestEntitySingleLink.TO_SINGLE_LINK
  ];
  /**
   * All fields selector.
   */
  TestEntitySingleLink.ALL_FIELDS = new core_1.AllFields(
    '*',
    TestEntitySingleLink
  );
  /**
   * All key fields of the TestEntitySingleLink entity.
   */
  TestEntitySingleLink._keyFields = [TestEntitySingleLink.KEY_PROPERTY];
  /**
   * Mapping of all key field names to the respective static field property TestEntitySingleLink.
   */
  TestEntitySingleLink._keys = TestEntitySingleLink._keyFields.reduce(function (
    acc,
    field
  ) {
    acc[field._fieldName] = field;
    return acc;
  },
  {});
})(
  (TestEntitySingleLink =
    exports.TestEntitySingleLink || (exports.TestEntitySingleLink = {}))
);
exports.TestEntitySingleLink = TestEntitySingleLink;
//# sourceMappingURL=TestEntitySingleLink.js.map
