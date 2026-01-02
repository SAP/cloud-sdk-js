"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operations = void 0;
exports.testFunctionImportEdmReturnType = testFunctionImportEdmReturnType;
exports.testFunctionImportEdmReturnTypeCollection = testFunctionImportEdmReturnTypeCollection;
exports.testFunctionImportNullableTest = testFunctionImportNullableTest;
exports.testFunctionImportEntityReturnType = testFunctionImportEntityReturnType;
exports.testFunctionImportEntityReturnTypeCollection = testFunctionImportEntityReturnTypeCollection;
exports.testFunctionImportSharedEntityReturnType = testFunctionImportSharedEntityReturnType;
exports.testFunctionImportSharedEntityReturnTypeCollection = testFunctionImportSharedEntityReturnTypeCollection;
exports.testFunctionImportComplexReturnType = testFunctionImportComplexReturnType;
exports.testFunctionImportComplexReturnTypeCollection = testFunctionImportComplexReturnTypeCollection;
exports.testFunctionImportMultipleParams = testFunctionImportMultipleParams;
exports.testFunctionImportWithDifferentName = testFunctionImportWithDifferentName;
exports.testActionImportNoParameterNoReturnType = testActionImportNoParameterNoReturnType;
exports.testActionImportMultipleParameterComplexReturnType = testActionImportMultipleParameterComplexReturnType;
exports.testActionImportUnsupportedEdmTypes = testActionImportUnsupportedEdmTypes;
exports.testActionImportNoParameterEntityReturnType = testActionImportNoParameterEntityReturnType;
exports.testActionImportSharedEntityReturnType = testActionImportSharedEntityReturnType;
exports.testActionImportSharedEntityReturnTypeCollection = testActionImportSharedEntityReturnTypeCollection;
exports.testActionImportNullableTest = testActionImportNullableTest;
/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const service_1 = require("./service");
const TestComplexType_1 = require("./TestComplexType");
/**
 * Test Function Import Edm Return Type.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportEdmReturnType(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {};
    return new odata_v4_1.OperationRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportEdmReturnType', data => (0, odata_v4_1.transformReturnValueForEdmType)(data, val => (0, odata_v4_1.edmToTs)(val.value, 'Edm.Boolean', deSerializers)), params, deSerializers, 'function');
}
/**
 * Test Function Import Edm Return Type Collection.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportEdmReturnTypeCollection(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {};
    return new odata_v4_1.OperationRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportEdmReturnTypeCollection', data => (0, odata_v4_1.transformReturnValueForEdmTypeList)(data, val => (0, odata_v4_1.edmToTs)(val, 'Edm.String', deSerializers)), params, deSerializers, 'function');
}
/**
 * Test Function Import Nullable Test.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportNullableTest(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {
        nullablePerDefault: new odata_v4_1.OperationParameter('NullablePerDefault', 'Edm.String', parameters.nullablePerDefault),
        nullableExplicit: new odata_v4_1.OperationParameter('NullableExplicit', 'Edm.String', parameters.nullableExplicit),
        nonNullable: new odata_v4_1.OperationParameter('NonNullable', 'Edm.String', parameters.nonNullable)
    };
    return new odata_v4_1.OperationRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportNullableTest', data => (0, odata_v4_1.transformReturnValueForEdmTypeList)(data, val => (0, odata_v4_1.edmToTs)(val, 'Edm.String', deSerializers)), params, deSerializers, 'function');
}
/**
 * Test Function Import Entity Return Type.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportEntityReturnType(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {};
    return new odata_v4_1.OperationRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportEntityReturnType', data => (0, odata_v4_1.transformReturnValueForEntity)(data, (0, service_1.testService)(deSerializers).testEntityApi), params, deSerializers, 'function');
}
/**
 * Test Function Import Entity Return Type Collection.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportEntityReturnTypeCollection(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {};
    return new odata_v4_1.OperationRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportEntityReturnTypeCollection', data => (0, odata_v4_1.transformReturnValueForEntityList)(data, (0, service_1.testService)(deSerializers).testEntityApi), params, deSerializers, 'function');
}
/**
 * Test Function Import Shared Entity Return Type. The 'execute' method does not exist for this function import. Please use 'executeRaw' to get the raw response.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportSharedEntityReturnType(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {};
    return new odata_v4_1.OperationRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportSharedEntityReturnType', data => (0, odata_v4_1.throwErrorWhenReturnTypeIsUnionType)(data, 'TestFunctionImportSharedEntityReturnType'), params, deSerializers, 'function');
}
/**
 * Test Function Import Shared Entity Return Type Collection. The 'execute' method does not exist for this function import. Please use 'executeRaw' to get the raw response.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportSharedEntityReturnTypeCollection(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {};
    return new odata_v4_1.OperationRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportSharedEntityReturnTypeCollection', data => (0, odata_v4_1.throwErrorWhenReturnTypeIsUnionType)(data, 'TestFunctionImportSharedEntityReturnTypeCollection'), params, deSerializers, 'function');
}
/**
 * Test Function Import Complex Return Type.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportComplexReturnType(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {};
    return new odata_v4_1.OperationRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportComplexReturnType', data => (0, odata_v4_1.transformReturnValueForComplexType)(data, data => (0, odata_v4_1.entityDeserializer)(deSerializers || odata_v4_1.defaultDeSerializers).deserializeComplexType(data, TestComplexType_1.TestComplexType)), params, deSerializers, 'function');
}
/**
 * Test Function Import Complex Return Type Collection.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportComplexReturnTypeCollection(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {};
    return new odata_v4_1.OperationRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportComplexReturnTypeCollection', data => (0, odata_v4_1.transformReturnValueForComplexTypeList)(data, data => (0, odata_v4_1.entityDeserializer)(deSerializers || odata_v4_1.defaultDeSerializers).deserializeComplexType(data, TestComplexType_1.TestComplexType)), params, deSerializers, 'function');
}
/**
 * Test Function Import Multiple Params.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportMultipleParams(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {
        stringParam: new odata_v4_1.OperationParameter('StringParam', 'Edm.String', parameters.stringParam),
        nonNullableStringParam: new odata_v4_1.OperationParameter('NonNullableStringParam', 'Edm.String', parameters.nonNullableStringParam),
        nullableBooleanParam: new odata_v4_1.OperationParameter('NullableBooleanParam', 'Edm.Boolean', parameters.nullableBooleanParam),
        nullableGeographyPointParam: new odata_v4_1.OperationParameter('NullableGeographyPointParam', 'Edm.Any', parameters.nullableGeographyPointParam)
    };
    return new odata_v4_1.OperationRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportMultipleParams', data => (0, odata_v4_1.transformReturnValueForEdmType)(data, val => (0, odata_v4_1.edmToTs)(val.value, 'Edm.Boolean', deSerializers)), params, deSerializers, 'function');
}
/**
 * Test Function Import With Different Name.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportWithDifferentName(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {};
    return new odata_v4_1.OperationRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportWithDifferentName', data => (0, odata_v4_1.transformReturnValueForUndefined)(data, val => undefined), params, deSerializers, 'function');
}
/**
 * Test Action Import No Parameter No Return Type.
 * @param parameters - Object containing all parameters for the action.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testActionImportNoParameterNoReturnType(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {};
    return new odata_v4_1.OperationRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestActionImportNoParameterNoReturnType', data => (0, odata_v4_1.transformReturnValueForUndefined)(data, val => undefined), params, deSerializers, 'action');
}
/**
 * Test Action Import Multiple Parameter Complex Return Type.
 * @param parameters - Object containing all parameters for the action.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testActionImportMultipleParameterComplexReturnType(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {
        stringParam: new odata_v4_1.OperationParameter('StringParam', 'Edm.String', parameters.stringParam),
        nonNullableStringParam: new odata_v4_1.OperationParameter('NonNullableStringParam', 'Edm.String', parameters.nonNullableStringParam),
        nullableBooleanParam: new odata_v4_1.OperationParameter('NullableBooleanParam', 'Edm.Boolean', parameters.nullableBooleanParam),
        nullableGeographyPointParam: new odata_v4_1.OperationParameter('NullableGeographyPointParam', 'Edm.Any', parameters.nullableGeographyPointParam)
    };
    return new odata_v4_1.OperationRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestActionImportMultipleParameterComplexReturnType', data => (0, odata_v4_1.transformReturnValueForComplexType)(data, data => (0, odata_v4_1.entityDeserializer)(deSerializers || odata_v4_1.defaultDeSerializers).deserializeComplexType(data, TestComplexType_1.TestComplexType)), params, deSerializers, 'action');
}
/**
 * Test Action Import Unsupported Edm Types.
 * @param parameters - Object containing all parameters for the action.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testActionImportUnsupportedEdmTypes(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {
        simpleParam: new odata_v4_1.OperationParameter('SimpleParam', 'Edm.Any', parameters.simpleParam)
    };
    return new odata_v4_1.OperationRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestActionImportUnsupportedEdmTypes', data => (0, odata_v4_1.transformReturnValueForEdmType)(data, val => (0, odata_v4_1.edmToTs)(val.value, 'Edm.Any', deSerializers)), params, deSerializers, 'action');
}
/**
 * Test Action Import No Parameter Entity Return Type.
 * @param parameters - Object containing all parameters for the action.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testActionImportNoParameterEntityReturnType(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {};
    return new odata_v4_1.OperationRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestActionImportNoParameterEntityReturnType', data => (0, odata_v4_1.transformReturnValueForEntity)(data, (0, service_1.testService)(deSerializers).testEntityApi), params, deSerializers, 'action');
}
/**
 * Test Action Import Shared Entity Return Type. The 'execute' method does not exist for this action import. Please use 'executeRaw' to get the raw response.
 * @param parameters - Object containing all parameters for the action.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testActionImportSharedEntityReturnType(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {};
    return new odata_v4_1.OperationRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestActionImportSharedEntityReturnType', data => (0, odata_v4_1.throwErrorWhenReturnTypeIsUnionType)(data, 'TestActionImportSharedEntityReturnType'), params, deSerializers, 'action');
}
/**
 * Test Action Import Shared Entity Return Type Collection. The 'execute' method does not exist for this action import. Please use 'executeRaw' to get the raw response.
 * @param parameters - Object containing all parameters for the action.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testActionImportSharedEntityReturnTypeCollection(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {};
    return new odata_v4_1.OperationRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestActionImportSharedEntityReturnTypeCollection', data => (0, odata_v4_1.throwErrorWhenReturnTypeIsUnionType)(data, 'TestActionImportSharedEntityReturnTypeCollection'), params, deSerializers, 'action');
}
/**
 * Test Action Import Nullable Test.
 * @param parameters - Object containing all parameters for the action.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testActionImportNullableTest(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {
        nullablePerDefault: new odata_v4_1.OperationParameter('NullablePerDefault', 'Edm.String', parameters.nullablePerDefault),
        nullableExplicit: new odata_v4_1.OperationParameter('NullableExplicit', 'Edm.String', parameters.nullableExplicit),
        nonNullable: new odata_v4_1.OperationParameter('NonNullable', 'Edm.String', parameters.nonNullable)
    };
    return new odata_v4_1.OperationRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestActionImportNullableTest', data => (0, odata_v4_1.transformReturnValueForComplexType)(data, data => (0, odata_v4_1.entityDeserializer)(deSerializers || odata_v4_1.defaultDeSerializers).deserializeComplexType(data, TestComplexType_1.TestComplexType)), params, deSerializers, 'action');
}
exports.operations = {
    testFunctionImportEdmReturnType,
    testFunctionImportEdmReturnTypeCollection,
    testFunctionImportNullableTest,
    testFunctionImportEntityReturnType,
    testFunctionImportEntityReturnTypeCollection,
    testFunctionImportSharedEntityReturnType,
    testFunctionImportSharedEntityReturnTypeCollection,
    testFunctionImportComplexReturnType,
    testFunctionImportComplexReturnTypeCollection,
    testFunctionImportMultipleParams,
    testFunctionImportWithDifferentName,
    testActionImportNoParameterNoReturnType,
    testActionImportMultipleParameterComplexReturnType,
    testActionImportUnsupportedEdmTypes,
    testActionImportNoParameterEntityReturnType,
    testActionImportSharedEntityReturnType,
    testActionImportSharedEntityReturnTypeCollection,
    testActionImportNullableTest
};
//# sourceMappingURL=operations.js.map