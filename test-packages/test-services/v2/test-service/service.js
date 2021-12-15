'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestService = exports.builder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntityApi_1 = require('./TestEntityApi');
const TestEntityMultiLinkApi_1 = require('./TestEntityMultiLinkApi');
const TestEntityOtherMultiLinkApi_1 = require('./TestEntityOtherMultiLinkApi');
const TestEntityLvl2MultiLinkApi_1 = require('./TestEntityLvl2MultiLinkApi');
const TestEntitySingleLinkApi_1 = require('./TestEntitySingleLinkApi');
const TestEntityLvl2SingleLinkApi_1 = require('./TestEntityLvl2SingleLinkApi');
const TestEntityWithSharedEntityType1Api_1 = require('./TestEntityWithSharedEntityType1Api');
const TestEntityWithSharedEntityType2Api_1 = require('./TestEntityWithSharedEntityType2Api');
const TestEntityCircularLinkParentApi_1 = require('./TestEntityCircularLinkParentApi');
const TestEntityCircularLinkChildApi_1 = require('./TestEntityCircularLinkChildApi');
const TestEntityEndsWithApi_1 = require('./TestEntityEndsWithApi');
const TestEntityEndsWithSomethingElseApi_1 = require('./TestEntityEndsWithSomethingElseApi');
const CaseTestApi_1 = require('./CaseTestApi');
const Casetest_1Api_1 = require('./Casetest_1Api');
const odata_v2_1 = require('@sap-cloud-sdk/odata-v2');
function builder(deSerializers = odata_v2_1.defaultDeSerializers) {
  return new TestService(
    (0, odata_v2_1.mergeDefaultDeSerializersWith)(deSerializers)
  );
}
exports.builder = builder;
class TestService {
  constructor(deSerializers) {
    this.apis = {};
    this.deSerializers = deSerializers;
  }
  initApi(key, ctor) {
    if (!this.apis[key]) {
      this.apis[key] = new ctor(this.deSerializers);
    }
    return this.apis[key];
  }
  get testEntityApi() {
    const api = this.initApi('testEntityApi', TestEntityApi_1.TestEntityApi);
    const linkedApis = [
      this.initApi(
        'testEntityMultiLinkApi',
        TestEntityMultiLinkApi_1.TestEntityMultiLinkApi
      ),
      this.initApi(
        'testEntityOtherMultiLinkApi',
        TestEntityOtherMultiLinkApi_1.TestEntityOtherMultiLinkApi
      ),
      this.initApi(
        'testEntitySingleLinkApi',
        TestEntitySingleLinkApi_1.TestEntitySingleLinkApi
      )
    ];
    api._addNavigationProperties(linkedApis);
    return api;
  }
  get testEntityMultiLinkApi() {
    const api = this.initApi(
      'testEntityMultiLinkApi',
      TestEntityMultiLinkApi_1.TestEntityMultiLinkApi
    );
    const linkedApis = [
      this.initApi(
        'testEntityLvl2MultiLinkApi',
        TestEntityLvl2MultiLinkApi_1.TestEntityLvl2MultiLinkApi
      ),
      this.initApi(
        'testEntityLvl2SingleLinkApi',
        TestEntityLvl2SingleLinkApi_1.TestEntityLvl2SingleLinkApi
      )
    ];
    api._addNavigationProperties(linkedApis);
    return api;
  }
  get testEntityOtherMultiLinkApi() {
    const api = this.initApi(
      'testEntityOtherMultiLinkApi',
      TestEntityOtherMultiLinkApi_1.TestEntityOtherMultiLinkApi
    );
    return api;
  }
  get testEntityLvl2MultiLinkApi() {
    const api = this.initApi(
      'testEntityLvl2MultiLinkApi',
      TestEntityLvl2MultiLinkApi_1.TestEntityLvl2MultiLinkApi
    );
    return api;
  }
  get testEntitySingleLinkApi() {
    const api = this.initApi(
      'testEntitySingleLinkApi',
      TestEntitySingleLinkApi_1.TestEntitySingleLinkApi
    );
    const linkedApis = [
      this.initApi(
        'testEntityLvl2MultiLinkApi',
        TestEntityLvl2MultiLinkApi_1.TestEntityLvl2MultiLinkApi
      ),
      this.initApi(
        'testEntityLvl2SingleLinkApi',
        TestEntityLvl2SingleLinkApi_1.TestEntityLvl2SingleLinkApi
      )
    ];
    api._addNavigationProperties(linkedApis);
    return api;
  }
  get testEntityLvl2SingleLinkApi() {
    const api = this.initApi(
      'testEntityLvl2SingleLinkApi',
      TestEntityLvl2SingleLinkApi_1.TestEntityLvl2SingleLinkApi
    );
    return api;
  }
  get testEntityWithSharedEntityType1Api() {
    const api = this.initApi(
      'testEntityWithSharedEntityType1Api',
      TestEntityWithSharedEntityType1Api_1.TestEntityWithSharedEntityType1Api
    );
    return api;
  }
  get testEntityWithSharedEntityType2Api() {
    const api = this.initApi(
      'testEntityWithSharedEntityType2Api',
      TestEntityWithSharedEntityType2Api_1.TestEntityWithSharedEntityType2Api
    );
    return api;
  }
  get testEntityCircularLinkParentApi() {
    const api = this.initApi(
      'testEntityCircularLinkParentApi',
      TestEntityCircularLinkParentApi_1.TestEntityCircularLinkParentApi
    );
    const linkedApis = [
      this.initApi(
        'testEntityCircularLinkChildApi',
        TestEntityCircularLinkChildApi_1.TestEntityCircularLinkChildApi
      )
    ];
    api._addNavigationProperties(linkedApis);
    return api;
  }
  get testEntityCircularLinkChildApi() {
    const api = this.initApi(
      'testEntityCircularLinkChildApi',
      TestEntityCircularLinkChildApi_1.TestEntityCircularLinkChildApi
    );
    const linkedApis = [
      this.initApi(
        'testEntityCircularLinkChildApi',
        TestEntityCircularLinkChildApi_1.TestEntityCircularLinkChildApi
      )
    ];
    api._addNavigationProperties(linkedApis);
    return api;
  }
  get testEntityEndsWithApi() {
    const api = this.initApi(
      'testEntityEndsWithApi',
      TestEntityEndsWithApi_1.TestEntityEndsWithApi
    );
    return api;
  }
  get testEntityEndsWithSomethingElseApi() {
    const api = this.initApi(
      'testEntityEndsWithSomethingElseApi',
      TestEntityEndsWithSomethingElseApi_1.TestEntityEndsWithSomethingElseApi
    );
    return api;
  }
  get caseTestApi() {
    const api = this.initApi('caseTestApi', CaseTestApi_1.CaseTestApi);
    return api;
  }
  get casetest_1Api() {
    const api = this.initApi('casetest_1Api', Casetest_1Api_1.Casetest_1Api);
    return api;
  }
}
exports.TestService = TestService;
//# sourceMappingURL=service.js.map
