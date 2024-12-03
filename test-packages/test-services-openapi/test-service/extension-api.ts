/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
/**
 * Representation of the 'ExtensionApi'.
 * This API is part of the 'test-service' service.
 */
export const ExtensionApi = {
  /**
   * Create a request builder for execution of get requests to the '/base/path/to/service/test-cases/extension||/test-cases/extension' endpoint.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  niceGetFunction: () =>
    new OpenApiRequestBuilder<any>(
      'get',
      '/base/path/to/service/test-cases/extension'
    ),
  /**
   * Create a request builder for execution of post requests to the '/base/path/to/service/test-cases/extension||/test-cases/extension' endpoint.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  nicePostFunction: () =>
    new OpenApiRequestBuilder<any>(
      'post',
      '/base/path/to/service/test-cases/extension'
    )
};
