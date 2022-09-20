/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
/**
 * Representation of the 'DefaultApi'.
 * This API is part of the 'no-schema-service' service.
 */
export const DefaultApi = {
  /**
   * Create a request builder for execution of get requests to the '/' endpoint.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  get: () => new OpenApiRequestBuilder<any>(
    'get',
    '/'
  )
};
