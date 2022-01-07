/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
/**
 * Representation of the 'TagDotApi'.
 * This API is part of the 'test-service' service.
 */
export const TagDotApi = {
  /**
   * Create a request builder for execution of get requests to the '/test-cases/special-tag' endpoint.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  tagWithDot: () => new OpenApiRequestBuilder<any>(
    'get',
    '/test-cases/special-tag'
  )
};
