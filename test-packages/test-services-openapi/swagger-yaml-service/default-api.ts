/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { TestEntity } from './schema';
/**
 * Representation of the 'DefaultApi'.
 * This API is part of the 'swagger-yaml-service' service.
 */
export const DefaultApi = {
  _defaultBasePath: undefined,
  /**
   * Test POST
   * @param pathParam - Path parameter.
   * @param queryParameters - Object containing the following keys: queryParam.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  postEntity: (pathParam: string, queryParameters?: { queryParam?: string }) =>
    new OpenApiRequestBuilder<TestEntity[]>(
      'post',
      '/entities/{pathParam}',
      {
        pathParameters: { pathParam },
        queryParameters
      },
      DefaultApi._defaultBasePath
    ),
  /**
   * Create a request builder for execution of patch requests to the '/entities/{pathParam}' endpoint.
   * @param pathParam - Path parameter.
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  patchEntity: (pathParam: string, body: TestEntity | undefined) =>
    new OpenApiRequestBuilder<string>(
      'patch',
      '/entities/{pathParam}',
      {
        pathParameters: { pathParam },
        body
      },
      DefaultApi._defaultBasePath
    )
};
