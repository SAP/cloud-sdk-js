'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.defaultTestServicePath = exports.changeset = exports.batch = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require('@sap-cloud-sdk/core');
var index_1 = require('./index');
/**
 * Batch builder for operations supported on the Test Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
function batch() {
  var requests = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    requests[_i] = arguments[_i];
  }
  return new core_1.ODataBatchRequestBuilder(
    exports.defaultTestServicePath,
    requests,
    map
  );
}
exports.batch = batch;
/**
 * Change set constructor consists of write operations supported on the Test Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
function changeset() {
  var requests = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    requests[_i] = arguments[_i];
  }
  return new core_1.ODataBatchChangeSet(requests);
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
  A_TestEntityCircularLinkParent: index_1.TestEntityCircularLinkParent,
  A_TestEntityCircularLinkChild: index_1.TestEntityCircularLinkChild,
  A_TestEntityEndsWithCollection: index_1.TestEntityEndsWith,
  A_TestEntityEndsWithSomethingElse: index_1.TestEntityEndsWithSomethingElse
};
//# sourceMappingURL=BatchRequest.js.map
