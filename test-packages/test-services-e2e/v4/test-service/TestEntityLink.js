"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntityLink = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * This class represents the entity "TestEntityLink" of service "TestService".
 */
class TestEntityLink extends odata_v4_1.Entity {
    _entityApi;
    /**
     * Technical entity name for TestEntityLink.
     */
    static _entityName = 'TestEntityLink';
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath = '/odata/test-service';
    /**
     * All key fields of the TestEntityLink entity
     */
    static _keys = ['KeyTestEntityLink', 'KeyToTestEntity'];
    /**
     * Key Test Entity Link.
     */
    keyTestEntityLink;
    /**
     * Key To Test Entity.
     */
    keyToTestEntity;
    /**
     * String Property.
     * Maximum length: 111.
     * @nullable
     */
    stringProperty;
    constructor(_entityApi) {
        super(_entityApi);
        this._entityApi = _entityApi;
        (0, odata_v4_1.nonEnumerable)(this, '_entityApi');
    }
}
exports.TestEntityLink = TestEntityLink;
//# sourceMappingURL=TestEntityLink.js.map