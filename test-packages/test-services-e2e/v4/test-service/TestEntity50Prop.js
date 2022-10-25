'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntity50Prop = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
/**
 * This class represents the entity "TestEntity50Prop" of service "TestService".
 */
class TestEntity50Prop extends odata_v4_1.Entity {
  constructor(_entityApi) {
    super(_entityApi);
    this._entityApi = _entityApi;
  }
  concatStrings(str1, str2) {
    const params = {
      str1: new odata_v4_1.FunctionImportParameter('str1', 'Edm.String', str1),
      str2: new odata_v4_1.FunctionImportParameter('str2', 'Edm.String', str2)
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
  getByKey(param) {
    const params = {
      param: new odata_v4_1.FunctionImportParameter('param', 'Edm.Int32', param)
    };
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
    keyTestEntityWithMultipleKeys,
    stringPropertyWithMultipleKeys,
    booleanPropertyWithMultipleKeys
  ) {
    const params = {
      keyTestEntityWithMultipleKeys: new odata_v4_1.FunctionImportParameter(
        'keyTestEntityWithMultipleKeys',
        'Edm.Int32',
        keyTestEntityWithMultipleKeys
      ),
      stringPropertyWithMultipleKeys: new odata_v4_1.FunctionImportParameter(
        'stringPropertyWithMultipleKeys',
        'Edm.String',
        stringPropertyWithMultipleKeys
      ),
      booleanPropertyWithMultipleKeys: new odata_v4_1.FunctionImportParameter(
        'booleanPropertyWithMultipleKeys',
        'Edm.Boolean',
        booleanPropertyWithMultipleKeys
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
  returnCollection(param) {
    const params = {
      param: new odata_v4_1.FunctionImportParameter('param', 'Edm.Int32', param)
    };
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
  returnInt(param) {
    const params = {
      param: new odata_v4_1.FunctionImportParameter('param', 'Edm.Int32', param)
    };
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
  createTestEntityById(id) {
    const params = {
      id: new odata_v4_1.ActionImportParameter('id', 'Edm.Int32', id)
    };
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
  createTestEntityByIdReturnId(id) {
    const params = {
      id: new odata_v4_1.ActionImportParameter('id', 'Edm.Int32', id)
    };
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
}
exports.TestEntity50Prop = TestEntity50Prop;
/**
 * Technical entity name for TestEntity50Prop.
 */
TestEntity50Prop._entityName = 'TestEntity50Prop';
/**
 * Default url path for the according service.
 */
TestEntity50Prop._defaultServicePath = '/odata/test-service';
/**
 * All key fields of the TestEntity50Prop entity
 */
TestEntity50Prop._keys = ['KeyTestEntity50Prop'];
//# sourceMappingURL=TestEntity50Prop.js.map
