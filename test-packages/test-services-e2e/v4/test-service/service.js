'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestService = exports.testService = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntityApi_1 = require('./TestEntityApi');
const TestEntityLinkApi_1 = require('./TestEntityLinkApi');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
function testService(deSerializers = odata_v4_1.defaultDeSerializers) {
  return new TestService(
    (0, odata_v4_1.mergeDefaultDeSerializersWith)(deSerializers)
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
      this.initApi('testEntityLinkApi', TestEntityLinkApi_1.TestEntityLinkApi)
    ];
    api._addNavigationProperties(linkedApis);
    return api;
  }
  get testEntityLinkApi() {
    return this.initApi(
      'testEntityLinkApi',
      TestEntityLinkApi_1.TestEntityLinkApi
    );
  }
}
exports.TestService = TestService;
//# sourceMappingURL=service.js.map
