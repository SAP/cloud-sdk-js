"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity = void 0;
/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const MyComplexReturnType_1 = require("./MyComplexReturnType");
/**
 * This class represents the entity "TestEntity" of service "TestService".
 */
class TestEntity extends odata_v4_1.Entity {
    constructor(_entityApi) {
        super(_entityApi);
    }
    /**
     * Bound Function Without Arguments.
     * @param parameters - Object containing all parameters for the function.
     * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
     */
    boundFunctionWithoutArguments(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
        const params = {};
        return new odata_v4_1.BoundOperationRequestBuilder(this._entityApi, this, 'boundFunctionWithoutArguments', data => (0, odata_v4_1.transformReturnValueForEdmType)(data, val => (0, odata_v4_1.edmToTs)(val.value, 'Edm.String', deSerializers)), params, deSerializers, 'function');
    }
    /**
     * Bound Function Without Arguments Complex Return Type.
     * @param parameters - Object containing all parameters for the function.
     * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
     */
    boundFunctionWithoutArgumentsComplexReturnType(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
        const params = {};
        return new odata_v4_1.BoundOperationRequestBuilder(this._entityApi, this, 'boundFunctionWithoutArgumentsComplexReturnType', data => (0, odata_v4_1.transformReturnValueForComplexType)(data, data => (0, odata_v4_1.entityDeserializer)(deSerializers || odata_v4_1.defaultDeSerializers).deserializeComplexType(data, MyComplexReturnType_1.MyComplexReturnType)), params, deSerializers, 'function');
    }
    /**
     * Bound Function With Arguments.
     * @param parameters - Object containing all parameters for the function.
     * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
     */
    boundFunctionWithArguments(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
        const params = {
            param1: new odata_v4_1.OperationParameter('param1', 'Edm.String', parameters.param1),
            param2: new odata_v4_1.OperationParameter('param2', 'Edm.String', parameters.param2)
        };
        return new odata_v4_1.BoundOperationRequestBuilder(this._entityApi, this, 'boundFunctionWithArguments', data => (0, odata_v4_1.transformReturnValueForEdmType)(data, val => (0, odata_v4_1.edmToTs)(val.value, 'Edm.String', deSerializers)), params, deSerializers, 'function');
    }
    /**
     * Bound Action Without Arguments.
     * @param parameters - Object containing all parameters for the action.
     * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
     */
    boundActionWithoutArguments(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
        const params = {};
        return new odata_v4_1.BoundOperationRequestBuilder(this._entityApi, this, 'boundActionWithoutArguments', data => (0, odata_v4_1.transformReturnValueForEdmType)(data, val => (0, odata_v4_1.edmToTs)(val.value, 'Edm.String', deSerializers)), params, deSerializers, 'action');
    }
}
exports.TestEntity = TestEntity;
/**
 * Technical entity name for TestEntity.
 */
TestEntity._entityName = 'TestEntity';
/**
 * Default url path for the according service.
 */
TestEntity._defaultBasePath = '/odata/test-service';
/**
 * All key fields of the TestEntity entity.
 */
TestEntity._keys = ['KeyTestEntity'];
//# sourceMappingURL=TestEntity.js.map