"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity = void 0;
/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * See https://api.sap.com/api/path for more information.
 */
class TestEntity extends odata_v2_1.Entity {
    /**
     * Technical entity name for TestEntity.
     */
    static _entityName = 'A_TestEntity';
    /**
     * Default url path for the according service.
     */
    static _defaultBasePath = '/sap/opu/odata/sap/API_TEST_SRV';
    /**
     * All key fields of the TestEntity entity
     */
    static _keys = ['KeyPropertyGuid', 'KeyPropertyString'];
    constructor(_entityApi) {
        super(_entityApi);
    }
}
exports.TestEntity = TestEntity;
//# sourceMappingURL=TestEntity.js.map