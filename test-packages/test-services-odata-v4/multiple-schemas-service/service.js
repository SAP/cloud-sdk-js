"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multipleSchemasService = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntity1Api_1 = require("./TestEntity1Api");
const TestEntity2Api_1 = require("./TestEntity2Api");
const TestEntity3Api_1 = require("./TestEntity3Api");
const TestEntity4Api_1 = require("./TestEntity4Api");
const function_imports_1 = require("./function-imports");
const action_imports_1 = require("./action-imports");
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const BatchRequest_1 = require("./BatchRequest");
function multipleSchemasService(deSerializers = odata_v4_1.defaultDeSerializers) {
    return new MultipleSchemasService((0, odata_v4_1.mergeDefaultDeSerializersWith)(deSerializers));
}
exports.multipleSchemasService = multipleSchemasService;
class MultipleSchemasService {
    constructor(deSerializers) {
        this.apis = {};
        this.deSerializers = deSerializers;
    }
    initApi(key, ctor) {
        if (!this.apis[key]) {
            this.apis[key] = new ctor(this.deSerializers);
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
    get functionImports() {
        return { testFunctionImportEntityReturnType1: (parameter) => (0, function_imports_1.testFunctionImportEntityReturnType1)(parameter, this.deSerializers), testFunctionImportEntityReturnType2: (parameter) => (0, function_imports_1.testFunctionImportEntityReturnType2)(parameter, this.deSerializers) };
    }
    get actionImports() {
        return { testActionImportNoParameterComplexReturnType1: (parameter) => (0, action_imports_1.testActionImportNoParameterComplexReturnType1)(parameter, this.deSerializers), testActionImportNoParameterComplexReturnType2: (parameter) => (0, action_imports_1.testActionImportNoParameterComplexReturnType2)(parameter, this.deSerializers) };
    }
    get batch() {
        return BatchRequest_1.batch;
    }
    get changeset() {
        return BatchRequest_1.changeset;
    }
}
//# sourceMappingURL=service.js.map