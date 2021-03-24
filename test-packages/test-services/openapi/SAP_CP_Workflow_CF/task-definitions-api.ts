/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import { TaskDefinitionList } from './model';

export const TaskDefinitionsApi = {
  getV1TaskDefinitions: (queryParameters?: {'$skip'?: number,
  '$top'?: number,
  '$inlinecount'?: 'allpages' | 'none',
  '$expand'?: 'attributeDefinitions'}) => new OpenApiRequestBuilder<TaskDefinitionList>(
    'get',
    '/v1/task-definitions',
    {
          queryParameters
        }
  )
};
