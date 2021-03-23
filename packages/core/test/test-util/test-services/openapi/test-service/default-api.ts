/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '../../../../../src';

export const DefaultApi = {
  noTag: () => new OpenApiRequestBuilder<any>(
    'get',
    '/test-cases/default-tag'
  ),
  defaultTag: () => new OpenApiRequestBuilder<any>(
    'post',
    '/test-cases/default-tag'
  )
};
