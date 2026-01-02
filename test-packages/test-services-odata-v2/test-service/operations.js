"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operations = void 0;
exports.testFunctionImportNoReturnType = testFunctionImportNoReturnType;
exports.testFunctionImportEdmReturnType = testFunctionImportEdmReturnType;
exports.testFunctionImportEdmReturnTypeCollection = testFunctionImportEdmReturnTypeCollection;
exports.testFunctionImportEntityReturnType = testFunctionImportEntityReturnType;
exports.testFunctionImportEntityReturnTypeCollection = testFunctionImportEntityReturnTypeCollection;
exports.testFunctionImportSharedEntityReturnType = testFunctionImportSharedEntityReturnType;
exports.testFunctionImportSharedEntityReturnTypeCollection = testFunctionImportSharedEntityReturnTypeCollection;
exports.testFunctionImportComplexReturnType = testFunctionImportComplexReturnType;
exports.testFunctionImportUnsupportedEdmTypes = testFunctionImportUnsupportedEdmTypes;
exports.testFunctionImportComplexReturnTypeCollection = testFunctionImportComplexReturnTypeCollection;
exports.testFunctionImportGet = testFunctionImportGet;
exports.testFunctionImportPost = testFunctionImportPost;
exports.testFunctionImportMultipleParams = testFunctionImportMultipleParams;
exports.createTestComplexType = createTestComplexType;
exports.fContinue = fContinue;
/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const service_1 = require("./service");
const TestComplexType_1 = require("./TestComplexType");
/**
 * Test Function Import No Return Type.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportNoReturnType(parameters, deSerializers = odata_v2_1.defaultDeSerializers) {
    const params = {};
    return new odata_v2_1.OperationRequestBuilder('post', '/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportNoReturnType', data => (0, odata_v2_1.transformReturnValueForUndefined)(data, val => undefined), params, deSerializers);
}
/**
 * Test Function Import Edm Return Type.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportEdmReturnType(parameters, deSerializers = odata_v2_1.defaultDeSerializers) {
    const params = {};
    return new odata_v2_1.OperationRequestBuilder('get', '/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportEdmReturnType', data => (0, odata_v2_1.transformReturnValueForEdmType)(data, val => (0, odata_v2_1.edmToTs)(val.TestFunctionImportEdmReturnType, 'Edm.Boolean', deSerializers)), params, deSerializers);
}
/**
 * Test Function Import Edm Return Type Collection.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportEdmReturnTypeCollection(parameters, deSerializers = odata_v2_1.defaultDeSerializers) {
    const params = {};
    return new odata_v2_1.OperationRequestBuilder('get', '/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportEdmReturnTypeCollection', data => (0, odata_v2_1.transformReturnValueForEdmTypeList)(data, val => (0, odata_v2_1.edmToTs)(val, 'Edm.String', deSerializers)), params, deSerializers);
}
/**
 * Test Function Import Entity Return Type.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportEntityReturnType(parameters, deSerializers = odata_v2_1.defaultDeSerializers) {
    const params = {};
    return new odata_v2_1.OperationRequestBuilder('get', '/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportEntityReturnType', data => (0, odata_v2_1.transformReturnValueForEntity)(data, (0, service_1.testService)(deSerializers).testEntityApi), params, deSerializers);
}
/**
 * Test Function Import Entity Return Type Collection.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportEntityReturnTypeCollection(parameters, deSerializers = odata_v2_1.defaultDeSerializers) {
    const params = {};
    return new odata_v2_1.OperationRequestBuilder('get', '/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportEntityReturnTypeCollection', data => (0, odata_v2_1.transformReturnValueForEntityList)(data, (0, service_1.testService)(deSerializers).testEntityApi), params, deSerializers);
}
/**
 * Test Function Import Shared Entity Return Type. The 'execute' method does not exist for this function import. Please use 'executeRaw' to get the raw response.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportSharedEntityReturnType(parameters, deSerializers = odata_v2_1.defaultDeSerializers) {
    const params = {};
    return new odata_v2_1.OperationRequestBuilder('get', '/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportSharedEntityReturnType', data => (0, odata_v2_1.throwErrorWhenReturnTypeIsUnionType)(data, 'TestFunctionImportSharedEntityReturnType'), params, deSerializers);
}
/**
 * Test Function Import Shared Entity Return Type Collection. The 'execute' method does not exist for this function import. Please use 'executeRaw' to get the raw response.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportSharedEntityReturnTypeCollection(parameters, deSerializers = odata_v2_1.defaultDeSerializers) {
    const params = {};
    return new odata_v2_1.OperationRequestBuilder('get', '/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportSharedEntityReturnTypeCollection', data => (0, odata_v2_1.throwErrorWhenReturnTypeIsUnionType)(data, 'TestFunctionImportSharedEntityReturnTypeCollection'), params, deSerializers);
}
/**
 * Test Function Import Complex Return Type.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportComplexReturnType(parameters, deSerializers = odata_v2_1.defaultDeSerializers) {
    const params = {};
    return new odata_v2_1.OperationRequestBuilder('get', '/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportComplexReturnType', data => (0, odata_v2_1.transformReturnValueForComplexType)(data, data => (0, odata_v2_1.entityDeserializer)(deSerializers || odata_v2_1.defaultDeSerializers).deserializeComplexType(data, TestComplexType_1.TestComplexType)), params, deSerializers);
}
/**
 * Test Function Import Unsupported Edm Types.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportUnsupportedEdmTypes(parameters, deSerializers = odata_v2_1.defaultDeSerializers) {
    const params = {
        simpleParam: new odata_v2_1.OperationParameter('SimpleParam', 'Edm.Any', parameters.simpleParam)
    };
    return new odata_v2_1.OperationRequestBuilder('get', '/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportUnsupportedEdmTypes', data => (0, odata_v2_1.transformReturnValueForEdmType)(data, val => (0, odata_v2_1.edmToTs)(val.TestFunctionImportUnsupportedEdmTypes, 'Edm.Any', deSerializers)), params, deSerializers);
}
/**
 * Test Function Import Complex Return Type Collection.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportComplexReturnTypeCollection(parameters, deSerializers = odata_v2_1.defaultDeSerializers) {
    const params = {};
    return new odata_v2_1.OperationRequestBuilder('get', '/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportComplexReturnTypeCollection', data => (0, odata_v2_1.transformReturnValueForComplexTypeList)(data, data => (0, odata_v2_1.entityDeserializer)(deSerializers || odata_v2_1.defaultDeSerializers).deserializeComplexType(data, TestComplexType_1.TestComplexType)), params, deSerializers);
}
/**
 * Test Function Import Get.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportGet(parameters, deSerializers = odata_v2_1.defaultDeSerializers) {
    const params = {
        simpleParam: new odata_v2_1.OperationParameter('SimpleParam', 'Edm.String', parameters.simpleParam)
    };
    return new odata_v2_1.OperationRequestBuilder('get', '/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportGET', data => (0, odata_v2_1.transformReturnValueForEdmType)(data, val => (0, odata_v2_1.edmToTs)(val.TestFunctionImportGET, 'Edm.Boolean', deSerializers)), params, deSerializers);
}
/**
 * Test Function Import Post.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportPost(parameters, deSerializers = odata_v2_1.defaultDeSerializers) {
    const params = {
        simpleParam: new odata_v2_1.OperationParameter('SimpleParam', 'Edm.String', parameters.simpleParam)
    };
    return new odata_v2_1.OperationRequestBuilder('post', '/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportPOST', data => (0, odata_v2_1.transformReturnValueForEdmType)(data, val => (0, odata_v2_1.edmToTs)(val.TestFunctionImportPOST, 'Edm.Boolean', deSerializers)), params, deSerializers);
}
/**
 * Test Function Import Multiple Params.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportMultipleParams(parameters, deSerializers = odata_v2_1.defaultDeSerializers) {
    const params = {
        stringParam: new odata_v2_1.OperationParameter('StringParam', 'Edm.String', parameters.stringParam),
        booleanParam: new odata_v2_1.OperationParameter('BooleanParam', 'Edm.Boolean', parameters.booleanParam)
    };
    return new odata_v2_1.OperationRequestBuilder('get', '/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportMultipleParams', data => (0, odata_v2_1.transformReturnValueForEdmType)(data, val => (0, odata_v2_1.edmToTs)(val.TestFunctionImportMultipleParams, 'Edm.Boolean', deSerializers)), params, deSerializers);
}
/**
 * Create Test Complex Type.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function createTestComplexType(parameters, deSerializers = odata_v2_1.defaultDeSerializers) {
    const params = {};
    return new odata_v2_1.OperationRequestBuilder('get', '/sap/opu/odata/sap/API_TEST_SRV', 'CreateTestComplexType', data => (0, odata_v2_1.transformReturnValueForComplexType)(data, data => (0, odata_v2_1.entityDeserializer)(deSerializers || odata_v2_1.defaultDeSerializers).deserializeComplexType(data, TestComplexType_1.TestComplexType)), params, deSerializers);
}
/**
 * Continue.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function fContinue(parameters, deSerializers = odata_v2_1.defaultDeSerializers) {
    const params = {};
    return new odata_v2_1.OperationRequestBuilder('get', '/sap/opu/odata/sap/API_TEST_SRV', 'Continue', data => (0, odata_v2_1.transformReturnValueForEdmType)(data, val => (0, odata_v2_1.edmToTs)(val.Continue, 'Edm.Boolean', deSerializers)), params, deSerializers);
}
exports.operations = {
    testFunctionImportNoReturnType,
    testFunctionImportEdmReturnType,
    testFunctionImportEdmReturnTypeCollection,
    testFunctionImportEntityReturnType,
    testFunctionImportEntityReturnTypeCollection,
    testFunctionImportSharedEntityReturnType,
    testFunctionImportSharedEntityReturnTypeCollection,
    testFunctionImportComplexReturnType,
    testFunctionImportUnsupportedEdmTypes,
    testFunctionImportComplexReturnTypeCollection,
    testFunctionImportGet,
    testFunctionImportPost,
    testFunctionImportMultipleParams,
    createTestComplexType,
    fContinue
};
//# sourceMappingURL=operations.js.map