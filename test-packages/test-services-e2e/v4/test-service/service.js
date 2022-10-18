"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testService = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntityApi_1 = require("./TestEntityApi");
const TestEntityWithMultipleKeysApi_1 = require("./TestEntityWithMultipleKeysApi");
const TestEntityLinkApi_1 = require("./TestEntityLinkApi");
const TestEntity50PropApi_1 = require("./TestEntity50PropApi");
const function_imports_1 = require("./function-imports");
const action_imports_1 = require("./action-imports");
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const BatchRequest_1 = require("./BatchRequest");
function testService(deSerializers = odata_v4_1.defaultDeSerializers) {
    return new TestService((0, odata_v4_1.mergeDefaultDeSerializersWith)(deSerializers));
}
exports.testService = testService;
class TestService {
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
    get testEntityApi() {
        const api = this.initApi('testEntityApi', TestEntityApi_1.TestEntityApi);
        const linkedApis = [
            this.initApi('testEntityLinkApi', TestEntityLinkApi_1.TestEntityLinkApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get testEntityWithMultipleKeysApi() {
        return this.initApi('testEntityWithMultipleKeysApi', TestEntityWithMultipleKeysApi_1.TestEntityWithMultipleKeysApi);
    }
    get testEntityLinkApi() {
        return this.initApi('testEntityLinkApi', TestEntityLinkApi_1.TestEntityLinkApi);
    }
    get testEntity50PropApi() {
        return this.initApi('testEntity50PropApi', TestEntity50PropApi_1.TestEntity50PropApi);
    }
    get functionImports() {
        return { concatStrings: (parameter) => (0, function_imports_1.concatStrings)(parameter, this.deSerializers), getAll: (parameter) => (0, function_imports_1.getAll)(parameter, this.deSerializers), getByKey: (parameter) => (0, function_imports_1.getByKey)(parameter, this.deSerializers), getByKeyWithMultipleKeys: (parameter) => (0, function_imports_1.getByKeyWithMultipleKeys)(parameter, this.deSerializers), returnCollection: (parameter) => (0, function_imports_1.returnCollection)(parameter, this.deSerializers), returnInt: (parameter) => (0, function_imports_1.returnInt)(parameter, this.deSerializers), returnSapCloudSdk: (parameter) => (0, function_imports_1.returnSapCloudSdk)(parameter, this.deSerializers) };
    }
    get actionImports() {
        return { createTestEntityById: (parameter) => (0, action_imports_1.createTestEntityById)(parameter, this.deSerializers), createTestEntityByIdReturnId: (parameter) => (0, action_imports_1.createTestEntityByIdReturnId)(parameter, this.deSerializers) };
    }
    get batch() {
        return BatchRequest_1.batch;
    }
    get changeset() {
        return BatchRequest_1.changeset;
    }
}
//# sourceMappingURL=service.js.map