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
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
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
exports.TestEntityMultiLink = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var TestEntityMultiLinkRequestBuilder_1 = require('./TestEntityMultiLinkRequestBuilder');
var core_1 = require('@sap-cloud-sdk/core');
/**
 * This class represents the entity "A_TestEntityMultiLink" of service "API_TEST_SRV".
 */
var TestEntityMultiLink = /** @class */ (function (_super) {
  __extends(TestEntityMultiLink, _super);
  function TestEntityMultiLink() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns an entity builder to construct instances `TestEntityMultiLink`.
   * @returns A builder that constructs instances of entity type `TestEntityMultiLink`.
   */
  TestEntityMultiLink.builder = function () {
    return core_1.Entity.entityBuilder(TestEntityMultiLink);
  };
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityMultiLink` entity type.
   * @returns A `TestEntityMultiLink` request builder.
   */
  TestEntityMultiLink.requestBuilder = function () {
    return new TestEntityMultiLinkRequestBuilder_1.TestEntityMultiLinkRequestBuilder();
  };
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityMultiLink`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityMultiLink`.
   */
  TestEntityMultiLink.customField = function (fieldName) {
    return core_1.Entity.customFieldSelector(fieldName, TestEntityMultiLink);
  };
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  TestEntityMultiLink.prototype.toJSON = function () {
    return __assign(__assign({}, this), this._customFields);
  };
  /**
   * Technical entity name for TestEntityMultiLink.
   */
  TestEntityMultiLink._entityName = 'A_TestEntityMultiLink';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for TestEntityMultiLink.
   */
  TestEntityMultiLink._serviceName = 'API_TEST_SRV';
  /**
   * Default url path for the according service.
   */
  TestEntityMultiLink._defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  return TestEntityMultiLink;
})(core_1.Entity);
exports.TestEntityMultiLink = TestEntityMultiLink;
var TestEntityLvl2MultiLink_1 = require('./TestEntityLvl2MultiLink');
var TestEntityLvl2SingleLink_1 = require('./TestEntityLvl2SingleLink');
(function (TestEntityMultiLink) {
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityMultiLink.KEY_PROPERTY = new core_1.StringField(
    'KeyProperty',
    TestEntityMultiLink,
    'Edm.String'
  );
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityMultiLink.STRING_PROPERTY = new core_1.StringField(
    'StringProperty',
    TestEntityMultiLink,
    'Edm.String'
  );
  /**
   * Static representation of the [[booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityMultiLink.BOOLEAN_PROPERTY = new core_1.BooleanField(
    'BooleanProperty',
    TestEntityMultiLink,
    'Edm.Boolean'
  );
  /**
   * Static representation of the [[guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityMultiLink.GUID_PROPERTY = new core_1.StringField(
    'GuidProperty',
    TestEntityMultiLink,
    'Edm.Guid'
  );
  /**
   * Static representation of the [[int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityMultiLink.INT_16_PROPERTY = new core_1.NumberField(
    'Int16Property',
    TestEntityMultiLink,
    'Edm.Int16'
  );
  /**
   * Static representation of the one-to-many navigation property [[toMultiLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityMultiLink.TO_MULTI_LINK = new core_1.Link(
    'to_MultiLink',
    TestEntityMultiLink,
    TestEntityLvl2MultiLink_1.TestEntityLvl2MultiLink
  );
  /**
   * Static representation of the one-to-one navigation property [[toSingleLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityMultiLink.TO_SINGLE_LINK = new core_1.OneToOneLink(
    'to_SingleLink',
    TestEntityMultiLink,
    TestEntityLvl2SingleLink_1.TestEntityLvl2SingleLink
  );
  /**
   * All fields of the TestEntityMultiLink entity.
   */
  TestEntityMultiLink._allFields = [
    TestEntityMultiLink.KEY_PROPERTY,
    TestEntityMultiLink.STRING_PROPERTY,
    TestEntityMultiLink.BOOLEAN_PROPERTY,
    TestEntityMultiLink.GUID_PROPERTY,
    TestEntityMultiLink.INT_16_PROPERTY,
    TestEntityMultiLink.TO_MULTI_LINK,
    TestEntityMultiLink.TO_SINGLE_LINK
  ];
  /**
   * All fields selector.
   */
  TestEntityMultiLink.ALL_FIELDS = new core_1.AllFields(
    '*',
    TestEntityMultiLink
  );
  /**
   * All key fields of the TestEntityMultiLink entity.
   */
  TestEntityMultiLink._keyFields = [TestEntityMultiLink.KEY_PROPERTY];
  /**
   * Mapping of all key field names to the respective static field property TestEntityMultiLink.
   */
  TestEntityMultiLink._keys = TestEntityMultiLink._keyFields.reduce(function (
    acc,
    field
  ) {
    acc[field._fieldName] = field;
    return acc;
  },
  {});
})(
  (TestEntityMultiLink =
    exports.TestEntityMultiLink || (exports.TestEntityMultiLink = {}))
);
exports.TestEntityMultiLink = TestEntityMultiLink;
//# sourceMappingURL=TestEntityMultiLink.js.map
