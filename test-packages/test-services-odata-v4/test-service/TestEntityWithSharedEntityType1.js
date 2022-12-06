"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntityWithSharedEntityType1 = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * This class represents the entity "A_TestEntityWithSharedEntityType1" of service "API_TEST_SRV".
 */
class TestEntityWithSharedEntityType1 extends odata_v4_1.Entity {
    _entityApi;
    /**
     * Technical entity name for TestEntityWithSharedEntityType1.
     */
    static _entityName = 'A_TestEntityWithSharedEntityType1';
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
    /**
     * All key fields of the TestEntityWithSharedEntityType1 entity
     */
    static _keys = ['KeyProperty'];
    /**
     * Key Property.
     * Maximum length: 10.
     */
    keyProperty;
    constructor(_entityApi) {
        super(_entityApi);
        this._entityApi = _entityApi;
    }
}
exports.TestEntityWithSharedEntityType1 = TestEntityWithSharedEntityType1;
//# sourceMappingURL=TestEntityWithSharedEntityType1.js.map