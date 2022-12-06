"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiSchemaTestEntity = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
/**
 * This class represents the entity "MultiSchemaTestEntity" of service "API_MULTIPLE_SCHEMAS_SRV".
 */
class MultiSchemaTestEntity extends odata_v2_1.Entity {
    _entityApi;
    /**
     * Technical entity name for MultiSchemaTestEntity.
     */
    static _entityName = 'MultiSchemaTestEntity';
    /**
     * Default url path for the according service.
     */
    static _defaultServicePath = 'VALUE_IS_UNDEFINED';
    /**
     * All key fields of the MultiSchemaTestEntity entity
     */
    static _keys = ['KeyProperty'];
    /**
     * Key Property.
     */
    keyProperty;
    constructor(_entityApi) {
        super(_entityApi);
        this._entityApi = _entityApi;
        (0, odata_v2_1.nonEnumerable)(this, '_entityApi');
    }
}
exports.MultiSchemaTestEntity = MultiSchemaTestEntity;
//# sourceMappingURL=MultiSchemaTestEntity.js.map