/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';


export const TestServiceDefaultApi = {
  noTag: (queryParameters?: {}) => new OpenApiRequestBuilder(
    'get',
    '/test-cases/default-tag',
    
  ),
  defaultTag: (queryParameters?: {}) => new OpenApiRequestBuilder(
    'post',
    '/test-cases/default-tag',
    
  )
};
