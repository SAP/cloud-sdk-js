'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.defaultMultipleSchemasServicePath = exports.changeset = exports.batch = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require('@sap-cloud-sdk/core');
var util_1 = require('@sap-cloud-sdk/util');
var index_1 = require('./index');
function batch(first) {
  var rest = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    rest[_i - 1] = arguments[_i];
  }
  return new core_1.ODataBatchRequestBuilderV4(
    exports.defaultMultipleSchemasServicePath,
    util_1.variadicArgumentToArray(first, rest),
    map
  );
}
exports.batch = batch;
function changeset(first) {
  var rest = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    rest[_i - 1] = arguments[_i];
  }
  return new core_1.ODataBatchChangeSetV4(
    util_1.variadicArgumentToArray(first, rest)
  );
}
exports.changeset = changeset;
exports.defaultMultipleSchemasServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
var map = {
  A_TestEntity1: index_1.TestEntity1,
  A_TestEntity2: index_1.TestEntity2,
  A_TestEntity3: index_1.TestEntity3,
  A_TestEntity4: index_1.TestEntity4
};
//# sourceMappingURL=BatchRequest.js.map
