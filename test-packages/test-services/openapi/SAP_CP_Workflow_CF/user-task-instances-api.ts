/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import { TaskInstance, UpdateTaskInstancePayload, CustomAttribute, AttachmentsContext, FormMetadata, FormModel } from './model';

export const UserTaskInstancesApi = {
  getV1TaskInstances: (queryParameters?: {'$skip'?: number,
  '$top'?: number,
  '$inlinecount'?: 'allpages' | 'none',
  '$expand'?: 'attributes',
  '$orderby'?: 'claimedAt asc' | 'claimedAt desc' | 'completedAt asc' | 'completedAt desc' | 'createdAt asc' | 'createdAt desc' | 'lastChangedAt asc' | 'lastChangedAt desc' | 'dueDate asc' | 'dueDate desc' | 'subject asc' | 'subject desc' | 'description asc' | 'description desc' | 'activityId asc' | 'activityId desc' | 'id asc' | 'id desc' | 'processor asc' | 'processor desc' | 'workflowDefinitionId asc' | 'workflowDefinitionId desc' | 'workflowInstanceId asc' | 'workflowInstanceId desc' | 'priority asc' | 'priority desc',
  'workflowInstanceId'?: string,
  'workflowDefinitionId'?: string,
  'processor'?: string,
  'id'?: string,
  'activityId'?: string,
  'description'?: string,
  'subject'?: string,
  'createdAt'?: string,
  'createdFrom'?: string,
  'createdUpTo'?: string,
  'claimedAt'?: string,
  'claimedFrom'?: string,
  'claimedUpTo'?: string,
  'completedAt'?: string,
  'completedFrom'?: string,
  'completedUpTo'?: string,
  'lastChangedAt'?: string,
  'lastChangedFrom'?: string,
  'lastChangedUpTo'?: string,
  'dueDate'?: string,
  'dueDateFrom'?: string,
  'dueDateUpTo'?: string,
  'priority'?: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH',
  'status'?: 'READY' | 'RESERVED' | 'COMPLETED' | 'CANCELED',
  'recipientUsers'?: string,
  'recipientGroups'?: string,
  'containsText'?: string,
  'attributes.ExampleCustomAttribute'?: string,
  'definitionId'?: string}) => new OpenApiRequestBuilder<TaskInstance[]>(
    'get',
    '/v1/task-instances',
    {
          queryParameters
        }
  ),
  getV1TaskInstancesByTaskInstanceId: (taskInstanceId: string, queryParameters?: {'$expand'?: 'attributes'}) => new OpenApiRequestBuilder<TaskInstance>(
    'get',
    `/v1/task-instances/${taskInstanceId}`,
    {
          queryParameters
        }
  ),
  updateV1TaskInstancesByTaskInstanceId: (taskInstanceId: string, body: UpdateTaskInstancePayload) => new OpenApiRequestBuilder<any>(
    'patch',
    `/v1/task-instances/${taskInstanceId}`,
    {
          body
        }
  ),
  getV1TaskInstancesAttributesByTaskInstanceId: (taskInstanceId: string) => new OpenApiRequestBuilder<CustomAttribute[]>(
    'get',
    `/v1/task-instances/${taskInstanceId}/attributes`
  ),
  getV1TaskInstancesContextByTaskInstanceId: (taskInstanceId: string) => new OpenApiRequestBuilder<Record<string, any>>(
    'get',
    `/v1/task-instances/${taskInstanceId}/context`
  ),
  getV1TaskInstancesAttachmentsByTaskInstanceId: (taskInstanceId: string) => new OpenApiRequestBuilder<AttachmentsContext>(
    'get',
    `/v1/task-instances/${taskInstanceId}/attachments`
  ),
  getV1TaskInstancesFormByTaskInstanceId: (taskInstanceId: string) => new OpenApiRequestBuilder<FormMetadata>(
    'get',
    `/v1/task-instances/${taskInstanceId}/form`
  ),
  getV1TaskInstancesFormModelByTaskInstanceId: (taskInstanceId: string) => new OpenApiRequestBuilder<FormModel>(
    'get',
    `/v1/task-instances/${taskInstanceId}/form/model`
  )
};
