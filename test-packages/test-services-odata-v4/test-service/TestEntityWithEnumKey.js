"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntityWithEnumKey = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * This class represents the entity "A_TestEntityWithEnumKey" of service "API_TEST_SRV".
 */
class TestEntityWithEnumKey extends odata_v4_1.Entity {
    _entityApi;
    /**
     * Technical entity name for TestEntityWithEnumKey.
     */
    static _entityName = 'A_TestEntityWithEnumKey';
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
    /**
     * All key fields of the TestEntityWithEnumKey entity
     */
    static _keys = ['KeyPropertyEnum1'];
    /**
     * Key Property Enum 1.
     */
    keyPropertyEnum1;
    constructor(_entityApi) {
        super(_entityApi);
        this._entityApi = _entityApi;
        (0, odata_v4_1.nonEnumerable)(this, '_entityApi');
    }
}
exports.TestEntityWithEnumKey = TestEntityWithEnumKey;
//# sourceMappingURL=TestEntityWithEnumKey.js.map