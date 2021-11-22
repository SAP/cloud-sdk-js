"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Casetest_1 = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const Casetest_1RequestBuilder_1 = require("./Casetest_1RequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const internal_1 = require("@sap-cloud-sdk/odata-common/internal");
/**
 * This class represents the entity "A_CASETEST" of service "API_TEST_SRV".
 */
class Casetest_1 extends odata_v2_1.Entity {
    /**
     * Returns an entity builder to construct instances of `Casetest_1`.
     * @returns A builder that constructs instances of entity type `Casetest_1`.
     */
    static builder() {
        return odata_v2_1.Entity.entityBuilder(Casetest_1);
    }
    /**
     * Returns a request builder to construct requests for operations on the `Casetest_1` entity type.
     * @returns A `Casetest_1` request builder.
     */
    static requestBuilder() {
        return new Casetest_1RequestBuilder_1.Casetest_1RequestBuilder();
    }
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `Casetest_1`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `Casetest_1`.
     */
    static customField(fieldName) {
        return odata_v2_1.Entity.customFieldSelector(fieldName, Casetest_1);
    }
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    toJSON() {
        return { ...this, ...this._customFields };
    }
}
exports.Casetest_1 = Casetest_1;
/**
 * Technical entity name for Casetest_1.
 */
Casetest_1._entityName = 'A_CASETEST';
/**
 * Default url path for the according service.
 */
Casetest_1._defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
(function (Casetest_1) {
    const _fieldBuilder = new internal_1.FieldBuilder(Casetest_1);
    /**
     * Static representation of the [[keyPropertyString]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    Casetest_1.KEY_PROPERTY_STRING = _fieldBuilder.buildEdmTypeField('KeyPropertyString', 'Edm.String', false);
    /**
     * All fields of the Casetest_1 entity.
     */
    Casetest_1._allFields = [
        Casetest_1.KEY_PROPERTY_STRING
    ];
    /**
     * All fields selector.
     */
    Casetest_1.ALL_FIELDS = new internal_1.AllFields('*', Casetest_1);
    /**
     * All key fields of the Casetest_1 entity.
     */
    Casetest_1._keyFields = [Casetest_1.KEY_PROPERTY_STRING];
    /**
     * Mapping of all key field names to the respective static field property Casetest_1.
     */
    Casetest_1._keys = Casetest_1._keyFields.reduce((acc, field) => {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(Casetest_1 = exports.Casetest_1 || (exports.Casetest_1 = {}));
//# sourceMappingURL=Casetest_1.js.map