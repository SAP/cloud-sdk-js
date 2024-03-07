"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity = void 0;
/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * See https://api.sap.com/api/path for more information.
 */
class TestEntity extends odata_v2_1.Entity {
    constructor(_entityApi) {
        super(_entityApi);
    }
}
exports.TestEntity = TestEntity;
/**
 * Technical entity name for TestEntity.
 */
TestEntity._entityName = 'A_TestEntity';
/**
 * Default url path for the according service.
 */
TestEntity._defaultBasePath = '/sap/opu/odata/sap/API_TEST_SRV';
/**
 * All key fields of the TestEntity entity
 */
TestEntity._keys = ['KeyPropertyGuid', 'KeyPropertyString'];
//# sourceMappingURL=TestEntity.js.map