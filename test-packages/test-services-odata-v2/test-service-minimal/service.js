'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.testServiceMinimal = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntityApi_1 = require('./TestEntityApi');
const TestEntitySingleLinkApi_1 = require('./TestEntitySingleLinkApi');
const odata_v2_1 = require('@sap-cloud-sdk/odata-v2');
const BatchRequest_1 = require('./BatchRequest');
function testServiceMinimal(deSerializers = odata_v2_1.defaultDeSerializers) {
  return new TestServiceMinimal(
    (0, odata_v2_1.mergeDefaultDeSerializersWith)(deSerializers)
  );
}
exports.testServiceMinimal = testServiceMinimal;
class TestServiceMinimal {
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
        'testEntitySingleLinkApi',
        TestEntitySingleLinkApi_1.TestEntitySingleLinkApi
      )
    ];
    api._addNavigationProperties(linkedApis);
    return api;
  }
  get testEntitySingleLinkApi() {
    const api = this.initApi(
      'testEntitySingleLinkApi',
      TestEntitySingleLinkApi_1.TestEntitySingleLinkApi
    );
    const linkedApis = [
      this.initApi(
        'testEntitySingleLinkApi',
        TestEntitySingleLinkApi_1.TestEntitySingleLinkApi
      )
    ];
    api._addNavigationProperties(linkedApis);
    return api;
  }
  get batch() {
    return BatchRequest_1.batch;
  }
  get changeset() {
    return BatchRequest_1.changeset;
  }
}
//# sourceMappingURL=service.js.map
