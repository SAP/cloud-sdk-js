"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntityLvl3MultiLink = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * This class represents the entity "A_TestEntityLvl3MultiLink" of service "API_TEST_SRV".
 */
class TestEntityLvl3MultiLink extends odata_v4_1.Entity {
    _entityApi;
    /**
     * Technical entity name for TestEntityLvl3MultiLink.
     */
    static _entityName = 'A_TestEntityLvl3MultiLink';
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
    /**
     * All key fields of the TestEntityLvl3MultiLink entity
     */
    static _keys = ['KeyProperty'];
    /**
     * String Property.
     * Maximum length: 10.
     * @nullable
     */
    stringProperty;
    /**
     * Guid Property.
     * @nullable
     */
    guidProperty;
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
exports.TestEntityLvl3MultiLink = TestEntityLvl3MultiLink;
//# sourceMappingURL=TestEntityLvl3MultiLink.js.map