'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.testService = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntityApi_1 = require('./TestEntityApi');
const TestEntityMultiLinkApi_1 = require('./TestEntityMultiLinkApi');
const TestEntitySingleLinkApi_1 = require('./TestEntitySingleLinkApi');
const odata_v2_1 = require('@sap-cloud-sdk/odata-v2');
const BatchRequest_1 = require('./BatchRequest');
function testService(deSerializers = odata_v2_1.defaultDeSerializers) {
  return new TestService(
    (0, odata_v2_1.mergeDefaultDeSerializersWith)(deSerializers)
  );
}
exports.testService = testService;
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
        'testEntitySingleLinkApi',
        TestEntitySingleLinkApi_1.TestEntitySingleLinkApi
      )
    ];
    api._addNavigationProperties(linkedApis);
    return api;
  }
  get testEntityMultiLinkApi() {
    return this.initApi(
      'testEntityMultiLinkApi',
      TestEntityMultiLinkApi_1.TestEntityMultiLinkApi
    );
  }
  get testEntitySingleLinkApi() {
    return this.initApi(
      'testEntitySingleLinkApi',
      TestEntitySingleLinkApi_1.TestEntitySingleLinkApi
    );
  }
  get batch() {
    return BatchRequest_1.batch;
  }
  get changeset() {
    return BatchRequest_1.changeset;
  }
}
//# sourceMappingURL=service.js.map
