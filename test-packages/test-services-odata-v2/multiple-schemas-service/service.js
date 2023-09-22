"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multipleSchemasService = void 0;
/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const MultiSchemaTestEntityApi_1 = require("./MultiSchemaTestEntityApi");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const BatchRequest_1 = require("./BatchRequest");
function multipleSchemasService(deSerializers = odata_v2_1.defaultDeSerializers) {
    return new MultipleSchemasService((0, odata_v2_1.mergeDefaultDeSerializersWith)(deSerializers));
}
exports.multipleSchemasService = multipleSchemasService;
class MultipleSchemasService {
    apis = {};
    deSerializers;
    constructor(deSerializers) {
        this.deSerializers = deSerializers;
    }
    initApi(key, entityApi) {
        if (!this.apis[key]) {
            this.apis[key] = entityApi._privateFactory(this.deSerializers);
        }
        return this.apis[key];
    }
    get multiSchemaTestEntityApi() {
        return this.initApi('multiSchemaTestEntityApi', MultiSchemaTestEntityApi_1.MultiSchemaTestEntityApi);
    }
    get batch() {
        return BatchRequest_1.batch;
    }
    get changeset() {
        return BatchRequest_1.changeset;
    }
}
//# sourceMappingURL=service.js.map