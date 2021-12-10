"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiSchemaTestEntityApi = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const MultiSchemaTestEntity_1 = require("./MultiSchemaTestEntity");
const MultiSchemaTestEntityRequestBuilder_1 = require("./MultiSchemaTestEntityRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const internal_1 = require("@sap-cloud-sdk/odata-common/internal");
class MultiSchemaTestEntityApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = MultiSchemaTestEntity_1.MultiSchemaTestEntity;
        this.deSerializers = (0, odata_v2_1.mergeDefaultDeSerializersWith)(deSerializers);
        const fieldBuilder = new internal_1.FieldBuilder(MultiSchemaTestEntity_1.MultiSchemaTestEntity, this.deSerializers);
        this.schema =
            {
                /**
             * Static representation of the [[keyProperty]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
                KEY_PROPERTY: fieldBuilder.buildEdmTypeField('KeyProperty', 'Edm.String', false),
            };
    }
    requestBuilder() {
        return new MultiSchemaTestEntityRequestBuilder_1.MultiSchemaTestEntityRequestBuilder(this);
    }
    entityBuilder() {
        return (0, internal_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new internal_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
}
exports.MultiSchemaTestEntityApi = MultiSchemaTestEntityApi;
//# sourceMappingURL=MultiSchemaTestEntityApi.js.map