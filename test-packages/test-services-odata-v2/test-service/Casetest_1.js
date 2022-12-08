"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Casetest_1 = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * This class represents the entity "A_CASETEST" of service "API_TEST_SRV".
 */
class Casetest_1 extends odata_v2_1.Entity {
    _entityApi;
    /**
     * Technical entity name for Casetest_1.
     */
    static _entityName = 'A_CASETEST';
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
    /**
     * All key fields of the Casetest_1 entity
     */
    static _keys = ['KeyPropertyString'];
    /**
     * Key Property String.
     */
    keyPropertyString;
    constructor(_entityApi) {
        super(_entityApi);
        this._entityApi = _entityApi;
    }
}
exports.Casetest_1 = Casetest_1;
//# sourceMappingURL=Casetest_1.js.map