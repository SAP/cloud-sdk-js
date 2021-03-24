"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsApi = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
exports.JobsApi = {
    getV1JobsByJobId: function (jobId) { return new core_1.OpenApiRequestBuilder('get', "/v1/jobs/" + jobId); }
};
//# sourceMappingURL=jobs-api.js.map