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
  boundFunctionWithoutArgumentsWithMultipleKeys() {
    const params = {};
    const deSerializers = odata_v4_1.defaultDeSerializers;
    return new odata_v4_1.BoundFunctionRequestBuilder(
      this._entityApi,
      this,
      'TestService.boundFunctionWithoutArgumentsWithMultipleKeys',
      data => data,
      params,
      deSerializers
    );
  }
  boundFunctionWithArgumentsWithMultipleKeys(param1, param2) {
    const params = {
      param1: new odata_v4_1.FunctionImportParameter(
        'param1',
        'Edm.String',
        param1
      ),
      param2: new odata_v4_1.FunctionImportParameter(
        'param2',
        'Edm.String',
        param2
      )
    };
    const deSerializers = odata_v4_1.defaultDeSerializers;
    return new odata_v4_1.BoundFunctionRequestBuilder(
      this._entityApi,
      this,
      'TestService.boundFunctionWithArgumentsWithMultipleKeys',
      data => data,
      params,
      deSerializers
    );
  }
  getStringProperty() {
    const params = {};
    const deSerializers = odata_v4_1.defaultDeSerializers;
    return new odata_v4_1.BoundFunctionRequestBuilder(
      this._entityApi,
      this,
      'TestService.getStringProperty',
      data => data,
      params,
      deSerializers
    );
  }
  concatStrings(Str2) {
    const params = {
      Str2: new odata_v4_1.FunctionImportParameter('Str2', 'Edm.String', Str2)
    };
    const deSerializers = odata_v4_1.defaultDeSerializers;
    return new odata_v4_1.BoundFunctionRequestBuilder(
      this._entityApi,
      this,
      'TestService.concatStrings',
      data => data,
      params,
      deSerializers
    );
  }
  getAll() {
    const params = {};
    const deSerializers = odata_v4_1.defaultDeSerializers;
    return new odata_v4_1.BoundFunctionRequestBuilder(
      this._entityApi,
      this,
      'TestService.getAll',
      data => data,
      params,
      deSerializers
    );
  }
  getByKey() {
    const params = {};
    const deSerializers = odata_v4_1.defaultDeSerializers;
    return new odata_v4_1.BoundFunctionRequestBuilder(
      this._entityApi,
      this,
      'TestService.getByKey',
      data => data,
      params,
      deSerializers
    );
  }
  getByKeyWithMultipleKeys(
    StringPropertyWithMultipleKeys,
    BooleanPropertyWithMultipleKeys
  ) {
    const params = {
      StringPropertyWithMultipleKeys: new odata_v4_1.FunctionImportParameter(
        'StringPropertyWithMultipleKeys',
        'Edm.String',
        StringPropertyWithMultipleKeys
      ),
      BooleanPropertyWithMultipleKeys: new odata_v4_1.FunctionImportParameter(
        'BooleanPropertyWithMultipleKeys',
        'Edm.Boolean',
        BooleanPropertyWithMultipleKeys
      )
    };
    const deSerializers = odata_v4_1.defaultDeSerializers;
    return new odata_v4_1.BoundFunctionRequestBuilder(
      this._entityApi,
      this,
      'TestService.getByKeyWithMultipleKeys',
      data => data,
      params,
      deSerializers
    );
  }
  returnCollection() {
    const params = {};
    const deSerializers = odata_v4_1.defaultDeSerializers;
    return new odata_v4_1.BoundFunctionRequestBuilder(
      this._entityApi,
      this,
      'TestService.returnCollection',
      data => data,
      params,
      deSerializers
    );
  }
  returnInt() {
    const params = {};
    const deSerializers = odata_v4_1.defaultDeSerializers;
    return new odata_v4_1.BoundFunctionRequestBuilder(
      this._entityApi,
      this,
      'TestService.returnInt',
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
  returnSapCloudSdk() {
    const params = {};
    const deSerializers = odata_v4_1.defaultDeSerializers;
    return new odata_v4_1.BoundFunctionRequestBuilder(
      this._entityApi,
      this,
      'TestService.returnSapCloudSdk',
      data => data,
      params,
      deSerializers
    );
  }
  boundActionWithoutArguments() {
    const params = {};
    const deSerializers = odata_v4_1.defaultDeSerializers;
    return new odata_v4_1.BoundActionRequestBuilder(
      '/odata/test-service',
      'TestEntity',
      '',
      'TestService',
      'boundActionWithoutArguments',
      data => data,
      params,
      deSerializers
    );
  }
  deleteEntity() {
    const params = {};
    const deSerializers = odata_v4_1.defaultDeSerializers;
    return new odata_v4_1.BoundActionRequestBuilder(
      '/odata/test-service',
      'TestEntity',
      '',
      'TestService',
      'deleteEntity',
      data => data,
      params,
      deSerializers
    );
  }
  createTestEntityById() {
    const params = {};
    const deSerializers = odata_v4_1.defaultDeSerializers;
    return new odata_v4_1.BoundActionRequestBuilder(
      '/odata/test-service',
      'TestEntity',
      '',
      'TestService',
      'createTestEntityById',
      data => data,
      params,
      deSerializers
    );
  }
  createTestEntityByIdReturnId() {
    const params = {};
    const deSerializers = odata_v4_1.defaultDeSerializers;
    return new odata_v4_1.BoundActionRequestBuilder(
      '/odata/test-service',
      'TestEntity',
      '',
      'TestService',
      'createTestEntityByIdReturnId',
      data => data,
      params,
      deSerializers
    );
  }
  createTestEntityReturnId() {
    const params = {};
    const deSerializers = odata_v4_1.defaultDeSerializers;
    return new odata_v4_1.BoundActionRequestBuilder(
      '/odata/test-service',
      'TestEntity',
      '',
      'TestService',
      'createTestEntityReturnId',
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
