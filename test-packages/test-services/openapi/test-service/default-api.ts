/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import { DefaultApi } from './openapi/api';


export const TestServiceDefaultApi = {
  noTag: () => new OpenApiRequestBuilder<DefaultApi, 'noTag'>(
    DefaultApi,
    'noTag'
  ),
  defaultTag: () => new OpenApiRequestBuilder<DefaultApi, 'defaultTag'>(
    DefaultApi,
    'defaultTag'
  )
};
