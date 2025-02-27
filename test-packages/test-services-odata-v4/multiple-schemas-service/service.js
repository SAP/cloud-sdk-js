"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multipleSchemasService = multipleSchemasService;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntity1Api_1 = require("./TestEntity1Api");
const TestEntity2Api_1 = require("./TestEntity2Api");
const TestEntity3Api_1 = require("./TestEntity3Api");
const TestEntity4Api_1 = require("./TestEntity4Api");
const operations_1 = require("./operations");
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const BatchRequest_1 = require("./BatchRequest");
function multipleSchemasService(deSerializers = odata_v4_1.defaultDeSerializers) {
    return new MultipleSchemasService((0, odata_v4_1.mergeDefaultDeSerializersWith)(deSerializers));
}
class MultipleSchemasService {
    constructor(deSerializers) {
        this.apis = {};
        this.deSerializers = deSerializers;
    }
    initApi(key, entityApi) {
        if (!this.apis[key]) {
            this.apis[key] = entityApi._privateFactory(this.deSerializers);
        }
        return this.apis[key];
    }
    get testEntity1Api() {
        return this.initApi('testEntity1Api', TestEntity1Api_1.TestEntity1Api);
    }
    get testEntity2Api() {
        return this.initApi('testEntity2Api', TestEntity2Api_1.TestEntity2Api);
    }
    get testEntity3Api() {
        return this.initApi('testEntity3Api', TestEntity3Api_1.TestEntity3Api);
    }
    get testEntity4Api() {
        return this.initApi('testEntity4Api', TestEntity4Api_1.TestEntity4Api);
    }
    get operations() {
        return {
            testFunctionImportEntityReturnType1: (parameter) => (0, operations_1.testFunctionImportEntityReturnType1)(parameter, this.deSerializers),
            testFunctionImportEntityReturnType2: (parameter) => (0, operations_1.testFunctionImportEntityReturnType2)(parameter, this.deSerializers),
            testActionImportNoParameterComplexReturnType1: (parameter) => (0, operations_1.testActionImportNoParameterComplexReturnType1)(parameter, this.deSerializers),
            testActionImportNoParameterComplexReturnType2: (parameter) => (0, operations_1.testActionImportNoParameterComplexReturnType2)(parameter, this.deSerializers)
        };
    }
    get batch() {
        return BatchRequest_1.batch;
    }
    get changeset() {
        return BatchRequest_1.changeset;
    }
}
//# sourceMappingURL=service.js.map