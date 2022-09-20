/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
/**
 * Representation of the 'TagSpaceApi'.
 * This API is part of the 'test-service' service.
 */
export const TagSpaceApi = {
  /**
   * Create a request builder for execution of post requests to the '/test-cases/special-tag' endpoint.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  tagWithSpace: () => new OpenApiRequestBuilder<any>(
    'post',
    '/test-cases/special-tag'
  )
};
