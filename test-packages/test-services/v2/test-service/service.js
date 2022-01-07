"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestService = exports.testService = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntityApi_1 = require("./TestEntityApi");
const TestEntityMultiLinkApi_1 = require("./TestEntityMultiLinkApi");
const TestEntityOtherMultiLinkApi_1 = require("./TestEntityOtherMultiLinkApi");
const TestEntityLvl2MultiLinkApi_1 = require("./TestEntityLvl2MultiLinkApi");
const TestEntitySingleLinkApi_1 = require("./TestEntitySingleLinkApi");
const TestEntityLvl2SingleLinkApi_1 = require("./TestEntityLvl2SingleLinkApi");
const TestEntityWithSharedEntityType1Api_1 = require("./TestEntityWithSharedEntityType1Api");
const TestEntityWithSharedEntityType2Api_1 = require("./TestEntityWithSharedEntityType2Api");
const TestEntityCircularLinkParentApi_1 = require("./TestEntityCircularLinkParentApi");
const TestEntityCircularLinkChildApi_1 = require("./TestEntityCircularLinkChildApi");
const TestEntityEndsWithApi_1 = require("./TestEntityEndsWithApi");
const TestEntityEndsWithSomethingElseApi_1 = require("./TestEntityEndsWithSomethingElseApi");
const CaseTestApi_1 = require("./CaseTestApi");
const Casetest_1Api_1 = require("./Casetest_1Api");
const function_imports_1 = require("./function-imports");
const BatchRequest_1 = require("./BatchRequest");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
function testService(deSerializers = odata_v2_1.defaultDeSerializers) {
    return new TestService((0, odata_v2_1.mergeDefaultDeSerializersWith)(deSerializers));
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
            this.initApi('testEntityMultiLinkApi', TestEntityMultiLinkApi_1.TestEntityMultiLinkApi),
            this.initApi('testEntityOtherMultiLinkApi', TestEntityOtherMultiLinkApi_1.TestEntityOtherMultiLinkApi),
            this.initApi('testEntitySingleLinkApi', TestEntitySingleLinkApi_1.TestEntitySingleLinkApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get testEntityMultiLinkApi() {
        const api = this.initApi('testEntityMultiLinkApi', TestEntityMultiLinkApi_1.TestEntityMultiLinkApi);
        const linkedApis = [
            this.initApi('testEntityLvl2MultiLinkApi', TestEntityLvl2MultiLinkApi_1.TestEntityLvl2MultiLinkApi),
            this.initApi('testEntityLvl2SingleLinkApi', TestEntityLvl2SingleLinkApi_1.TestEntityLvl2SingleLinkApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get testEntityOtherMultiLinkApi() {
        return this.initApi('testEntityOtherMultiLinkApi', TestEntityOtherMultiLinkApi_1.TestEntityOtherMultiLinkApi);
    }
    get testEntityLvl2MultiLinkApi() {
        return this.initApi('testEntityLvl2MultiLinkApi', TestEntityLvl2MultiLinkApi_1.TestEntityLvl2MultiLinkApi);
    }
    get testEntitySingleLinkApi() {
        const api = this.initApi('testEntitySingleLinkApi', TestEntitySingleLinkApi_1.TestEntitySingleLinkApi);
        const linkedApis = [
            this.initApi('testEntityLvl2MultiLinkApi', TestEntityLvl2MultiLinkApi_1.TestEntityLvl2MultiLinkApi),
            this.initApi('testEntityLvl2SingleLinkApi', TestEntityLvl2SingleLinkApi_1.TestEntityLvl2SingleLinkApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get testEntityLvl2SingleLinkApi() {
        return this.initApi('testEntityLvl2SingleLinkApi', TestEntityLvl2SingleLinkApi_1.TestEntityLvl2SingleLinkApi);
    }
    get testEntityWithSharedEntityType1Api() {
        return this.initApi('testEntityWithSharedEntityType1Api', TestEntityWithSharedEntityType1Api_1.TestEntityWithSharedEntityType1Api);
    }
    get testEntityWithSharedEntityType2Api() {
        return this.initApi('testEntityWithSharedEntityType2Api', TestEntityWithSharedEntityType2Api_1.TestEntityWithSharedEntityType2Api);
    }
    get testEntityCircularLinkParentApi() {
        const api = this.initApi('testEntityCircularLinkParentApi', TestEntityCircularLinkParentApi_1.TestEntityCircularLinkParentApi);
        const linkedApis = [
            this.initApi('testEntityCircularLinkChildApi', TestEntityCircularLinkChildApi_1.TestEntityCircularLinkChildApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get testEntityCircularLinkChildApi() {
        const api = this.initApi('testEntityCircularLinkChildApi', TestEntityCircularLinkChildApi_1.TestEntityCircularLinkChildApi);
        const linkedApis = [
            this.initApi('testEntityCircularLinkChildApi', TestEntityCircularLinkChildApi_1.TestEntityCircularLinkChildApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get testEntityEndsWithApi() {
        return this.initApi('testEntityEndsWithApi', TestEntityEndsWithApi_1.TestEntityEndsWithApi);
    }
    get testEntityEndsWithSomethingElseApi() {
        return this.initApi('testEntityEndsWithSomethingElseApi', TestEntityEndsWithSomethingElseApi_1.TestEntityEndsWithSomethingElseApi);
    }
    get caseTestApi() {
        return this.initApi('caseTestApi', CaseTestApi_1.CaseTestApi);
    }
    get casetest_1Api() {
        return this.initApi('casetest_1Api', Casetest_1Api_1.Casetest_1Api);
    }
    get functionImports() {
        return { testFunctionImportNoReturnType: (parameter) => (0, function_imports_1.testFunctionImportNoReturnType)(parameter, this.deSerializers), testFunctionImportEdmReturnType: (parameter) => (0, function_imports_1.testFunctionImportEdmReturnType)(parameter, this.deSerializers), testFunctionImportEdmReturnTypeCollection: (parameter) => (0, function_imports_1.testFunctionImportEdmReturnTypeCollection)(parameter, this.deSerializers), testFunctionImportEntityReturnType: (parameter) => (0, function_imports_1.testFunctionImportEntityReturnType)(parameter, this.deSerializers), testFunctionImportEntityReturnTypeCollection: (parameter) => (0, function_imports_1.testFunctionImportEntityReturnTypeCollection)(parameter, this.deSerializers), testFunctionImportSharedEntityReturnType: (parameter) => (0, function_imports_1.testFunctionImportSharedEntityReturnType)(parameter, this.deSerializers), testFunctionImportSharedEntityReturnTypeCollection: (parameter) => (0, function_imports_1.testFunctionImportSharedEntityReturnTypeCollection)(parameter, this.deSerializers), testFunctionImportComplexReturnType: (parameter) => (0, function_imports_1.testFunctionImportComplexReturnType)(parameter, this.deSerializers), testFunctionImportUnsupportedEdmTypes: (parameter) => (0, function_imports_1.testFunctionImportUnsupportedEdmTypes)(parameter, this.deSerializers), testFunctionImportComplexReturnTypeCollection: (parameter) => (0, function_imports_1.testFunctionImportComplexReturnTypeCollection)(parameter, this.deSerializers), testFunctionImportGet: (parameter) => (0, function_imports_1.testFunctionImportGet)(parameter, this.deSerializers), testFunctionImportPost: (parameter) => (0, function_imports_1.testFunctionImportPost)(parameter, this.deSerializers), testFunctionImportMultipleParams: (parameter) => (0, function_imports_1.testFunctionImportMultipleParams)(parameter, this.deSerializers), createTestComplexType: (parameter) => (0, function_imports_1.createTestComplexType)(parameter, this.deSerializers), fContinue: (parameter) => (0, function_imports_1.fContinue)(parameter, this.deSerializers) };
    }
    get batch() {
        return BatchRequest_1.batch;
    }
}
exports.TestService = TestService;
//# sourceMappingURL=service.js.map