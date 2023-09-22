"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntityMultiLink = void 0;
/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * See https://api.sap.com/api/path for more information.
 */
class TestEntityMultiLink extends odata_v2_1.Entity {
    /**
     * Technical entity name for TestEntityMultiLink.
     */
    static _entityName = 'A_TestEntityMultiLink';
    /**
     * Default url path for the according service.
     */
    static _defaultBasePath = '/sap/opu/odata/sap/API_TEST_SRV';
    /**
     * All key fields of the TestEntityMultiLink entity
     */
    static _keys = ['KeyProperty'];
    constructor(_entityApi) {
        super(_entityApi);
    }
}
exports.TestEntityMultiLink = TestEntityMultiLink;
//# sourceMappingURL=TestEntityMultiLink.js.map