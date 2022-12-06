"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * This class represents the entity "A_TestEntity" of service "API_TEST_SRV".
 */
class TestEntity extends odata_v4_1.Entity {
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
     * Time Of Day Property.
     * @nullable
     */
    timeOfDayProperty;
    /**
     * Date Property.
     * @nullable
     */
    dateProperty;
    /**
     * Date Time Off Set Property.
     * @nullable
     */
    dateTimeOffSetProperty;
    /**
     * Duration Property.
     * @nullable
     */
    durationProperty;
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
     * Geography Point Property.
     * @nullable
     */
    geographyPointProperty;
    /**
     * Something The Sdk Does Not Support.
     * @nullable
     */
    somethingTheSdkDoesNotSupport;
    /**
     * Collection Property.
     * Maximum length: 10.
     * @nullable
     */
    collectionProperty;
    /**
     * Complex Type Property.
     * @nullable
     */
    complexTypeProperty;
    /**
     * Complex Type Collection Property.
     * @nullable
     */
    complexTypeCollectionProperty;
    /**
     * Enum Property.
     * @nullable
     */
    enumProperty;
    /**
     * Enum Property Int 64.
     * @nullable
     */
    enumPropertyInt64;
    /**
     * Enum Property With One Member.
     * @nullable
     */
    enumPropertyWithOneMember;
    /**
     * Enum Collection Property.
     * @nullable
     */
    enumCollectionProperty;
    /**
     * One-to-many navigation property to the {@link TestEntityMultiLink} entity.
     */
    toMultiLink;
    /**
     * One-to-many navigation property to the {@link TestEntityMultiLink} entity.
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
    /**
     * Bound Function Without Arguments.
     * @param parameters - Object containing all parameters for the function.
     * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
     */
    boundFunctionWithoutArguments(parameters, deSerializers) {
        const params = {};
        return new odata_v4_1.BoundFunctionImportRequestBuilder(this._entityApi, this, 'boundFunctionWithoutArguments', data => (0, odata_v4_1.transformReturnValueForEdmType)(data, val => (0, odata_v4_1.edmToTs)(val.value, 'Edm.String', deSerializers || odata_v4_1.defaultDeSerializers)), params, deSerializers || odata_v4_1.defaultDeSerializers);
    }
    /**
     * Bound Function With Arguments.
     * @param parameters - Object containing all parameters for the function.
     * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
     */
    boundFunctionWithArguments(parameters, deSerializers) {
        const params = {
            param1: new odata_v4_1.FunctionImportParameter('param1', 'Edm.String', parameters.param1),
            param2: new odata_v4_1.FunctionImportParameter('param2', 'Edm.String', parameters.param2)
        };
        return new odata_v4_1.BoundFunctionImportRequestBuilder(this._entityApi, this, 'boundFunctionWithArguments', data => (0, odata_v4_1.transformReturnValueForEdmType)(data, val => (0, odata_v4_1.edmToTs)(val.value, 'Edm.String', deSerializers || odata_v4_1.defaultDeSerializers)), params, deSerializers || odata_v4_1.defaultDeSerializers);
    }
    /**
     * Bound Action Without Arguments.
     * @param parameters - Object containing all parameters for the action.
     * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
     */
    boundActionWithoutArguments(parameters, deSerializers) {
        const params = {};
        return new odata_v4_1.BoundActionImportRequestBuilder(this._entityApi, this, 'boundActionWithoutArguments', data => (0, odata_v4_1.transformReturnValueForEdmType)(data, val => (0, odata_v4_1.edmToTs)(val.value, 'Edm.String', deSerializers || odata_v4_1.defaultDeSerializers)), params, deSerializers || odata_v4_1.defaultDeSerializers);
    }
}
exports.TestEntity = TestEntity;
//# sourceMappingURL=TestEntity.js.map