"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceGroupApi = void 0;
/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'ResourceGroupApi'.
 * This API is part of the 'AI_CORE_API' service.
 */
exports.ResourceGroupApi = {
    /**
     * Retrieve a list of resource groups for a given tenant.
     *
     * @param queryParameters - Object containing the following keys: $top, $skip, $count, continueToken, labelSelector.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kubesubmitV4ResourcegroupsGetAll: (queryParameters) => new openapi_1.OpenApiRequestBuilder('get', '/admin/resourceGroups', {
        queryParameters
    }),
    /**
     * Create resource group to a given main tenant. The length of resource group id must be between 3 and 253.
     *
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kubesubmitV4ResourcegroupsCreate: (body) => new openapi_1.OpenApiRequestBuilder('post', '/admin/resourceGroups', {
        body
    }),
    /**
     * Get a resource group of a given main tenant.
     *
     * @param resourceGroupId - Resource group identifier
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kubesubmitV4ResourcegroupsGet: (resourceGroupId) => new openapi_1.OpenApiRequestBuilder('get', '/admin/resourceGroups/{resourceGroupId}', {
        pathParameters: { resourceGroupId }
    }),
    /**
     * Replace some characteristics of the resource group, for instance labels.
     *
     * @param resourceGroupId - Resource group identifier
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kubesubmitV4ResourcegroupsPatch: (resourceGroupId, body) => new openapi_1.OpenApiRequestBuilder('patch', '/admin/resourceGroups/{resourceGroupId}', {
        pathParameters: { resourceGroupId },
        body
    }),
    /**
     * Delete a resource group of a given main tenant.
     *
     * @param resourceGroupId - Resource group identifier
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kubesubmitV4ResourcegroupsDelete: (resourceGroupId) => new openapi_1.OpenApiRequestBuilder('delete', '/admin/resourceGroups/{resourceGroupId}', {
        pathParameters: { resourceGroupId }
    })
};
//# sourceMappingURL=resource-group-api.js.map