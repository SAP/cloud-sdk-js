"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntityLink = void 0;
/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * This class represents the entity "TestEntityLink" of service "TestService".
 */
class TestEntityLink extends odata_v4_1.Entity {
    /**
     * Technical entity name for TestEntityLink.
     */
    static _entityName = 'TestEntityLink';
    /**
     * Default url path for the according service.
     */
    static _defaultBasePath = '/odata/test-service';
    /**
     * All key fields of the TestEntityLink entity
     */
    static _keys = ['KeyTestEntityLink', 'KeyToTestEntity'];
    constructor(_entityApi) {
        super(_entityApi);
    }
}
exports.TestEntityLink = TestEntityLink;
//# sourceMappingURL=TestEntityLink.js.map