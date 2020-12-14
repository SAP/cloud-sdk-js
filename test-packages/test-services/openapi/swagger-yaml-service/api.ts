/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import { DefaultApi } from './openapi/api';


export const SwaggerYamlServiceApi = {
  postEntity: (queryParam?: string) => new OpenApiRequestBuilder<DefaultApi, 'postEntity'>(
    DefaultApi,
    'postEntity',
    queryParam
  )
};
