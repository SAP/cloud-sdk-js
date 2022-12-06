"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity4 = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * This class represents the entity "A_TestEntity4" of service "API_MULTIPLE_SCHEMAS_SRV".
 */
class TestEntity4 extends odata_v4_1.Entity {
    _entityApi;
    /**
     * Technical entity name for TestEntity4.
     */
    static _entityName = 'A_TestEntity4';
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
    /**
     * All key fields of the TestEntity4 entity
     */
    static _keys = ['KeyPropertyString'];
    /**
     * Key Property String.
     */
    keyPropertyString;
    /**
     * Boolean Property.
     * @nullable
     */
    booleanProperty;
    constructor(_entityApi) {
        super(_entityApi);
        this._entityApi = _entityApi;
        (0, odata_v4_1.nonEnumerable)(this, '_entityApi');
    }
}
exports.TestEntity4 = TestEntity4;
//# sourceMappingURL=TestEntity4.js.map