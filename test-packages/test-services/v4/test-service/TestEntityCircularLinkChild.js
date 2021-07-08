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
exports.TestEntityCircularLinkChild = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var TestEntityCircularLinkChildRequestBuilder_1 = require('./TestEntityCircularLinkChildRequestBuilder');
var core_1 = require('@sap-cloud-sdk/core');
/**
 * This class represents the entity "A_TestEntityCircularLinkChild" of service "API_TEST_SRV".
 */
var TestEntityCircularLinkChild = /** @class */ (function (_super) {
  __extends(TestEntityCircularLinkChild, _super);
  function TestEntityCircularLinkChild() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns an entity builder to construct instances of `TestEntityCircularLinkChild`.
   * @returns A builder that constructs instances of entity type `TestEntityCircularLinkChild`.
   */
  TestEntityCircularLinkChild.builder = function () {
    return core_1.EntityV4.entityBuilder(TestEntityCircularLinkChild);
  };
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityCircularLinkChild` entity type.
   * @returns A `TestEntityCircularLinkChild` request builder.
   */
  TestEntityCircularLinkChild.requestBuilder = function () {
    return new TestEntityCircularLinkChildRequestBuilder_1.TestEntityCircularLinkChildRequestBuilder();
  };
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityCircularLinkChild`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityCircularLinkChild`.
   */
  TestEntityCircularLinkChild.customField = function (fieldName) {
    return core_1.EntityV4.customFieldSelector(
      fieldName,
      TestEntityCircularLinkChild
    );
  };
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  TestEntityCircularLinkChild.prototype.toJSON = function () {
    return __assign(__assign({}, this), this._customFields);
  };
  /**
   * Technical entity name for TestEntityCircularLinkChild.
   */
  TestEntityCircularLinkChild._entityName = 'A_TestEntityCircularLinkChild';
  /**
   * Default url path for the according service.
   */
  TestEntityCircularLinkChild._defaultServicePath =
    '/sap/opu/odata/sap/API_TEST_SRV';
  return TestEntityCircularLinkChild;
})(core_1.EntityV4);
exports.TestEntityCircularLinkChild = TestEntityCircularLinkChild;
var TestEntityCircularLinkParent_1 = require('./TestEntityCircularLinkParent');
(function (TestEntityCircularLinkChild) {
  var _fieldBuilder = new core_1.FieldBuilder(TestEntityCircularLinkChild);
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityCircularLinkChild.KEY_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'KeyProperty',
    'Edm.String',
    false
  );
  /**
   * Static representation of the one-to-one navigation property [[toParent]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityCircularLinkChild.TO_PARENT = new core_1.OneToOneLink(
    'to_Parent',
    TestEntityCircularLinkChild,
    TestEntityCircularLinkParent_1.TestEntityCircularLinkParent
  );
  /**
   * All fields of the TestEntityCircularLinkChild entity.
   */
  TestEntityCircularLinkChild._allFields = [
    TestEntityCircularLinkChild.KEY_PROPERTY,
    TestEntityCircularLinkChild.TO_PARENT
  ];
  /**
   * All fields selector.
   */
  TestEntityCircularLinkChild.ALL_FIELDS = new core_1.AllFields(
    '*',
    TestEntityCircularLinkChild
  );
  /**
   * All key fields of the TestEntityCircularLinkChild entity.
   */
  TestEntityCircularLinkChild._keyFields = [
    TestEntityCircularLinkChild.KEY_PROPERTY
  ];
  /**
   * Mapping of all key field names to the respective static field property TestEntityCircularLinkChild.
   */
  TestEntityCircularLinkChild._keys =
    TestEntityCircularLinkChild._keyFields.reduce(function (acc, field) {
      acc[field._fieldName] = field;
      return acc;
    }, {});
})(
  (TestEntityCircularLinkChild =
    exports.TestEntityCircularLinkChild ||
    (exports.TestEntityCircularLinkChild = {}))
);
exports.TestEntityCircularLinkChild = TestEntityCircularLinkChild;
//# sourceMappingURL=TestEntityCircularLinkChild.js.map
