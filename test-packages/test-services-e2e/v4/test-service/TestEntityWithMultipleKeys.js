"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntityWithMultipleKeys = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * This class represents the entity "TestEntityWithMultipleKeys" of service "TestService".
 */
class TestEntityWithMultipleKeys extends odata_v4_1.Entity {
    constructor(_entityApi) {
        super(_entityApi);
        this._entityApi = _entityApi;
    }
    /**
     * Bound Function Without Arguments With Multiple Keys.
     * @param parameters - Object containing all parameters for the function.
     * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
     */
    boundFunctionWithoutArgumentsWithMultipleKeys(parameters, deSerializers) {
        const params = {};
        return new odata_v4_1.BoundFunctionImportRequestBuilder(this._entityApi, this, 'boundFunctionWithoutArgumentsWithMultipleKeys', data => (0, odata_v4_1.transformReturnValueForEdmType)(data, val => (0, odata_v4_1.edmToTs)(val.value, 'Edm.String', deSerializers || odata_v4_1.defaultDeSerializers)), params, deSerializers || odata_v4_1.defaultDeSerializers);
    }
    /**
     * Bound Function With Arguments With Multiple Keys.
     * @param parameters - Object containing all parameters for the function.
     * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
     */
    boundFunctionWithArgumentsWithMultipleKeys(parameters, deSerializers) {
        const params = {
            param1: new odata_v4_1.FunctionImportParameter('param1', 'Edm.String', parameters.param1),
            param2: new odata_v4_1.FunctionImportParameter('param2', 'Edm.String', parameters.param2)
        };
        return new odata_v4_1.BoundFunctionImportRequestBuilder(this._entityApi, this, 'boundFunctionWithArgumentsWithMultipleKeys', data => (0, odata_v4_1.transformReturnValueForEdmType)(data, val => (0, odata_v4_1.edmToTs)(val.value, 'Edm.String', deSerializers || odata_v4_1.defaultDeSerializers)), params, deSerializers || odata_v4_1.defaultDeSerializers);
    }
    /**
     * Bound Action Without Arguments With Multiple Keys.
     * @param parameters - Object containing all parameters for the action.
     * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
     */
    boundActionWithoutArgumentsWithMultipleKeys(parameters, deSerializers) {
        const params = {};
        return new odata_v4_1.BoundActionImportRequestBuilder(this._entityApi, this, 'boundActionWithoutArgumentsWithMultipleKeys', data => (0, odata_v4_1.transformReturnValueForEdmType)(data, val => (0, odata_v4_1.edmToTs)(val.value, 'Edm.String', deSerializers || odata_v4_1.defaultDeSerializers)), params, deSerializers || odata_v4_1.defaultDeSerializers);
    }
}
exports.TestEntityWithMultipleKeys = TestEntityWithMultipleKeys;
/**
 * Technical entity name for TestEntityWithMultipleKeys.
 */
TestEntityWithMultipleKeys._entityName = 'TestEntityWithMultipleKeys';
/**
 * Default url path for the according service.
 */
TestEntityWithMultipleKeys._defaultServicePath = '/odata/test-service';
/**
 * All key fields of the TestEntityWithMultipleKeys entity
 */
TestEntityWithMultipleKeys._keys = [
    'KeyTestEntityWithMultipleKeys',
    'StringPropertyWithMultipleKeys',
    'BooleanPropertyWithMultipleKeys'
];
//# sourceMappingURL=TestEntityWithMultipleKeys.js.map