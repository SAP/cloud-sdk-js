'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.MultipleSchemasService = exports.multipleSchemasService = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const MultiSchemaTestEntityApi_1 = require('./MultiSchemaTestEntityApi');
const BatchRequest_1 = require('./BatchRequest');
const odata_v2_1 = require('@sap-cloud-sdk/odata-v2');
function multipleSchemasService(
  deSerializers = odata_v2_1.defaultDeSerializers
) {
  return new MultipleSchemasService(
    (0, odata_v2_1.mergeDefaultDeSerializersWith)(deSerializers)
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
  get multiSchemaTestEntityApi() {
    return this.initApi(
      'multiSchemaTestEntityApi',
      MultiSchemaTestEntityApi_1.MultiSchemaTestEntityApi
    );
  }
  get batch() {
    return BatchRequest_1.batch;
  }
  get changeset() {
    return BatchRequest_1.changeset;
  }
}
exports.MultipleSchemasService = MultipleSchemasService;
//# sourceMappingURL=service.js.map
