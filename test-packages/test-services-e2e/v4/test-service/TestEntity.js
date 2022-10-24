'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntity = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
/**
 * This class represents the entity "TestEntity" of service "TestService".
 */
class TestEntity extends odata_v4_1.Entity {
  constructor(_entityApi) {
    super(_entityApi);
    this._entityApi = _entityApi;
  }
  boundFunctionWithoutArguments() {
    const params = {};
    const deSerializers = odata_v4_1.defaultDeSerializers;
    return new odata_v4_1.BoundFunctionRequestBuilder(
      this._entityApi,
      this,
      'TestService.boundFunctionWithoutArguments',
      data => data,
      params,
      deSerializers
    );
  }
  returnKey() {
    const params = {};
    const deSerializers = odata_v4_1.defaultDeSerializers;
    return new odata_v4_1.BoundFunctionRequestBuilder(
      this._entityApi,
      this,
      'TestService.returnKey',
      data => data,
      params,
      deSerializers
    );
  }
  boundActionWithoutArguments() {
    const params = {};
    const deSerializers = odata_v4_1.defaultDeSerializers;
    return new odata_v4_1.BoundActionRequestBuilder(
      this._entityApi,
      this,
      'TestService.boundActionWithoutArguments',
      data => data,
      params,
      deSerializers
    );
  }
  createTestEntityById() {
    const params = {};
    const deSerializers = odata_v4_1.defaultDeSerializers;
    return new odata_v4_1.BoundActionRequestBuilder(
      this._entityApi,
      this,
      'TestService.createTestEntityById',
      data => data,
      params,
      deSerializers
    );
  }
  createTestEntityByIdReturnId() {
    const params = {};
    const deSerializers = odata_v4_1.defaultDeSerializers;
    return new odata_v4_1.BoundActionRequestBuilder(
      this._entityApi,
      this,
      'TestService.createTestEntityByIdReturnId',
      data => data,
      params,
      deSerializers
    );
  }
  createTestEntityReturnId() {
    const params = {};
    const deSerializers = odata_v4_1.defaultDeSerializers;
    return new odata_v4_1.BoundActionRequestBuilder(
      this._entityApi,
      this,
      'TestService.createTestEntityReturnId',
      data => data,
      params,
      deSerializers
    );
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
TestEntity._defaultServicePath = '/odata/test-service';
/**
 * All key fields of the TestEntity entity
 */
TestEntity._keys = ['KeyTestEntity'];
//# sourceMappingURL=TestEntity.js.map
