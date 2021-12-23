'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.MultipleSchemasService = exports.multipleSchemasService = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntity1Api_1 = require('./TestEntity1Api');
const TestEntity2Api_1 = require('./TestEntity2Api');
const TestEntity3Api_1 = require('./TestEntity3Api');
const TestEntity4Api_1 = require('./TestEntity4Api');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
function multipleSchemasService(
  deSerializers = odata_v4_1.defaultDeSerializers
) {
  return new MultipleSchemasService(
    (0, odata_v4_1.mergeDefaultDeSerializersWith)(deSerializers)
  );
}
exports.multipleSchemasService = multipleSchemasService;
class MultipleSchemasService {
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
  get testEntity1Api() {
    return this.initApi('testEntity1Api', TestEntity1Api_1.TestEntity1Api);
  }
  get testEntity2Api() {
    return this.initApi('testEntity2Api', TestEntity2Api_1.TestEntity2Api);
  }
  get testEntity3Api() {
    return this.initApi('testEntity3Api', TestEntity3Api_1.TestEntity3Api);
  }
  get testEntity4Api() {
    return this.initApi('testEntity4Api', TestEntity4Api_1.TestEntity4Api);
  }
}
exports.MultipleSchemasService = MultipleSchemasService;
//# sourceMappingURL=service.js.map
