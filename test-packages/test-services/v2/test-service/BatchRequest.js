'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.defaultTestServicePath = exports.changeset = exports.batch = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
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
    exports.defaultTestServicePath,
    (0, util_1.variadicArgumentToArray)(first, rest),
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
    (0, util_1.variadicArgumentToArray)(first, rest)
  );
}
exports.changeset = changeset;
exports.defaultTestServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
var map = {
  A_TestEntity: index_1.TestEntity,
  A_TestEntityMultiLink: index_1.TestEntityMultiLink,
  A_TestEntityOtherMultiLink: index_1.TestEntityOtherMultiLink,
  A_TestEntityLvl2MultiLink: index_1.TestEntityLvl2MultiLink,
  A_TestEntitySingleLink: index_1.TestEntitySingleLink,
  A_TestEntityLvl2SingleLink: index_1.TestEntityLvl2SingleLink,
  A_TestEntityWithSharedEntityType1: index_1.TestEntityWithSharedEntityType1,
  A_TestEntityWithSharedEntityType2: index_1.TestEntityWithSharedEntityType2,
  A_TestEntityCircularLinkParent: index_1.TestEntityCircularLinkParent,
  A_TestEntityCircularLinkChild: index_1.TestEntityCircularLinkChild,
  A_TestEntityEndsWithCollection: index_1.TestEntityEndsWith,
  A_TestEntityEndsWithSomethingElse: index_1.TestEntityEndsWithSomethingElse,
  A_CaseTest: index_1.CaseTest,
  A_CASETEST: index_1.Casetest_1
};
//# sourceMappingURL=BatchRequest.js.map
