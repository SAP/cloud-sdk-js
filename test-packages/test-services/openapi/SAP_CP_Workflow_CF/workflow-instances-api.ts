/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import { WorkflowInstance, WorkflowInstanceStartPayload, WorkflowInstancesUpdatePayload, WorkflowInstanceUpdatePayload, CustomAttribute, AttachmentsContext, WorkflowInstanceErrorMessage, WorkflowInstanceExecutionLog, WorkflowInstanceRoles, WorkflowInstanceRolesUpdatePayload } from './model';

export const WorkflowInstancesApi = {
  getV1WorkflowInstances: (queryParameters?: {'$orderby'?: 'id asc' | 'id desc' | 'definitionId asc' | 'definitionId desc' | 'definitionVersion asc' | 'definitionVersion desc' | 'startedAt asc' | 'startedAt desc' | 'completedAt asc' | 'completedAt desc' | 'startedBy asc' | 'startedBy desc' | 'subject asc' | 'subject desc' | 'businessKey asc' | 'businessKey desc',
  '$skip'?: number,
  '$top'?: number,
  '$inlinecount'?: 'allpages' | 'none',
  '$expand'?: 'attributes',
  'id'?: string,
  'definitionId'?: string,
  'definitionVersion'?: string,
  'status'?: 'RUNNING' | 'ERRONEOUS' | 'SUSPENDED' | 'CANCELED' | 'COMPLETED',
  'startedAt'?: string,
  'startedFrom'?: string,
  'startedUpTo'?: string,
  'completedAt'?: string,
  'completedFrom'?: string,
  'completedUpTo'?: string,
  'startedBy'?: string,
  'subject'?: string,
  'containsText'?: string,
  'businessKey'?: string,
  'rootInstanceId'?: string,
  'parentInstanceId'?: string,
  'attributes.ExampleCustomAttribute'?: string}) => new OpenApiRequestBuilder<WorkflowInstance[]>(
    'get',
    '/v1/workflow-instances',
    {
          queryParameters
        }
  ),
  createV1WorkflowInstances: (body: WorkflowInstanceStartPayload) => new OpenApiRequestBuilder<WorkflowInstance>(
    'post',
    '/v1/workflow-instances',
    {
          body
        }
  ),
  updateV1WorkflowInstances: (body: WorkflowInstancesUpdatePayload[]) => new OpenApiRequestBuilder<any>(
    'patch',
    '/v1/workflow-instances',
    {
          body
        }
  ),
  getV1WorkflowInstancesByWorkflowInstanceId: (workflowInstanceId: string, queryParameters?: {'$expand'?: 'attributes'}) => new OpenApiRequestBuilder<WorkflowInstance>(
    'get',
    `/v1/workflow-instances/${workflowInstanceId}`,
    {
          queryParameters
        }
  ),
  updateV1WorkflowInstancesByWorkflowInstanceId: (workflowInstanceId: string, body: WorkflowInstanceUpdatePayload) => new OpenApiRequestBuilder<any>(
    'patch',
    `/v1/workflow-instances/${workflowInstanceId}`,
    {
          body
        }
  ),
  getV1WorkflowInstancesAttributesByWorkflowInstanceId: (workflowInstanceId: string) => new OpenApiRequestBuilder<CustomAttribute[]>(
    'get',
    `/v1/workflow-instances/${workflowInstanceId}/attributes`
  ),
  getV1WorkflowInstancesContextByWorkflowInstanceId: (workflowInstanceId: string) => new OpenApiRequestBuilder<Record<string, any>>(
    'get',
    `/v1/workflow-instances/${workflowInstanceId}/context`
  ),
  updateV1WorkflowInstancesContextByWorkflowInstanceId: (workflowInstanceId: string, body: Record<string, any>) => new OpenApiRequestBuilder<any>(
    'put',
    `/v1/workflow-instances/${workflowInstanceId}/context`,
    {
          body
        }
  ),
  getV1WorkflowInstancesAttachmentsByWorkflowInstanceId: (workflowInstanceId: string) => new OpenApiRequestBuilder<AttachmentsContext>(
    'get',
    `/v1/workflow-instances/${workflowInstanceId}/attachments`
  ),
  updateV1WorkflowInstancesAttachmentsByWorkflowInstanceId: (workflowInstanceId: string, body: AttachmentsContext) => new OpenApiRequestBuilder<any>(
    'put',
    `/v1/workflow-instances/${workflowInstanceId}/attachments`,
    {
          body
        }
  ),
  getV1WorkflowInstancesErrorMessagesByWorkflowInstanceId: (workflowInstanceId: string) => new OpenApiRequestBuilder<WorkflowInstanceErrorMessage[]>(
    'get',
    `/v1/workflow-instances/${workflowInstanceId}/error-messages`
  ),
  getV1WorkflowInstancesExecutionLogsByWorkflowInstanceId: (workflowInstanceId: string) => new OpenApiRequestBuilder<WorkflowInstanceExecutionLog[]>(
    'get',
    `/v1/workflow-instances/${workflowInstanceId}/execution-logs`
  ),
  getV1WorkflowInstancesRolesByWorkflowInstanceId: (workflowInstanceId: string) => new OpenApiRequestBuilder<WorkflowInstanceRoles>(
    'get',
    `/v1/workflow-instances/${workflowInstanceId}/roles`
  ),
  updateV1WorkflowInstancesRolesByWorkflowInstanceId: (workflowInstanceId: string, body: WorkflowInstanceRolesUpdatePayload) => new OpenApiRequestBuilder<any>(
    'patch',
    `/v1/workflow-instances/${workflowInstanceId}/roles`,
    {
          body
        }
  ),
  updateV1WorkflowInstancesContextByWorkflowInstanceId1: (workflowInstanceId: string, body: Record<string, any>) => new OpenApiRequestBuilder<any>(
    'patch',
    `/v1/workflow-instances/${workflowInstanceId}/context`,
    {
          body
        }
  )
};
