"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operations = void 0;
exports.concatStrings = concatStrings;
exports.getAll = getAll;
exports.getByKey = getByKey;
exports.getByKeyWithMultipleKeys = getByKeyWithMultipleKeys;
exports.returnCollection = returnCollection;
exports.returnInt = returnInt;
exports.returnSapCloudSdk = returnSapCloudSdk;
exports.createTestEntityById = createTestEntityById;
exports.createTestEntityByIdReturnId = createTestEntityByIdReturnId;
/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const service_1 = require("./service");
/**
 * Concat Strings.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function concatStrings(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {
        str1: new odata_v4_1.OperationParameter('Str1', 'Edm.String', parameters.str1),
        str2: new odata_v4_1.OperationParameter('Str2', 'Edm.String', parameters.str2)
    };
    return new odata_v4_1.OperationRequestBuilder('/odata/test-service', 'concatStrings', data => (0, odata_v4_1.transformReturnValueForEdmType)(data, val => (0, odata_v4_1.edmToTs)(val.value, 'Edm.String', deSerializers)), params, deSerializers, 'function');
}
/**
 * Get All.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function getAll(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {};
    return new odata_v4_1.OperationRequestBuilder('/odata/test-service', 'getAll', data => (0, odata_v4_1.transformReturnValueForEntityList)(data, (0, service_1.testService)(deSerializers).testEntityApi), params, deSerializers, 'function');
}
/**
 * Get By Key.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function getByKey(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {
        param: new odata_v4_1.OperationParameter('param', 'Edm.Int32', parameters.param)
    };
    return new odata_v4_1.OperationRequestBuilder('/odata/test-service', 'getByKey', data => (0, odata_v4_1.transformReturnValueForEntity)(data, (0, service_1.testService)(deSerializers).testEntityApi), params, deSerializers, 'function');
}
/**
 * Get By Key With Multiple Keys.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function getByKeyWithMultipleKeys(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {
        keyTestEntityWithMultipleKeys: new odata_v4_1.OperationParameter('KeyTestEntityWithMultipleKeys', 'Edm.Int32', parameters.keyTestEntityWithMultipleKeys),
        stringPropertyWithMultipleKeys: new odata_v4_1.OperationParameter('StringPropertyWithMultipleKeys', 'Edm.String', parameters.stringPropertyWithMultipleKeys),
        booleanPropertyWithMultipleKeys: new odata_v4_1.OperationParameter('BooleanPropertyWithMultipleKeys', 'Edm.Boolean', parameters.booleanPropertyWithMultipleKeys)
    };
    return new odata_v4_1.OperationRequestBuilder('/odata/test-service', 'getByKeyWithMultipleKeys', data => (0, odata_v4_1.transformReturnValueForEntity)(data, (0, service_1.testService)(deSerializers).testEntityWithMultipleKeysApi), params, deSerializers, 'function');
}
/**
 * Return Collection.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function returnCollection(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {
        param: new odata_v4_1.OperationParameter('param', 'Edm.Int32', parameters.param)
    };
    return new odata_v4_1.OperationRequestBuilder('/odata/test-service', 'returnCollection', data => (0, odata_v4_1.transformReturnValueForEdmTypeList)(data, val => (0, odata_v4_1.edmToTs)(val, 'Edm.Int32', deSerializers)), params, deSerializers, 'function');
}
/**
 * Return Int.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function returnInt(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {
        param: new odata_v4_1.OperationParameter('param', 'Edm.Int32', parameters.param)
    };
    return new odata_v4_1.OperationRequestBuilder('/odata/test-service', 'returnInt', data => (0, odata_v4_1.transformReturnValueForEdmType)(data, val => (0, odata_v4_1.edmToTs)(val.value, 'Edm.Int32', deSerializers)), params, deSerializers, 'function');
}
/**
 * Return Sap Cloud Sdk.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function returnSapCloudSdk(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {};
    return new odata_v4_1.OperationRequestBuilder('/odata/test-service', 'returnSapCloudSdk', data => (0, odata_v4_1.transformReturnValueForEdmType)(data, val => (0, odata_v4_1.edmToTs)(val.value, 'Edm.String', deSerializers)), params, deSerializers, 'function');
}
/**
 * Create Test Entity By Id.
 * @param parameters - Object containing all parameters for the action.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function createTestEntityById(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {
        id: new odata_v4_1.OperationParameter('id', 'Edm.Int32', parameters.id)
    };
    return new odata_v4_1.OperationRequestBuilder('/odata/test-service', 'createTestEntityById', data => (0, odata_v4_1.transformReturnValueForEntity)(data, (0, service_1.testService)(deSerializers).testEntityApi), params, deSerializers, 'action');
}
/**
 * Create Test Entity By Id Return Id.
 * @param parameters - Object containing all parameters for the action.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function createTestEntityByIdReturnId(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {
        id: new odata_v4_1.OperationParameter('id', 'Edm.Int32', parameters.id)
    };
    return new odata_v4_1.OperationRequestBuilder('/odata/test-service', 'createTestEntityByIdReturnId', data => (0, odata_v4_1.transformReturnValueForEdmType)(data, val => (0, odata_v4_1.edmToTs)(val.value, 'Edm.Int32', deSerializers)), params, deSerializers, 'action');
}
exports.operations = {
    concatStrings,
    getAll,
    getByKey,
    getByKeyWithMultipleKeys,
    returnCollection,
    returnInt,
    returnSapCloudSdk,
    createTestEntityById,
    createTestEntityByIdReturnId
};
//# sourceMappingURL=operations.js.map