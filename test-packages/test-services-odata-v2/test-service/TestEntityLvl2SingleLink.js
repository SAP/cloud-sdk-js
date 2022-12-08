"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntityLvl2SingleLink = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * This class represents the entity "A_TestEntityLvl2SingleLink" of service "API_TEST_SRV".
 */
class TestEntityLvl2SingleLink extends odata_v2_1.Entity {
    _entityApi;
    /**
     * Technical entity name for TestEntityLvl2SingleLink.
     */
    static _entityName = 'A_TestEntityLvl2SingleLink';
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
    /**
     * All key fields of the TestEntityLvl2SingleLink entity
     */
    static _keys = ['KeyProperty'];
    /**
     * Key Property.
     * Maximum length: 10.
     */
    keyProperty;
    /**
     * String Property.
     * Maximum length: 10.
     * @nullable
     */
    stringProperty;
    /**
     * Boolean Property.
     * @nullable
     */
    booleanProperty;
    /**
     * Guid Property.
     * @nullable
     */
    guidProperty;
    /**
     * Int 16 Property.
     * @nullable
     */
    int16Property;
    constructor(_entityApi) {
        super(_entityApi);
        this._entityApi = _entityApi;
    }
}
exports.TestEntityLvl2SingleLink = TestEntityLvl2SingleLink;
//# sourceMappingURL=TestEntityLvl2SingleLink.js.map