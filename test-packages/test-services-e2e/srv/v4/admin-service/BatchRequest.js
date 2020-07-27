"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultAdminServicePath = exports.changeset = exports.batch = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var v4_1 = require("@sap-cloud-sdk/core/v4");
var index_1 = require("./index");
/**
 * Batch builder for operations supported on the Admin Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
function batch() {
    var requests = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        requests[_i] = arguments[_i];
    }
    return new v4_1.ODataBatchRequestBuilder(exports.defaultAdminServicePath, requests, map);
}
exports.batch = batch;
/**
 * Change set constructor consists of write operations supported on the Admin Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
function changeset() {
    var requests = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        requests[_i] = arguments[_i];
    }
    return new v4_1.ODataBatchChangeSet(requests);
}
exports.changeset = changeset;
exports.defaultAdminServicePath = '/sap/opu/odata/sap/AdminService';
var map = { 'TestEntity': index_1.TestEntity };
//# sourceMappingURL=BatchRequest.js.map