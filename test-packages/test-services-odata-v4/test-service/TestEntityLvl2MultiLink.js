"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntityLvl2MultiLink = void 0;
/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * See https://api.sap.com/api/path for more information.
 */
class TestEntityLvl2MultiLink extends odata_v4_1.Entity {
    /**
     * Technical entity name for TestEntityLvl2MultiLink.
     */
    static _entityName = 'A_TestEntityLvl2MultiLink';
    /**
     * Default url path for the according service.
     */
    static _defaultBasePath = '/sap/opu/odata/sap/API_TEST_SRV';
    /**
     * All key fields of the TestEntityLvl2MultiLink entity
     */
    static _keys = ['KeyProperty'];
    constructor(_entityApi) {
        super(_entityApi);
    }
}
exports.TestEntityLvl2MultiLink = TestEntityLvl2MultiLink;
//# sourceMappingURL=TestEntityLvl2MultiLink.js.map