"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionImports = exports.createTestEntityByIdReturnId = exports.createTestEntityById = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const service_1 = require("./service");
/**
 * Create Test Entity By Id.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function createTestEntityById(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {
        id: new odata_v4_1.ActionImportParameter('id', 'Edm.Int32', parameters.id)
    };
    return new odata_v4_1.ActionImportRequestBuilder('/odata/test-service', 'createTestEntityById', (data) => (0, odata_v4_1.transformReturnValueForEntity)(data, (0, service_1.testService)(deSerializers).testEntityApi), params, deSerializers);
}
exports.createTestEntityById = createTestEntityById;
/**
 * Create Test Entity By Id Return Id.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function createTestEntityByIdReturnId(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {
        id: new odata_v4_1.ActionImportParameter('id', 'Edm.Int32', parameters.id)
    };
    return new odata_v4_1.ActionImportRequestBuilder('/odata/test-service', 'createTestEntityByIdReturnId', (data) => (0, odata_v4_1.transformReturnValueForEdmType)(data, (val) => (0, odata_v4_1.edmToTs)(val.value, 'Edm.Int32', deSerializers)), params, deSerializers);
}
exports.createTestEntityByIdReturnId = createTestEntityByIdReturnId;
exports.actionImports = {
    createTestEntityById,
    createTestEntityByIdReturnId
};
//# sourceMappingURL=action-imports.js.map