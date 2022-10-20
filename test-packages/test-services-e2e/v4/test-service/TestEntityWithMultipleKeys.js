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
    boundFunctionWithoutArguments_1() {
        const params = {};
        const deSerializers = odata_v4_1.defaultDeSerializers;
        return new odata_v4_1.BoundFunctionRequestBuilder(this._entityApi, this, 'TestService.boundFunctionWithoutArguments', (data) => data, params, deSerializers);
    }
    returnKey_1() {
        const params = {};
        const deSerializers = odata_v4_1.defaultDeSerializers;
        return new odata_v4_1.BoundFunctionRequestBuilder(this._entityApi, this, 'TestService.returnKey', (data) => data, params, deSerializers);
    }
    boundActionWithoutArguments_1() {
        const params = {};
        const deSerializers = odata_v4_1.defaultDeSerializers;
        return new odata_v4_1.BoundActionRequestBuilder(this._entityApi, this, 'TestService.boundActionWithoutArguments', (data) => data, params, deSerializers);
    }
    createTestEntityById_1() {
        const params = {};
        const deSerializers = odata_v4_1.defaultDeSerializers;
        return new odata_v4_1.BoundActionRequestBuilder(this._entityApi, this, 'TestService.createTestEntityById', (data) => data, params, deSerializers);
    }
    createTestEntityByIdReturnId_1() {
        const params = {};
        const deSerializers = odata_v4_1.defaultDeSerializers;
        return new odata_v4_1.BoundActionRequestBuilder(this._entityApi, this, 'TestService.createTestEntityByIdReturnId', (data) => data, params, deSerializers);
    }
    createTestEntityReturnId_1() {
        const params = {};
        const deSerializers = odata_v4_1.defaultDeSerializers;
        return new odata_v4_1.BoundActionRequestBuilder(this._entityApi, this, 'TestService.createTestEntityReturnId', (data) => data, params, deSerializers);
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
TestEntityWithMultipleKeys._keys = ['KeyTestEntityWithMultipleKeys', 'StringPropertyWithMultipleKeys', 'BooleanPropertyWithMultipleKeys'];
//# sourceMappingURL=TestEntityWithMultipleKeys.js.map