"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectStoreSecretApi = void 0;
/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'ObjectStoreSecretApi'.
 * This API is part of the 'AI_CORE_API' service.
 */
exports.ObjectStoreSecretApi = {
    /**
     * Retrieve a list of metadata of the stored secrets.
     *
     * @param queryParameters - Object containing the following keys: $top, $skip, $count.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kubesubmitV4ObjectStoreSecretsQuery: (queryParameters) => new openapi_1.OpenApiRequestBuilder('get', '/admin/objectStoreSecrets', {
        queryParameters
    }),
    /**
     * Create a secret based on the configuration in the request body
     *
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kubesubmitV4ObjectStoreSecretsCreate: (body) => new openapi_1.OpenApiRequestBuilder('post', '/admin/objectStoreSecrets', {
        body
    }),
    /**
     * This retrieves the metadata of the stored secret which match the parameter objectStoreName.
     * The fetched secret is constructed like objectStoreName-object-store-secret
     * The base64 encoded field for the stored secret is not returned.
     *
     * @param objectStoreName - Name of the object store for the secret.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kubesubmitV4ObjectStoreSecretsGet: (objectStoreName) => new openapi_1.OpenApiRequestBuilder('get', '/admin/objectStoreSecrets/{objectStoreName}', {
        pathParameters: { objectStoreName }
    }),
    /**
     * Update a secret with name of objectStoreName if it exists.
     *
     * @param objectStoreName - Name of the object store for the secret.
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kubesubmitV4ObjectStoreSecretsPatch: (objectStoreName, body) => new openapi_1.OpenApiRequestBuilder('patch', '/admin/objectStoreSecrets/{objectStoreName}', {
        pathParameters: { objectStoreName },
        body
    }),
    /**
     * Delete a secret with the name of objectStoreName if it exists.
     * @param objectStoreName - Name of the object store for the secret.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    kubesubmitV4ObjectStoreSecretsDelete: (objectStoreName) => new openapi_1.OpenApiRequestBuilder('delete', '/admin/objectStoreSecrets/{objectStoreName}', {
        pathParameters: { objectStoreName }
    })
};
//# sourceMappingURL=object-store-secret-api.js.map