"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowInstancesApi = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
exports.WorkflowInstancesApi = {
    getV1WorkflowInstances: function (queryParameters) { return new core_1.OpenApiRequestBuilder('get', '/v1/workflow-instances', {
        queryParameters: queryParameters
    }); },
    createV1WorkflowInstances: function (body) { return new core_1.OpenApiRequestBuilder('post', '/v1/workflow-instances', {
        body: body
    }); },
    updateV1WorkflowInstances: function (body) { return new core_1.OpenApiRequestBuilder('patch', '/v1/workflow-instances', {
        body: body
    }); },
    getV1WorkflowInstancesByWorkflowInstanceId: function (workflowInstanceId, queryParameters) { return new core_1.OpenApiRequestBuilder('get', "/v1/workflow-instances/" + workflowInstanceId, {
        queryParameters: queryParameters
    }); },
    updateV1WorkflowInstancesByWorkflowInstanceId: function (workflowInstanceId, body) { return new core_1.OpenApiRequestBuilder('patch', "/v1/workflow-instances/" + workflowInstanceId, {
        body: body
    }); },
    getV1WorkflowInstancesAttributesByWorkflowInstanceId: function (workflowInstanceId) { return new core_1.OpenApiRequestBuilder('get', "/v1/workflow-instances/" + workflowInstanceId + "/attributes"); },
    getV1WorkflowInstancesContextByWorkflowInstanceId: function (workflowInstanceId) { return new core_1.OpenApiRequestBuilder('get', "/v1/workflow-instances/" + workflowInstanceId + "/context"); },
    updateV1WorkflowInstancesContextByWorkflowInstanceId: function (workflowInstanceId, body) { return new core_1.OpenApiRequestBuilder('put', "/v1/workflow-instances/" + workflowInstanceId + "/context", {
        body: body
    }); },
    getV1WorkflowInstancesAttachmentsByWorkflowInstanceId: function (workflowInstanceId) { return new core_1.OpenApiRequestBuilder('get', "/v1/workflow-instances/" + workflowInstanceId + "/attachments"); },
    updateV1WorkflowInstancesAttachmentsByWorkflowInstanceId: function (workflowInstanceId, body) { return new core_1.OpenApiRequestBuilder('put', "/v1/workflow-instances/" + workflowInstanceId + "/attachments", {
        body: body
    }); },
    getV1WorkflowInstancesErrorMessagesByWorkflowInstanceId: function (workflowInstanceId) { return new core_1.OpenApiRequestBuilder('get', "/v1/workflow-instances/" + workflowInstanceId + "/error-messages"); },
    getV1WorkflowInstancesExecutionLogsByWorkflowInstanceId: function (workflowInstanceId) { return new core_1.OpenApiRequestBuilder('get', "/v1/workflow-instances/" + workflowInstanceId + "/execution-logs"); },
    getV1WorkflowInstancesRolesByWorkflowInstanceId: function (workflowInstanceId) { return new core_1.OpenApiRequestBuilder('get', "/v1/workflow-instances/" + workflowInstanceId + "/roles"); },
    updateV1WorkflowInstancesRolesByWorkflowInstanceId: function (workflowInstanceId, body) { return new core_1.OpenApiRequestBuilder('patch', "/v1/workflow-instances/" + workflowInstanceId + "/roles", {
        body: body
    }); },
    updateV1WorkflowInstancesContextByWorkflowInstanceId1: function (workflowInstanceId, body) { return new core_1.OpenApiRequestBuilder('patch', "/v1/workflow-instances/" + workflowInstanceId + "/context", {
        body: body
    }); }
};
//# sourceMappingURL=workflow-instances-api.js.map