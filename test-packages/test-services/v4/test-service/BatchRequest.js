'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.defaultTestServicePath = exports.changeset = exports.batch = void 0;
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
    exports.defaultTestServicePath,
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
exports.defaultTestServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
const map = {
  A_TestEntity: index_1.TestEntity,
  A_TestEntityWithEnumKey: index_1.TestEntityWithEnumKey,
  A_TestEntityWithSharedEntityType1: index_1.TestEntityWithSharedEntityType1,
  A_TestEntityWithSharedEntityType2: index_1.TestEntityWithSharedEntityType2,
  A_TestEntityMultiLink: index_1.TestEntityMultiLink,
  A_TestEntityOtherMultiLink: index_1.TestEntityOtherMultiLink,
  A_TestEntityLvl2MultiLink: index_1.TestEntityLvl2MultiLink,
  A_TestEntityLvl3MultiLink: index_1.TestEntityLvl3MultiLink,
  A_TestEntitySingleLink: index_1.TestEntitySingleLink,
  A_TestEntityLvl2SingleLink: index_1.TestEntityLvl2SingleLink,
  A_TestEntityCircularLinkParent: index_1.TestEntityCircularLinkParent,
  A_TestEntityCircularLinkChild: index_1.TestEntityCircularLinkChild,
  A_TestEntityEndsWithCollection: index_1.TestEntityEndsWith,
  A_TestEntityEndsWithSomethingElse: index_1.TestEntityEndsWithSomethingElse
};
//# sourceMappingURL=BatchRequest.js.map
