/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '../../../../../src';
import { DefaultApi } from './openapi/api';
import { TestEntity } from './openapi/model';

export const SwaggerYamlServiceDefaultApi = {
  postEntity: (args: {
    pathParam: string,
    queryParam?: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'postEntity'>(
    DefaultApi,
    'postEntity',
    args.pathParam,
    args.queryParam
  ),
  patchEntity: (args: {
    pathParam: string,
    body?: TestEntity
  }) => new OpenApiRequestBuilder<DefaultApi, 'patchEntity'>(
    DefaultApi,
    'patchEntity',
    args.pathParam,
    args.body
  )
};
