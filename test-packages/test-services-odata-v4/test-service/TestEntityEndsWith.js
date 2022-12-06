"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntityEndsWith = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * This class represents the entity "A_TestEntityEndsWithCollection" of service "API_TEST_SRV".
 */
class TestEntityEndsWith extends odata_v4_1.Entity {
    _entityApi;
    /**
     * Technical entity name for TestEntityEndsWith.
     */
    static _entityName = 'A_TestEntityEndsWithCollection';
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
    /**
     * All key fields of the TestEntityEndsWith entity
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
        (0, odata_v4_1.nonEnumerable)(this, '_entityApi');
    }
}
exports.TestEntityEndsWith = TestEntityEndsWith;
//# sourceMappingURL=TestEntityEndsWith.js.map