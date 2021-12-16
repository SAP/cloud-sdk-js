'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestService = exports.builder = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
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
const TestEntityEndsWithApi_1 = require('./TestEntityEndsWithApi');
const TestEntityEndsWithSomethingElseApi_1 = require('./TestEntityEndsWithSomethingElseApi');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
function builder(deSerializers = odata_v4_1.defaultDeSerializers) {
  return new TestService(
    (0, odata_v4_1.mergeDefaultDeSerializersWith)(deSerializers)
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
        'testEntityMultiLinkApi',
        TestEntityMultiLinkApi_1.TestEntityMultiLinkApi
      ),
      this.initApi(
        'testEntitySingleLinkApi',
        TestEntitySingleLinkApi_1.TestEntitySingleLinkApi
      )
    ];
    api._addNavigationProperties(linkedApis);
    return api;
  }
  get testEntityWithEnumKeyApi() {
    const api = this.initApi(
      'testEntityWithEnumKeyApi',
      TestEntityWithEnumKeyApi_1.TestEntityWithEnumKeyApi
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
    const linkedApis = [
      this.initApi(
        'testEntityLvl3MultiLinkApi',
        TestEntityLvl3MultiLinkApi_1.TestEntityLvl3MultiLinkApi
      )
    ];
    api._addNavigationProperties(linkedApis);
    return api;
  }
  get testEntityLvl3MultiLinkApi() {
    const api = this.initApi(
      'testEntityLvl3MultiLinkApi',
      TestEntityLvl3MultiLinkApi_1.TestEntityLvl3MultiLinkApi
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
  get testEntityCircularLinkParentApi() {
    const api = this.initApi(
      'testEntityCircularLinkParentApi',
      TestEntityCircularLinkParentApi_1.TestEntityCircularLinkParentApi
    );
    const linkedApis = [
      this.initApi(
        'testEntityCircularLinkChildApi',
        TestEntityCircularLinkChildApi_1.TestEntityCircularLinkChildApi
      ),
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
        'testEntityCircularLinkParentApi',
        TestEntityCircularLinkParentApi_1.TestEntityCircularLinkParentApi
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
}
exports.TestService = TestService;
//# sourceMappingURL=service.js.map
