"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionImports = exports.createTestEntityReturnId = exports.createTestEntity = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
var TestEntity_1 = require("./TestEntity");
/**
 * Create Test Entity.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function createTestEntity(parameters) {
    var params = {
        id: new core_1.ActionImportParameter('id', 'Edm.Int32', parameters.id)
    };
    return new core_1.ActionImportRequestBuilder('/odata/test-service', 'createTestEntity', function (data) { return core_1.transformReturnValueForEntity(data, TestEntity_1.TestEntity); }, params);
}
exports.createTestEntity = createTestEntity;
/**
 * Create Test Entity Return Id.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function createTestEntityReturnId(parameters) {
    var params = {
        id: new core_1.ActionImportParameter('id', 'Edm.Int32', parameters.id)
    };
    return new core_1.ActionImportRequestBuilder('/odata/test-service', 'createTestEntityReturnId', function (data) { return core_1.transformReturnValueForEdmType(data, function (val) { return core_1.edmToTsV4(val.value, 'Edm.Int32'); }); }, params);
}
exports.createTestEntityReturnId = createTestEntityReturnId;
exports.actionImports = {
    createTestEntity: createTestEntity,
    createTestEntityReturnId: createTestEntityReturnId
};
//# sourceMappingURL=action-imports.js.map