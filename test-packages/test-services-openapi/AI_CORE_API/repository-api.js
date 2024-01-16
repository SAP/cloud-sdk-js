"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryApi = void 0;
/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'RepositoryApi'.
 * This API is part of the 'AI_CORE_API' service.
 */
exports.RepositoryApi = {
    /**
     * Retrieve a list of all GitOps repositories for a tenant.
     * @param queryParameters - Object containing the following keys: $top, $skip, $count.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kubesubmitV4RepositoriesGetAll: (queryParameters) => new openapi_1.OpenApiRequestBuilder('get', '/admin/repositories', {
        queryParameters
    }),
    /**
     * On-board a new GitOps repository as specified in the content payload
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kubesubmitV4RepositoriesCreate: (body) => new openapi_1.OpenApiRequestBuilder('post', '/admin/repositories', {
        body
    }),
    /**
     * Retrieve the access details for a repository if it exists.
     * @param repositoryName - Name of the repository
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kubesubmitV4RepositoriesGet: (repositoryName) => new openapi_1.OpenApiRequestBuilder('get', '/admin/repositories/{repositoryName}', {
        pathParameters: { repositoryName }
    }),
    /**
     * Update the referenced repository credentials to synchronize a repository.
     *
     * @param repositoryName - Name of the repository
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kubesubmitV4RepositoriesUpdate: (repositoryName, body) => new openapi_1.OpenApiRequestBuilder('patch', '/admin/repositories/{repositoryName}', {
        pathParameters: { repositoryName },
        body
    }),
    /**
     * Remove a repository from GitOps.
     * @param repositoryName - Name of the repository
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kubesubmitV4RepositoriesDelete: (repositoryName) => new openapi_1.OpenApiRequestBuilder('delete', '/admin/repositories/{repositoryName}', {
        pathParameters: { repositoryName }
    })
};
//# sourceMappingURL=repository-api.js.map