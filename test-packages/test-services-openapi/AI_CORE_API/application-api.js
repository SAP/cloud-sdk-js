"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationApi = void 0;
/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'ApplicationApi'.
 * This API is part of the 'AI_CORE_API' service.
 */
exports.ApplicationApi = {
    /**
     * Return all Argo CD application data objects.
     *
     * @param queryParameters - Object containing the following keys: $top, $skip, $count.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kubesubmitV4ApplicationsGetAll: (queryParameters) => new openapi_1.OpenApiRequestBuilder('get', '/admin/applications', {
        queryParameters
    }),
    /**
     * Create an ArgoCD application to synchronise a repository.
     *
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kubesubmitV4ApplicationsCreate: (body) => new openapi_1.OpenApiRequestBuilder('post', '/admin/applications', {
        body
    }),
    /**
     * Returns the ArgoCD application health and sync status.
     *
     * @param applicationName - Name of the ArgoCD application
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kubesubmitV4ApplicationsGetStatus: (applicationName) => new openapi_1.OpenApiRequestBuilder('get', '/admin/applications/{applicationName}/status', {
        pathParameters: { applicationName }
    }),
    /**
     * Retrieve the ArgoCD application details.
     *
     * @param applicationName - Name of the ArgoCD application
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kubesubmitV4ApplicationsGet: (applicationName) => new openapi_1.OpenApiRequestBuilder('get', '/admin/applications/{applicationName}', {
        pathParameters: { applicationName }
    }),
    /**
     * Update the referenced ArgoCD application to synchronize the repository.
     *
     * @param applicationName - Name of the ArgoCD application
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kubesubmitV4ApplicationsUpdate: (applicationName, body) => new openapi_1.OpenApiRequestBuilder('patch', '/admin/applications/{applicationName}', {
        pathParameters: { applicationName },
        body
    }),
    /**
     * Delete an ArgoCD application
     * @param applicationName - Name of the ArgoCD application
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kubesubmitV4ApplicationsDelete: (applicationName) => new openapi_1.OpenApiRequestBuilder('delete', '/admin/applications/{applicationName}', {
        pathParameters: { applicationName }
    }),
    /**
     * Schedules a refresh of the specified application that will be picked up by ArgoCD asynchronously
     *
     * @param applicationName - Name of the ArgoCD application
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kubesubmitV4ApplicationsRefresh: (applicationName) => new openapi_1.OpenApiRequestBuilder('post', '/admin/applications/{applicationName}/refresh', {
        pathParameters: { applicationName }
    })
};
//# sourceMappingURL=application-api.js.map