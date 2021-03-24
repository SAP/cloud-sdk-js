/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import { WorkflowDefinition, WorkflowDefinitionVersion, WorkflowModel, SampleContext } from './model';

export const WorkflowDefinitionsApi = {
  getV1WorkflowDefinitions: (queryParameters?: {'$orderby'?: 'id' | 'id asc' | 'id desc' | 'version' | 'version asc' | 'version desc' | 'name' | 'name asc' | 'name desc' | 'createdAt' | 'createdAt asc' | 'createdAt desc' | 'createdBy' | 'createdBy asc' | 'createdBy desc',
  '$skip'?: number,
  '$top'?: number,
  '$inlinecount'?: 'allpages' | 'none'}) => new OpenApiRequestBuilder<WorkflowDefinition[]>(
    'get',
    '/v1/workflow-definitions',
    {
          queryParameters
        }
  ),
  getV1WorkflowDefinitionsByDefinitionId: (definitionId: string) => new OpenApiRequestBuilder<WorkflowDefinition>(
    'get',
    `/v1/workflow-definitions/${definitionId}`
  ),
  deleteV1WorkflowDefinitionsByDefinitionId: (definitionId: string, queryParameters?: {'cascade'?: boolean}) => new OpenApiRequestBuilder<any>(
    'delete',
    `/v1/workflow-definitions/${definitionId}`,
    {
          queryParameters
        }
  ),
  getV1WorkflowDefinitionsVersionsByDefinitionId: (definitionId: string, queryParameters?: {'$orderby'?: 'id' | 'id asc' | 'id desc' | 'version' | 'version asc' | 'version desc' | 'name' | 'name asc' | 'name desc' | 'createdAt' | 'createdAt asc' | 'createdAt desc' | 'createdBy' | 'createdBy asc' | 'createdBy desc',
  '$skip'?: number,
  '$top'?: number,
  '$inlinecount'?: 'allpages' | 'none'}) => new OpenApiRequestBuilder<WorkflowDefinitionVersion[]>(
    'get',
    `/v1/workflow-definitions/${definitionId}/versions`,
    {
          queryParameters
        }
  ),
  getV1WorkflowDefinitionsVersionsByDefinitionIdAndVersionNumber: (definitionId: string, versionNumber: string) => new OpenApiRequestBuilder<WorkflowDefinitionVersion>(
    'get',
    `/v1/workflow-definitions/${definitionId}/versions/${versionNumber}`
  ),
  getV1WorkflowDefinitionsModelByDefinitionId: (definitionId: string) => new OpenApiRequestBuilder<WorkflowModel>(
    'get',
    `/v1/workflow-definitions/${definitionId}/model`
  ),
  getV1WorkflowDefinitionsVersionsModelByDefinitionIdAndVersionNumber: (definitionId: string, versionNumber: string) => new OpenApiRequestBuilder<WorkflowModel>(
    'get',
    `/v1/workflow-definitions/${definitionId}/versions/${versionNumber}/model`
  ),
  getV1WorkflowDefinitionsSampleContextsDefaultStartContextByDefinitionId: (definitionId: string) => new OpenApiRequestBuilder<SampleContext>(
    'get',
    `/v1/workflow-definitions/${definitionId}/sample-contexts/default-start-context`
  ),
  getV1WorkflowDefinitionsVersionsSampleContextsDefaultStartContextByDefinitionIdAndVersionNumber: (definitionId: string, versionNumber: string) => new OpenApiRequestBuilder<SampleContext>(
    'get',
    `/v1/workflow-definitions/${definitionId}/versions/${versionNumber}/sample-contexts/default-start-context`
  )
};
