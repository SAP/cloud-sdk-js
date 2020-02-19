"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var cloud_sdk_core_1 = require("@sap-cloud-sdk/core");
var index_1 = require("./index");
/**
 * Batch builder for operations supported on the Multiple Schemas Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
function batch() {
    var requests = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        requests[_i] = arguments[_i];
    }
    return new cloud_sdk_core_1.ODataBatchRequestBuilder(exports.defaultMultipleSchemasServicePath, requests, map);
}
exports.batch = batch;
/**
 * Change set constructor consists of write operations supported on the Multiple Schemas Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
function changeset() {
    var requests = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        requests[_i] = arguments[_i];
    }
    return new cloud_sdk_core_1.ODataBatchChangeSet(requests);
}
exports.changeset = changeset;
exports.defaultMultipleSchemasServicePath = '/sap/opu/odata/sap/SCHEMA_DATA';
var map = { 'MultiSchemaTestEntity': index_1.MultiSchemaTestEntity };
//# sourceMappingURL=BatchRequest.js.map
