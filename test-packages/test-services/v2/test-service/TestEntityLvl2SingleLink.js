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
exports.TestEntityLvl2SingleLink = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var TestEntityLvl2SingleLinkRequestBuilder_1 = require('./TestEntityLvl2SingleLinkRequestBuilder');
var core_1 = require('@sap-cloud-sdk/core');
/**
 * This class represents the entity "A_TestEntityLvl2SingleLink" of service "API_TEST_SRV".
 */
var TestEntityLvl2SingleLink = /** @class */ (function (_super) {
  __extends(TestEntityLvl2SingleLink, _super);
  function TestEntityLvl2SingleLink() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns an entity builder to construct instances of `TestEntityLvl2SingleLink`.
   * @returns A builder that constructs instances of entity type `TestEntityLvl2SingleLink`.
   */
  TestEntityLvl2SingleLink.builder = function () {
    return core_1.EntityV2.entityBuilder(TestEntityLvl2SingleLink);
  };
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityLvl2SingleLink` entity type.
   * @returns A `TestEntityLvl2SingleLink` request builder.
   */
  TestEntityLvl2SingleLink.requestBuilder = function () {
    return new TestEntityLvl2SingleLinkRequestBuilder_1.TestEntityLvl2SingleLinkRequestBuilder();
  };
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityLvl2SingleLink`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityLvl2SingleLink`.
   */
  TestEntityLvl2SingleLink.customField = function (fieldName) {
    return core_1.EntityV2.customFieldSelector(
      fieldName,
      TestEntityLvl2SingleLink
    );
  };
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  TestEntityLvl2SingleLink.prototype.toJSON = function () {
    return __assign(__assign({}, this), this._customFields);
  };
  /**
   * Technical entity name for TestEntityLvl2SingleLink.
   */
  TestEntityLvl2SingleLink._entityName = 'A_TestEntityLvl2SingleLink';
  /**
   * Default url path for the according service.
   */
  TestEntityLvl2SingleLink._defaultServicePath =
    '/sap/opu/odata/sap/API_TEST_SRV';
  return TestEntityLvl2SingleLink;
})(core_1.EntityV2);
exports.TestEntityLvl2SingleLink = TestEntityLvl2SingleLink;
(function (TestEntityLvl2SingleLink) {
  var _fieldBuilder = new core_1.FieldBuilder(TestEntityLvl2SingleLink);
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityLvl2SingleLink.KEY_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'KeyProperty',
    'Edm.String',
    false
  );
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityLvl2SingleLink.STRING_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'StringProperty',
    'Edm.String',
    true
  );
  /**
   * Static representation of the [[booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityLvl2SingleLink.BOOLEAN_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'BooleanProperty',
    'Edm.Boolean',
    true
  );
  /**
   * Static representation of the [[guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityLvl2SingleLink.GUID_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'GuidProperty',
    'Edm.Guid',
    true
  );
  /**
   * Static representation of the [[int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityLvl2SingleLink.INT_16_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'Int16Property',
    'Edm.Int16',
    true
  );
  /**
   * All fields of the TestEntityLvl2SingleLink entity.
   */
  TestEntityLvl2SingleLink._allFields = [
    TestEntityLvl2SingleLink.KEY_PROPERTY,
    TestEntityLvl2SingleLink.STRING_PROPERTY,
    TestEntityLvl2SingleLink.BOOLEAN_PROPERTY,
    TestEntityLvl2SingleLink.GUID_PROPERTY,
    TestEntityLvl2SingleLink.INT_16_PROPERTY
  ];
  /**
   * All fields selector.
   */
  TestEntityLvl2SingleLink.ALL_FIELDS = new core_1.AllFields(
    '*',
    TestEntityLvl2SingleLink
  );
  /**
   * All key fields of the TestEntityLvl2SingleLink entity.
   */
  TestEntityLvl2SingleLink._keyFields = [TestEntityLvl2SingleLink.KEY_PROPERTY];
  /**
   * Mapping of all key field names to the respective static field property TestEntityLvl2SingleLink.
   */
  TestEntityLvl2SingleLink._keys = TestEntityLvl2SingleLink._keyFields.reduce(
    function (acc, field) {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
})(
  (TestEntityLvl2SingleLink =
    exports.TestEntityLvl2SingleLink || (exports.TestEntityLvl2SingleLink = {}))
);
exports.TestEntityLvl2SingleLink = TestEntityLvl2SingleLink;
//# sourceMappingURL=TestEntityLvl2SingleLink.js.map
