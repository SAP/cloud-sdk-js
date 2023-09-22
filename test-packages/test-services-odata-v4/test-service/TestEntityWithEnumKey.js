"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntityWithEnumKey = void 0;
/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * See https://api.sap.com/api/path for more information.
 */
class TestEntityWithEnumKey extends odata_v4_1.Entity {
    /**
     * Technical entity name for TestEntityWithEnumKey.
     */
    static _entityName = 'A_TestEntityWithEnumKey';
    /**
     * Default url path for the according service.
     */
    static _defaultBasePath = '/sap/opu/odata/sap/API_TEST_SRV';
    /**
     * All key fields of the TestEntityWithEnumKey entity
     */
    static _keys = ['KeyPropertyEnum1'];
    constructor(_entityApi) {
        super(_entityApi);
    }
}
exports.TestEntityWithEnumKey = TestEntityWithEnumKey;
//# sourceMappingURL=TestEntityWithEnumKey.js.map