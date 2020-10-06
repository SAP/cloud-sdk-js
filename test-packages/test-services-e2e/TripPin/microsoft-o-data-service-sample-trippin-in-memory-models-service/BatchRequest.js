"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultMicrosoftODataServiceSampleTrippinInMemoryModelsServicePath = exports.changeset = exports.batch = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
var index_1 = require("./index");
/**
 * Batch builder for operations supported on the Microsoft O Data Service Sample Trippin In Memory Models Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
function batch() {
    var requests = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        requests[_i] = arguments[_i];
    }
    return new core_1.ODataBatchRequestBuilderV4(exports.defaultMicrosoftODataServiceSampleTrippinInMemoryModelsServicePath, requests, map);
}
exports.batch = batch;
/**
 * Change set constructor consists of write operations supported on the Microsoft O Data Service Sample Trippin In Memory Models Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
function changeset() {
    var requests = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        requests[_i] = arguments[_i];
    }
    return new core_1.ODataBatchChangeSetV4(requests);
}
exports.changeset = changeset;
exports.defaultMicrosoftODataServiceSampleTrippinInMemoryModelsServicePath = 'V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/';
var map = { 'Photos': index_1.Photos, 'People': index_1.People, 'Airlines': index_1.Airlines, 'Airports': index_1.Airports };
//# sourceMappingURL=BatchRequest.js.map