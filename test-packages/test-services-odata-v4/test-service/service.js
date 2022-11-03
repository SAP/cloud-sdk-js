"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testService = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntityApi_1 = require("./TestEntityApi");
const TestEntityWithEnumKeyApi_1 = require("./TestEntityWithEnumKeyApi");
const TestEntityWithSharedEntityType1Api_1 = require("./TestEntityWithSharedEntityType1Api");
const TestEntityWithSharedEntityType2Api_1 = require("./TestEntityWithSharedEntityType2Api");
const TestEntityMultiLinkApi_1 = require("./TestEntityMultiLinkApi");
const TestEntityOtherMultiLinkApi_1 = require("./TestEntityOtherMultiLinkApi");
const TestEntityLvl2MultiLinkApi_1 = require("./TestEntityLvl2MultiLinkApi");
const TestEntityLvl3MultiLinkApi_1 = require("./TestEntityLvl3MultiLinkApi");
const TestEntitySingleLinkApi_1 = require("./TestEntitySingleLinkApi");
const TestEntityLvl2SingleLinkApi_1 = require("./TestEntityLvl2SingleLinkApi");
const TestEntityCircularLinkParentApi_1 = require("./TestEntityCircularLinkParentApi");
const TestEntityCircularLinkChildApi_1 = require("./TestEntityCircularLinkChildApi");
const TestEntityEndsWithApi_1 = require("./TestEntityEndsWithApi");
const TestEntityEndsWithSomethingElseApi_1 = require("./TestEntityEndsWithSomethingElseApi");
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
            this.initApi('testEntityMultiLinkApi', TestEntityMultiLinkApi_1.TestEntityMultiLinkApi),
            this.initApi('testEntityMultiLinkApi', TestEntityMultiLinkApi_1.TestEntityMultiLinkApi),
            this.initApi('testEntitySingleLinkApi', TestEntitySingleLinkApi_1.TestEntitySingleLinkApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get testEntityWithEnumKeyApi() {
        return this.initApi('testEntityWithEnumKeyApi', TestEntityWithEnumKeyApi_1.TestEntityWithEnumKeyApi);
    }
    get testEntityWithSharedEntityType1Api() {
        return this.initApi('testEntityWithSharedEntityType1Api', TestEntityWithSharedEntityType1Api_1.TestEntityWithSharedEntityType1Api);
    }
    get testEntityWithSharedEntityType2Api() {
        return this.initApi('testEntityWithSharedEntityType2Api', TestEntityWithSharedEntityType2Api_1.TestEntityWithSharedEntityType2Api);
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
        const api = this.initApi('testEntityLvl2MultiLinkApi', TestEntityLvl2MultiLinkApi_1.TestEntityLvl2MultiLinkApi);
        const linkedApis = [
            this.initApi('testEntityLvl3MultiLinkApi', TestEntityLvl3MultiLinkApi_1.TestEntityLvl3MultiLinkApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get testEntityLvl3MultiLinkApi() {
        return this.initApi('testEntityLvl3MultiLinkApi', TestEntityLvl3MultiLinkApi_1.TestEntityLvl3MultiLinkApi);
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
    get testEntityCircularLinkParentApi() {
        const api = this.initApi('testEntityCircularLinkParentApi', TestEntityCircularLinkParentApi_1.TestEntityCircularLinkParentApi);
        const linkedApis = [
            this.initApi('testEntityCircularLinkChildApi', TestEntityCircularLinkChildApi_1.TestEntityCircularLinkChildApi),
            this.initApi('testEntityCircularLinkChildApi', TestEntityCircularLinkChildApi_1.TestEntityCircularLinkChildApi)
        ];
        api._addNavigationProperties(linkedApis);
        return api;
    }
    get testEntityCircularLinkChildApi() {
        const api = this.initApi('testEntityCircularLinkChildApi', TestEntityCircularLinkChildApi_1.TestEntityCircularLinkChildApi);
        const linkedApis = [
            this.initApi('testEntityCircularLinkParentApi', TestEntityCircularLinkParentApi_1.TestEntityCircularLinkParentApi)
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
    get functionImports() {
        return {
            testFunctionImportEdmReturnType: (parameter) => (0, function_imports_1.testFunctionImportEdmReturnType)(parameter, this.deSerializers),
            testFunctionImportEdmReturnTypeCollection: (parameter) => (0, function_imports_1.testFunctionImportEdmReturnTypeCollection)(parameter, this.deSerializers),
            testFunctionImportNullableTest: (parameter) => (0, function_imports_1.testFunctionImportNullableTest)(parameter, this.deSerializers),
            testFunctionImportEntityReturnType: (parameter) => (0, function_imports_1.testFunctionImportEntityReturnType)(parameter, this.deSerializers),
            testFunctionImportEntityReturnTypeCollection: (parameter) => (0, function_imports_1.testFunctionImportEntityReturnTypeCollection)(parameter, this.deSerializers),
            testFunctionImportSharedEntityReturnType: (parameter) => (0, function_imports_1.testFunctionImportSharedEntityReturnType)(parameter, this.deSerializers),
            testFunctionImportSharedEntityReturnTypeCollection: (parameter) => (0, function_imports_1.testFunctionImportSharedEntityReturnTypeCollection)(parameter, this.deSerializers),
            testFunctionImportComplexReturnType: (parameter) => (0, function_imports_1.testFunctionImportComplexReturnType)(parameter, this.deSerializers),
            testFunctionImportComplexReturnTypeCollection: (parameter) => (0, function_imports_1.testFunctionImportComplexReturnTypeCollection)(parameter, this.deSerializers),
            testFunctionImportMultipleParams: (parameter) => (0, function_imports_1.testFunctionImportMultipleParams)(parameter, this.deSerializers),
            testFunctionImportWithDifferentName: (parameter) => (0, function_imports_1.testFunctionImportWithDifferentName)(parameter, this.deSerializers)
        };
    }
    get actionImports() {
        return {
            testActionImportNoParameterNoReturnType: (parameter) => (0, action_imports_1.testActionImportNoParameterNoReturnType)(parameter, this.deSerializers),
            testActionImportMultipleParameterComplexReturnType: (parameter) => (0, action_imports_1.testActionImportMultipleParameterComplexReturnType)(parameter, this.deSerializers),
            testActionImportUnsupportedEdmTypes: (parameter) => (0, action_imports_1.testActionImportUnsupportedEdmTypes)(parameter, this.deSerializers),
            testActionImportNoParameterEntityReturnType: (parameter) => (0, action_imports_1.testActionImportNoParameterEntityReturnType)(parameter, this.deSerializers),
            testActionImportSharedEntityReturnType: (parameter) => (0, action_imports_1.testActionImportSharedEntityReturnType)(parameter, this.deSerializers),
            testActionImportSharedEntityReturnTypeCollection: (parameter) => (0, action_imports_1.testActionImportSharedEntityReturnTypeCollection)(parameter, this.deSerializers),
            testActionImportNullableTest: (parameter) => (0, action_imports_1.testActionImportNullableTest)(parameter, this.deSerializers)
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