'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityWithMultipleKeys = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
/**
 * This class represents the entity "TestEntityWithMultipleKeys" of service "TestService".
 */
class TestEntityWithMultipleKeys extends odata_v4_1.Entity {
  constructor(_entityApi) {
    super(_entityApi);
    this._entityApi = _entityApi;
  }
}
exports.TestEntityWithMultipleKeys = TestEntityWithMultipleKeys;
/**
 * Technical entity name for TestEntityWithMultipleKeys.
 */
TestEntityWithMultipleKeys._entityName = 'TestEntityWithMultipleKeys';
/**
 * Default url path for the according service.
 */
TestEntityWithMultipleKeys._defaultServicePath = '/odata/test-service';
/**
 * All key fields of the TestEntityWithMultipleKeys entity
 */
TestEntityWithMultipleKeys._keys = [
  'KeyTestEntityWithMultipleKeys',
  'StringPropertyWithMultipleKeys',
  'BooleanPropertyWithMultipleKeys'
];
//# sourceMappingURL=TestEntityWithMultipleKeys.js.map
