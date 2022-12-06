"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntitySingleLink = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * This class represents the entity "A_TestEntitySingleLink" of service "API_TEST_SRV".
 */
class TestEntitySingleLink extends odata_v4_1.Entity {
    _entityApi;
    /**
     * Technical entity name for TestEntitySingleLink.
     */
    static _entityName = 'A_TestEntitySingleLink';
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
    /**
     * All key fields of the TestEntitySingleLink entity
     */
    static _keys = ['KeyProperty'];
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
     * Key Property.
     * Maximum length: 10.
     */
    keyProperty;
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
        (0, odata_v4_1.nonEnumerable)(this, '_entityApi');
    }
}
exports.TestEntitySingleLink = TestEntitySingleLink;
//# sourceMappingURL=TestEntitySingleLink.js.map