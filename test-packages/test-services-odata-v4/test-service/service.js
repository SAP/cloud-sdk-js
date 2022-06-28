'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.testService = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntityApi_1 = require('./TestEntityApi');
const TestEntityWithEnumKeyApi_1 = require('./TestEntityWithEnumKeyApi');
const TestEntityWithSharedEntityType1Api_1 = require('./TestEntityWithSharedEntityType1Api');
const TestEntityWithSharedEntityType2Api_1 = require('./TestEntityWithSharedEntityType2Api');
const TestEntityMultiLinkApi_1 = require('./TestEntityMultiLinkApi');
const TestEntityOtherMultiLinkApi_1 = require('./TestEntityOtherMultiLinkApi');
const TestEntityLvl2MultiLinkApi_1 = require('./TestEntityLvl2MultiLinkApi');
const TestEntityLvl3MultiLinkApi_1 = require('./TestEntityLvl3MultiLinkApi');
const TestEntitySingleLinkApi_1 = require('./TestEntitySingleLinkApi');
const TestEntityLvl2SingleLinkApi_1 = require('./TestEntityLvl2SingleLinkApi');
const TestEntityCircularLinkParentApi_1 = require('./TestEntityCircularLinkParentApi');
const TestEntityCircularLinkChildApi_1 = require('./TestEntityCircularLinkChildApi');
const TestEntityCircularLinkSelfApi_1 = require('./TestEntityCircularLinkSelfApi');
const TestEntityEndsWithApi_1 = require('./TestEntityEndsWithApi');
const TestEntityEndsWithSomethingElseApi_1 = require('./TestEntityEndsWithSomethingElseApi');
const function_imports_1 = require('./function-imports');
const action_imports_1 = require('./action-imports');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const BatchRequest_1 = require('./BatchRequest');
function testService(deSerializers = odata_v4_1.defaultDeSerializers) {
  return new TestService(
    (0, odata_v4_1.mergeDefaultDeSerializersWith)(deSerializers)
  );
}
exports.testService = testService;
class TestService {
  constructor(deSerializers) {
    this.apis = {};
    this._testEntityApi = undefined;
    this._testEntityWithEnumKeyApi = undefined;
    this._testEntityWithSharedEntityType1Api = undefined;
    this._testEntityWithSharedEntityType2Api = undefined;
    this._testEntityMultiLinkApi = undefined;
    this._testEntityOtherMultiLinkApi = undefined;
    this._testEntityLvl2MultiLinkApi = undefined;
    this._testEntityLvl3MultiLinkApi = undefined;
    this._testEntitySingleLinkApi = undefined;
    this._testEntityLvl2SingleLinkApi = undefined;
    this._testEntityCircularLinkParentApi = undefined;
    this._testEntityCircularLinkChildApi = undefined;
    this._testEntityCircularLinkSelfApi = undefined;
    this._testEntityEndsWithApi = undefined;
    this._testEntityEndsWithSomethingElseApi = undefined;
    this.deSerializers = deSerializers;
  }
  initApi(key, ctor) {
    if (!this.apis[key]) {
      this.apis[key] = new ctor(this.deSerializers);
    }
    return this.apis[key];
  }
  get testEntityApi() {
    if (!this._testEntityApi) {
      const api = this.initApi('testEntityApi', TestEntityApi_1.TestEntityApi);
      const linkedApis = [
        this.testEntityMultiLinkApi,
        this.testEntityMultiLinkApi,
        this.testEntitySingleLinkApi
      ];
      api._addNavigationProperties(linkedApis);
      this._testEntityApi = api;
    }
    return this._testEntityApi;
  }
  get testEntityWithEnumKeyApi() {
    if (!this._testEntityWithEnumKeyApi) {
      this._testEntityWithEnumKeyApi = this.initApi(
        'testEntityWithEnumKeyApi',
        TestEntityWithEnumKeyApi_1.TestEntityWithEnumKeyApi
      );
    }
    return this._testEntityWithEnumKeyApi;
  }
  get testEntityWithSharedEntityType1Api() {
    if (!this._testEntityWithSharedEntityType1Api) {
      this._testEntityWithSharedEntityType1Api = this.initApi(
        'testEntityWithSharedEntityType1Api',
        TestEntityWithSharedEntityType1Api_1.TestEntityWithSharedEntityType1Api
      );
    }
    return this._testEntityWithSharedEntityType1Api;
  }
  get testEntityWithSharedEntityType2Api() {
    if (!this._testEntityWithSharedEntityType2Api) {
      this._testEntityWithSharedEntityType2Api = this.initApi(
        'testEntityWithSharedEntityType2Api',
        TestEntityWithSharedEntityType2Api_1.TestEntityWithSharedEntityType2Api
      );
    }
    return this._testEntityWithSharedEntityType2Api;
  }
  get testEntityMultiLinkApi() {
    if (!this._testEntityMultiLinkApi) {
      const api = this.initApi(
        'testEntityMultiLinkApi',
        TestEntityMultiLinkApi_1.TestEntityMultiLinkApi
      );
      const linkedApis = [
        this.testEntityLvl2MultiLinkApi,
        this.testEntityLvl2SingleLinkApi
      ];
      api._addNavigationProperties(linkedApis);
      this._testEntityMultiLinkApi = api;
    }
    return this._testEntityMultiLinkApi;
  }
  get testEntityOtherMultiLinkApi() {
    if (!this._testEntityOtherMultiLinkApi) {
      this._testEntityOtherMultiLinkApi = this.initApi(
        'testEntityOtherMultiLinkApi',
        TestEntityOtherMultiLinkApi_1.TestEntityOtherMultiLinkApi
      );
    }
    return this._testEntityOtherMultiLinkApi;
  }
  get testEntityLvl2MultiLinkApi() {
    if (!this._testEntityLvl2MultiLinkApi) {
      const api = this.initApi(
        'testEntityLvl2MultiLinkApi',
        TestEntityLvl2MultiLinkApi_1.TestEntityLvl2MultiLinkApi
      );
      const linkedApis = [this.testEntityLvl3MultiLinkApi];
      api._addNavigationProperties(linkedApis);
      this._testEntityLvl2MultiLinkApi = api;
    }
    return this._testEntityLvl2MultiLinkApi;
  }
  get testEntityLvl3MultiLinkApi() {
    if (!this._testEntityLvl3MultiLinkApi) {
      this._testEntityLvl3MultiLinkApi = this.initApi(
        'testEntityLvl3MultiLinkApi',
        TestEntityLvl3MultiLinkApi_1.TestEntityLvl3MultiLinkApi
      );
    }
    return this._testEntityLvl3MultiLinkApi;
  }
  get testEntitySingleLinkApi() {
    if (!this._testEntitySingleLinkApi) {
      const api = this.initApi(
        'testEntitySingleLinkApi',
        TestEntitySingleLinkApi_1.TestEntitySingleLinkApi
      );
      const linkedApis = [
        this.testEntityLvl2MultiLinkApi,
        this.testEntityLvl2SingleLinkApi
      ];
      api._addNavigationProperties(linkedApis);
      this._testEntitySingleLinkApi = api;
    }
    return this._testEntitySingleLinkApi;
  }
  get testEntityLvl2SingleLinkApi() {
    if (!this._testEntityLvl2SingleLinkApi) {
      this._testEntityLvl2SingleLinkApi = this.initApi(
        'testEntityLvl2SingleLinkApi',
        TestEntityLvl2SingleLinkApi_1.TestEntityLvl2SingleLinkApi
      );
    }
    return this._testEntityLvl2SingleLinkApi;
  }
  get testEntityCircularLinkParentApi() {
    if (!this._testEntityCircularLinkParentApi) {
      const api = this.initApi(
        'testEntityCircularLinkParentApi',
        TestEntityCircularLinkParentApi_1.TestEntityCircularLinkParentApi
      );
      const linkedApis = [
        this.testEntityCircularLinkChildApi,
        this.testEntityCircularLinkChildApi
      ];
      api._addNavigationProperties(linkedApis);
      this._testEntityCircularLinkParentApi = api;
    }
    return this._testEntityCircularLinkParentApi;
  }
  get testEntityCircularLinkChildApi() {
    if (!this._testEntityCircularLinkChildApi) {
      const api = this.initApi(
        'testEntityCircularLinkChildApi',
        TestEntityCircularLinkChildApi_1.TestEntityCircularLinkChildApi
      );
      const linkedApis = [this.testEntityCircularLinkParentApi];
      api._addNavigationProperties(linkedApis);
      this._testEntityCircularLinkChildApi = api;
    }
    return this._testEntityCircularLinkChildApi;
  }
  get testEntityCircularLinkSelfApi() {
    if (!this._testEntityCircularLinkSelfApi) {
      const api = this.initApi(
        'testEntityCircularLinkSelfApi',
        TestEntityCircularLinkSelfApi_1.TestEntityCircularLinkSelfApi
      );
      const linkedApis = [this.testEntityCircularLinkSelfApi];
      api._addNavigationProperties(linkedApis);
      this._testEntityCircularLinkSelfApi = api;
    }
    return this._testEntityCircularLinkSelfApi;
  }
  get testEntityEndsWithApi() {
    if (!this._testEntityEndsWithApi) {
      this._testEntityEndsWithApi = this.initApi(
        'testEntityEndsWithApi',
        TestEntityEndsWithApi_1.TestEntityEndsWithApi
      );
    }
    return this._testEntityEndsWithApi;
  }
  get testEntityEndsWithSomethingElseApi() {
    if (!this._testEntityEndsWithSomethingElseApi) {
      this._testEntityEndsWithSomethingElseApi = this.initApi(
        'testEntityEndsWithSomethingElseApi',
        TestEntityEndsWithSomethingElseApi_1.TestEntityEndsWithSomethingElseApi
      );
    }
    return this._testEntityEndsWithSomethingElseApi;
  }
  get functionImports() {
    return {
      testFunctionImportEdmReturnType: parameter =>
        (0, function_imports_1.testFunctionImportEdmReturnType)(
          parameter,
          this.deSerializers
        ),
      testFunctionImportEdmReturnTypeCollection: parameter =>
        (0, function_imports_1.testFunctionImportEdmReturnTypeCollection)(
          parameter,
          this.deSerializers
        ),
      testFunctionImportNullableTest: parameter =>
        (0, function_imports_1.testFunctionImportNullableTest)(
          parameter,
          this.deSerializers
        ),
      testFunctionImportEntityReturnType: parameter =>
        (0, function_imports_1.testFunctionImportEntityReturnType)(
          parameter,
          this.deSerializers
        ),
      testFunctionImportEntityReturnTypeCollection: parameter =>
        (0, function_imports_1.testFunctionImportEntityReturnTypeCollection)(
          parameter,
          this.deSerializers
        ),
      testFunctionImportSharedEntityReturnType: parameter =>
        (0, function_imports_1.testFunctionImportSharedEntityReturnType)(
          parameter,
          this.deSerializers
        ),
      testFunctionImportSharedEntityReturnTypeCollection: parameter =>
        (0,
        function_imports_1.testFunctionImportSharedEntityReturnTypeCollection)(
          parameter,
          this.deSerializers
        ),
      testFunctionImportComplexReturnType: parameter =>
        (0, function_imports_1.testFunctionImportComplexReturnType)(
          parameter,
          this.deSerializers
        ),
      testFunctionImportComplexReturnTypeCollection: parameter =>
        (0, function_imports_1.testFunctionImportComplexReturnTypeCollection)(
          parameter,
          this.deSerializers
        ),
      testFunctionImportMultipleParams: parameter =>
        (0, function_imports_1.testFunctionImportMultipleParams)(
          parameter,
          this.deSerializers
        ),
      testFunctionImportWithDifferentName: parameter =>
        (0, function_imports_1.testFunctionImportWithDifferentName)(
          parameter,
          this.deSerializers
        )
    };
  }
  get actionImports() {
    return {
      testActionImportNoParameterNoReturnType: parameter =>
        (0, action_imports_1.testActionImportNoParameterNoReturnType)(
          parameter,
          this.deSerializers
        ),
      testActionImportMultipleParameterComplexReturnType: parameter =>
        (0,
        action_imports_1.testActionImportMultipleParameterComplexReturnType)(
          parameter,
          this.deSerializers
        ),
      testActionImportUnsupportedEdmTypes: parameter =>
        (0, action_imports_1.testActionImportUnsupportedEdmTypes)(
          parameter,
          this.deSerializers
        ),
      testActionImportNoParameterEntityReturnType: parameter =>
        (0, action_imports_1.testActionImportNoParameterEntityReturnType)(
          parameter,
          this.deSerializers
        ),
      testActionImportSharedEntityReturnType: parameter =>
        (0, action_imports_1.testActionImportSharedEntityReturnType)(
          parameter,
          this.deSerializers
        ),
      testActionImportSharedEntityReturnTypeCollection: parameter =>
        (0, action_imports_1.testActionImportSharedEntityReturnTypeCollection)(
          parameter,
          this.deSerializers
        ),
      testActionImportNullableTest: parameter =>
        (0, action_imports_1.testActionImportNullableTest)(
          parameter,
          this.deSerializers
        )
    };
  }
  get batch() {
    return BatchRequest_1.batch;
  }
  get changeset() {
    return BatchRequest_1.changeset;
  }
}
//# sourceMappingURL=service.js.map
