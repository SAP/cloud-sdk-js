"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntityMultiLink = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * This class represents the entity "A_TestEntityMultiLink" of service "API_TEST_SRV".
 */
class TestEntityMultiLink extends odata_v2_1.Entity {
    _entityApi;
    /**
     * Technical entity name for TestEntityMultiLink.
     */
    static _entityName = 'A_TestEntityMultiLink';
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
    /**
     * All key fields of the TestEntityMultiLink entity
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
    /**
     * One-to-many navigation property to the {@link TestEntityLvl2MultiLink} entity.
     */
    toMultiLink;
    /**
     * One-to-one navigation property to the {@link TestEntityLvl2SingleLink} entity.
     */
    toSingleLink;
    constructor(_entityApi) {
        super(_entityApi);
        this._entityApi = _entityApi;
        (0, odata_v2_1.nonEnumerable)(this, '_entityApi');
    }
}
exports.TestEntityMultiLink = TestEntityMultiLink;
//# sourceMappingURL=TestEntityMultiLink.js.map