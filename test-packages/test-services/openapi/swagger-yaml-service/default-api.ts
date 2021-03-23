/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import { TestEntity } from './model';

export const DefaultApi = {
  postEntity: (pathParam: string, queryParameters?: {'queryParam'?: string}) => new OpenApiRequestBuilder<TestEntity[]>(
    'post',
    `/entities/${pathParam}`,
    {
          queryParameters
        }
  ),
  patchEntity: (pathParam: string, body: TestEntity | undefined) => new OpenApiRequestBuilder<string>(
    'patch',
    `/entities/${pathParam}`,
    {
          body
        }
  )
};
