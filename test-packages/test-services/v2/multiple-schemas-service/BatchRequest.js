'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.defaultMultipleSchemasServicePath =
  exports.changeset =
  exports.batch =
    void 0;
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
  return new core_1.ODataBatchRequestBuilderV2(
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
  return new core_1.ODataBatchChangeSetV2(
    util_1.variadicArgumentToArray(first, rest)
  );
}
exports.changeset = changeset;
exports.defaultMultipleSchemasServicePath = 'VALUE_IS_UNDEFINED';
var map = { MultiSchemaTestEntity: index_1.MultiSchemaTestEntity };
//# sourceMappingURL=BatchRequest.js.map
