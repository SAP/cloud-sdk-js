'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.defaultCommonServicePath = exports.changeset = exports.batch = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const util_1 = require('@sap-cloud-sdk/util');
const index_1 = require('./index');
function batch(first, ...rest) {
  return new odata_v4_1.ODataBatchRequestBuilder(
    exports.defaultCommonServicePath,
    (0, util_1.variadicArgumentToArray)(first, rest),
    map
  );
}
exports.batch = batch;
function changeset(first, ...rest) {
  return new odata_v4_1.ODataBatchChangeSet(
    (0, util_1.variadicArgumentToArray)(first, rest)
  );
}
exports.changeset = changeset;
exports.defaultCommonServicePath = '/sap/opu/odata/sap/API_COMMON_ENTITY_SRV/';
const map = {
  A_CommonEntity: index_1.CommonEntity,
  A_CommonEntitySingleLink: index_1.CommonEntitySingleLink
};
//# sourceMappingURL=BatchRequest.js.map
