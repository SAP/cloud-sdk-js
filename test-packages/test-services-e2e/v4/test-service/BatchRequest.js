'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.defaultTestServicePath = exports.changeset = exports.batch = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const core_1 = require('@sap-cloud-sdk/core');
const util_1 = require('@sap-cloud-sdk/util');
const index_1 = require('./index');
function batch(first, ...rest) {
  return new core_1.ODataBatchRequestBuilderV4(
    exports.defaultTestServicePath,
    (0, util_1.variadicArgumentToArray)(first, rest),
    map
  );
}
exports.batch = batch;
function changeset(first, ...rest) {
  return new core_1.ODataBatchChangeSetV4(
    (0, util_1.variadicArgumentToArray)(first, rest)
  );
}
exports.changeset = changeset;
exports.defaultTestServicePath = '/odata/test-service';
const map = {
  TestEntity: index_1.TestEntity,
  TestEntityLink: index_1.TestEntityLink
};
//# sourceMappingURL=BatchRequest.js.map
