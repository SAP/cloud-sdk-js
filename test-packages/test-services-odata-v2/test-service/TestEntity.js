"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * This class represents the entity "A_TestEntity" of service "API_TEST_SRV".
 */
class TestEntity extends odata_v2_1.Entity {
    _entityApi;
    /**
     * Technical entity name for TestEntity.
     */
    static _entityName = 'A_TestEntity';
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
    /**
     * All key fields of the TestEntity entity
     */
    static _keys = ['KeyPropertyGuid', 'KeyPropertyString'];
    /**
     * Key Property Guid.
     */
    keyPropertyGuid;
    /**
     * Key Property String.
     */
    keyPropertyString;
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
     * Int 32 Property.
     * @nullable
     */
    int32Property;
    /**
     * Int 64 Property.
     * @nullable
     */
    int64Property;
    /**
     * Decimal Property.
     * @nullable
     */
    decimalProperty;
    /**
     * Single Property.
     * @nullable
     */
    singleProperty;
    /**
     * Double Property.
     * @nullable
     */
    doubleProperty;
    /**
     * Float Property.
     * @nullable
     */
    floatProperty;
    /**
     * Time Property.
     * @nullable
     */
    timeProperty;
    /**
     * Date Time Property.
     * @nullable
     */
    dateTimeProperty;
    /**
     * Date Time Off Set Property.
     * @nullable
     */
    dateTimeOffSetProperty;
    /**
     * Byte Property.
     * @nullable
     */
    byteProperty;
    /**
     * S Byte Property.
     * @nullable
     */
    sByteProperty;
    /**
     * Something The Sdk Does Not Support.
     * @nullable
     */
    somethingTheSdkDoesNotSupport;
    /**
     * Complex Type Property.
     * @nullable
     */
    complexTypeProperty;
    /**
     * One-to-many navigation property to the {@link TestEntityMultiLink} entity.
     */
    toMultiLink;
    /**
     * One-to-many navigation property to the {@link TestEntityOtherMultiLink} entity.
     */
    toOtherMultiLink;
    /**
     * One-to-one navigation property to the {@link TestEntitySingleLink} entity.
     */
    toSingleLink;
    constructor(_entityApi) {
        super(_entityApi);
        this._entityApi = _entityApi;
    }
}
exports.TestEntity = TestEntity;
//# sourceMappingURL=TestEntity.js.map