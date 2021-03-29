/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';

/**
 * Representation of the ExtensionApi API.
 * This API is part of the TestService service.
 * 
 * This API client has been created automatically using the SAP Cloud SDK - do not edit manually.
*/
export const ExtensionApi = {
  /**
   * Makes a get request to the '/test-cases/extension' endpoint and returns a 'any'
   * 
   * @returns any
  */
  niceGetFunction: () => new OpenApiRequestBuilder<any>(
    'get',
    '/test-cases/extension'
  ),
  /**
   * Makes a post request to the '/test-cases/extension' endpoint and returns a 'any'
   * 
   * @returns any
  */
  nicePostFunction: () => new OpenApiRequestBuilder<any>(
    'post',
    '/test-cases/extension'
  )
};
