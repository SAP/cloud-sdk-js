"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DockerRegistrySecretApi = void 0;
/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'DockerRegistrySecretApi'.
 * This API is part of the 'AI_CORE_API' service.
 */
exports.DockerRegistrySecretApi = {
    /**
     * Retrieve the stored secret metadata which matches the parameter dockerRegistryName. The base64 encoded field for the stored secret is not returned.
     *
     * @param dockerRegistryName - Name of the docker Registry store for the secret.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kubesubmitV4DockerRegistrySecretsGet: (dockerRegistryName) => new openapi_1.OpenApiRequestBuilder('get', '/admin/dockerRegistrySecrets/{dockerRegistryName}', {
        pathParameters: { dockerRegistryName }
    }),
    /**
     * Update a secret with name of dockerRegistryName if it exists.
     *
     * @param dockerRegistryName - Name of the docker Registry store for the secret.
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kubesubmitV4DockerRegistrySecretsPatch: (dockerRegistryName, body) => new openapi_1.OpenApiRequestBuilder('patch', '/admin/dockerRegistrySecrets/{dockerRegistryName}', {
        pathParameters: { dockerRegistryName },
        body
    }),
    /**
     * Delete a secret with the name of dockerRegistryName if it exists.
     * @param dockerRegistryName - Name of the docker Registry store for the secret.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kubesubmitV4DockerRegistrySecretsDelete: (dockerRegistryName) => new openapi_1.OpenApiRequestBuilder('delete', '/admin/dockerRegistrySecrets/{dockerRegistryName}', {
        pathParameters: { dockerRegistryName }
    }),
    /**
     * Retrieve a list of metadata of the stored secrets
     *
     * @param queryParameters - Object containing the following keys: $top, $skip, $count.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kubesubmitV4DockerRegistrySecretsQuery: (queryParameters) => new openapi_1.OpenApiRequestBuilder('get', '/admin/dockerRegistrySecrets', {
        queryParameters
    }),
    /**
     * Create a secret based on the configuration in the request body.
     *
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kubesubmitV4DockerRegistrySecretsCreate: (body) => new openapi_1.OpenApiRequestBuilder('post', '/admin/dockerRegistrySecrets', {
        body
    })
};
//# sourceMappingURL=docker-registry-secret-api.js.map