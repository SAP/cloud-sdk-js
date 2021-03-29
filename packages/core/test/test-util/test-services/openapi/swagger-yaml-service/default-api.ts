/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '../../../../../src';
import type { TestEntity } from './schema';

/**
 * Representation of the DefaultApi API.
 * This API is part of the SwaggerYamlService service.
 *
 * This API client has been created automatically using the SAP Cloud SDK - do not edit manually.
 */
export const DefaultApi = {
  /**
   * Test POST
   *
   * @param pathParam Path parameter number 1
   * @param queryParameters Optional object containing the query parameters.
   * @returns TestEntity[]
   */
  postEntity: (pathParam: string, queryParameters?: { queryParam?: string }) =>
    new OpenApiRequestBuilder<TestEntity[]>('post', '/entities/{pathParam}', {
      pathParameters: { pathParam },
      queryParameters
    }),
  /**
   * Makes a patch request to the '/entities/{pathParam}' endpoint and returns a 'string'
   *
   * @param pathParam Path parameter number 1
   * @param body Optional object containing the request body of type 'TestEntity'
   * @returns string
   */
  patchEntity: (pathParam: string, body: TestEntity | undefined) =>
    new OpenApiRequestBuilder<string>('patch', '/entities/{pathParam}', {
      pathParameters: { pathParam },
      body
    })
};
