"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntityCircularLinkChild = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * This class represents the entity "A_TestEntityCircularLinkChild" of service "API_TEST_SRV".
 */
class TestEntityCircularLinkChild extends odata_v2_1.Entity {
    _entityApi;
    /**
     * Technical entity name for TestEntityCircularLinkChild.
     */
    static _entityName = 'A_TestEntityCircularLinkChild';
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
    /**
     * All key fields of the TestEntityCircularLinkChild entity
     */
    static _keys = ['KeyProperty'];
    /**
     * Key Property.
     */
    keyProperty;
    /**
     * One-to-many navigation property to the {@link TestEntityCircularLinkChild} entity.
     */
    toParent;
    constructor(_entityApi) {
        super(_entityApi);
        this._entityApi = _entityApi;
    }
}
exports.TestEntityCircularLinkChild = TestEntityCircularLinkChild;
//# sourceMappingURL=TestEntityCircularLinkChild.js.map