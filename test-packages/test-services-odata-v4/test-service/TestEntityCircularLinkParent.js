"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntityCircularLinkParent = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * This class represents the entity "A_TestEntityCircularLinkParent" of service "API_TEST_SRV".
 */
class TestEntityCircularLinkParent extends odata_v4_1.Entity {
    _entityApi;
    /**
     * Technical entity name for TestEntityCircularLinkParent.
     */
    static _entityName = 'A_TestEntityCircularLinkParent';
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
    /**
     * All key fields of the TestEntityCircularLinkParent entity
     */
    static _keys = ['KeyProperty'];
    /**
     * Key Property.
     * Maximum length: 10.
     */
    keyProperty;
    /**
     * One-to-one navigation property to the {@link TestEntityCircularLinkChild} entity.
     */
    toFirstChild;
    /**
     * One-to-many navigation property to the {@link TestEntityCircularLinkChild} entity.
     */
    toChildren;
    constructor(_entityApi) {
        super(_entityApi);
        this._entityApi = _entityApi;
    }
}
exports.TestEntityCircularLinkParent = TestEntityCircularLinkParent;
//# sourceMappingURL=TestEntityCircularLinkParent.js.map