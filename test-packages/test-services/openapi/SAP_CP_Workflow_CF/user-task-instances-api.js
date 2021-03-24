"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTaskInstancesApi = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
exports.UserTaskInstancesApi = {
    getV1TaskInstances: function (queryParameters) { return new core_1.OpenApiRequestBuilder('get', '/v1/task-instances', {
        queryParameters: queryParameters
    }); },
    getV1TaskInstancesByTaskInstanceId: function (taskInstanceId, queryParameters) { return new core_1.OpenApiRequestBuilder('get', "/v1/task-instances/" + taskInstanceId, {
        queryParameters: queryParameters
    }); },
    updateV1TaskInstancesByTaskInstanceId: function (taskInstanceId, body) { return new core_1.OpenApiRequestBuilder('patch', "/v1/task-instances/" + taskInstanceId, {
        body: body
    }); },
    getV1TaskInstancesAttributesByTaskInstanceId: function (taskInstanceId) { return new core_1.OpenApiRequestBuilder('get', "/v1/task-instances/" + taskInstanceId + "/attributes"); },
    getV1TaskInstancesContextByTaskInstanceId: function (taskInstanceId) { return new core_1.OpenApiRequestBuilder('get', "/v1/task-instances/" + taskInstanceId + "/context"); },
    getV1TaskInstancesAttachmentsByTaskInstanceId: function (taskInstanceId) { return new core_1.OpenApiRequestBuilder('get', "/v1/task-instances/" + taskInstanceId + "/attachments"); },
    getV1TaskInstancesFormByTaskInstanceId: function (taskInstanceId) { return new core_1.OpenApiRequestBuilder('get', "/v1/task-instances/" + taskInstanceId + "/form"); },
    getV1TaskInstancesFormModelByTaskInstanceId: function (taskInstanceId) { return new core_1.OpenApiRequestBuilder('get', "/v1/task-instances/" + taskInstanceId + "/form/model"); }
};
//# sourceMappingURL=user-task-instances-api.js.map