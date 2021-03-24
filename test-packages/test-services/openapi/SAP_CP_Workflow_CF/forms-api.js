"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormsApi = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
exports.FormsApi = {
    getV1Forms: function (queryParameters) { return new core_1.OpenApiRequestBuilder('get', '/v1/forms', {
        queryParameters: queryParameters
    }); },
    deleteV1FormsByFormId: function (formId) { return new core_1.OpenApiRequestBuilder('delete', "/v1/forms/" + formId); },
    getV1FormsRevisionsModelByFormIdAndRevisionId: function (formId, revisionId) { return new core_1.OpenApiRequestBuilder('get', "/v1/forms/" + formId + "/revisions/" + revisionId + "/model"); },
    getV1FormsVersionsModelByFormIdAndVersionNumber: function (formId, versionNumber) { return new core_1.OpenApiRequestBuilder('get', "/v1/forms/" + formId + "/versions/" + versionNumber + "/model"); }
};
//# sourceMappingURL=forms-api.js.map