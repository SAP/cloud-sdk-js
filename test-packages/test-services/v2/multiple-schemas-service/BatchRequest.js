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
const odata_v2_1 = require('@sap-cloud-sdk/odata-v2');
const util_1 = require('@sap-cloud-sdk/util');
const index_1 = require('./index');
const internal_1 = require('@sap-cloud-sdk/odata-common/internal');
function batch(first, ...rest) {
  return new odata_v2_1.ODataBatchRequestBuilder(
    exports.defaultMultipleSchemasServicePath,
    (0, util_1.variadicArgumentToArray)(first, rest),
    map
  );
}
exports.batch = batch;
function changeset(first, ...rest) {
  return new internal_1.BatchChangeSet(
    (0, util_1.variadicArgumentToArray)(first, rest)
  );
}
exports.changeset = changeset;
exports.defaultMultipleSchemasServicePath = 'VALUE_IS_UNDEFINED';
const map = { MultiSchemaTestEntity: index_1.MultiSchemaTestEntity };
//# sourceMappingURL=BatchRequest.js.map
