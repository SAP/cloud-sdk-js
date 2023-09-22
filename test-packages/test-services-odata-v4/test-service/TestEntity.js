"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity = void 0;
/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * See https://api.sap.com/api/path for more information.
 */
class TestEntity extends odata_v4_1.Entity {
    /**
     * Technical entity name for TestEntity.
     */
    static _entityName = 'A_TestEntity';
    /**
     * Default url path for the according service.
     */
    static _defaultBasePath = '/sap/opu/odata/sap/API_TEST_SRV';
    /**
     * All key fields of the TestEntity entity
     */
    static _keys = ['KeyPropertyGuid', 'KeyPropertyString', 'KeyDateProperty'];
    constructor(_entityApi) {
        super(_entityApi);
    }
    /**
     * Bound Function Without Arguments.
     * @param parameters - Object containing all parameters for the function.
     * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
     */
    boundFunctionWithoutArguments(parameters, deSerializers) {
        const params = {};
        return new odata_v4_1.BoundOperationRequestBuilder(this._entityApi, this, 'boundFunctionWithoutArguments', data => (0, odata_v4_1.transformReturnValueForEdmType)(data, val => (0, odata_v4_1.edmToTs)(val.value, 'Edm.String', deSerializers || odata_v4_1.defaultDeSerializers)), params, deSerializers || odata_v4_1.defaultDeSerializers, 'function');
    }
    /**
     * Bound Function With Arguments.
     * @param parameters - Object containing all parameters for the function.
     * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
     */
    boundFunctionWithArguments(parameters, deSerializers) {
        const params = {
            param1: new odata_v4_1.OperationParameter('param1', 'Edm.String', parameters.param1),
            param2: new odata_v4_1.OperationParameter('param2', 'Edm.String', parameters.param2)
        };
        return new odata_v4_1.BoundOperationRequestBuilder(this._entityApi, this, 'boundFunctionWithArguments', data => (0, odata_v4_1.transformReturnValueForEdmType)(data, val => (0, odata_v4_1.edmToTs)(val.value, 'Edm.String', deSerializers || odata_v4_1.defaultDeSerializers)), params, deSerializers || odata_v4_1.defaultDeSerializers, 'function');
    }
    /**
     * Bound Action Without Arguments.
     * @param parameters - Object containing all parameters for the action.
     * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
     */
    boundActionWithoutArguments(parameters, deSerializers) {
        const params = {};
        return new odata_v4_1.BoundOperationRequestBuilder(this._entityApi, this, 'boundActionWithoutArguments', data => (0, odata_v4_1.transformReturnValueForEdmType)(data, val => (0, odata_v4_1.edmToTs)(val.value, 'Edm.String', deSerializers || odata_v4_1.defaultDeSerializers)), params, deSerializers || odata_v4_1.defaultDeSerializers, 'action');
    }
}
exports.TestEntity = TestEntity;
//# sourceMappingURL=TestEntity.js.map