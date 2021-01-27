/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import { DefaultApi } from './openapi/api';
import { UpdateTaskInstancePayload, WorkflowInstanceStartPayload, WorkflowInstancesUpdatePayload, WorkflowInstanceUpdatePayload, AttachmentsContext, WorkflowInstanceRolesUpdatePayload, SendMessagePayload } from './openapi/model';

export const SAPCPWorkflowCFApi = {
  getV1TaskInstances: (args?: {
    skip?: number,
    top?: number,
    inlinecount?: 'allpages' | 'none',
    expand?: 'attributes',
    orderby?: 'claimedAt asc' | 'claimedAt desc' | 'completedAt asc' | 'completedAt desc' | 'createdAt asc' | 'createdAt desc' | 'lastChangedAt asc' | 'lastChangedAt desc' | 'dueDate asc' | 'dueDate desc' | 'subject asc' | 'subject desc' | 'description asc' | 'description desc' | 'activityId asc' | 'activityId desc' | 'id asc' | 'id desc' | 'processor asc' | 'processor desc' | 'workflowDefinitionId asc' | 'workflowDefinitionId desc' | 'workflowInstanceId asc' | 'workflowInstanceId desc' | 'priority asc' | 'priority desc',
    workflowInstanceId?: string,
    workflowDefinitionId?: string,
    processor?: string,
    id?: string,
    activityId?: string,
    description?: string,
    subject?: string,
    createdAt?: string,
    createdFrom?: string,
    createdUpTo?: string,
    claimedAt?: string,
    claimedFrom?: string,
    claimedUpTo?: string,
    completedAt?: string,
    completedFrom?: string,
    completedUpTo?: string,
    lastChangedAt?: string,
    lastChangedFrom?: string,
    lastChangedUpTo?: string,
    dueDate?: string,
    dueDateFrom?: string,
    dueDateUpTo?: string,
    priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH',
    status?: 'READY' | 'RESERVED' | 'COMPLETED' | 'CANCELED',
    recipientUsers?: string,
    recipientGroups?: string,
    containsText?: string,
    attributesExampleCustomAttribute?: string,
    definitionId?: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getV1TaskInstances'>(
    DefaultApi,
    'getV1TaskInstances',
    args?.skip,
    args?.top,
    args?.inlinecount,
    args?.expand,
    args?.orderby,
    args?.workflowInstanceId,
    args?.workflowDefinitionId,
    args?.processor,
    args?.id,
    args?.activityId,
    args?.description,
    args?.subject,
    args?.createdAt,
    args?.createdFrom,
    args?.createdUpTo,
    args?.claimedAt,
    args?.claimedFrom,
    args?.claimedUpTo,
    args?.completedAt,
    args?.completedFrom,
    args?.completedUpTo,
    args?.lastChangedAt,
    args?.lastChangedFrom,
    args?.lastChangedUpTo,
    args?.dueDate,
    args?.dueDateFrom,
    args?.dueDateUpTo,
    args?.priority,
    args?.status,
    args?.recipientUsers,
    args?.recipientGroups,
    args?.containsText,
    args?.attributesExampleCustomAttribute,
    args?.definitionId
  ),
  getV1TaskInstancesByTaskInstanceId: (args: {
    taskInstanceId: string,
    expand?: 'attributes'
  }) => new OpenApiRequestBuilder<DefaultApi, 'getV1TaskInstancesByTaskInstanceId'>(
    DefaultApi,
    'getV1TaskInstancesByTaskInstanceId',
    args.taskInstanceId,
    args.expand
  ),
  updateV1TaskInstancesByTaskInstanceId: (args: {
    taskInstanceId: string,
    body: UpdateTaskInstancePayload
  }) => new OpenApiRequestBuilder<DefaultApi, 'updateV1TaskInstancesByTaskInstanceId'>(
    DefaultApi,
    'updateV1TaskInstancesByTaskInstanceId',
    args.taskInstanceId,
    args.body
  ),
  getV1TaskInstancesAttributesByTaskInstanceId: (args: {
    taskInstanceId: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getV1TaskInstancesAttributesByTaskInstanceId'>(
    DefaultApi,
    'getV1TaskInstancesAttributesByTaskInstanceId',
    args.taskInstanceId
  ),
  getV1TaskInstancesContextByTaskInstanceId: (args: {
    taskInstanceId: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getV1TaskInstancesContextByTaskInstanceId'>(
    DefaultApi,
    'getV1TaskInstancesContextByTaskInstanceId',
    args.taskInstanceId
  ),
  getV1TaskInstancesAttachmentsByTaskInstanceId: (args: {
    taskInstanceId: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getV1TaskInstancesAttachmentsByTaskInstanceId'>(
    DefaultApi,
    'getV1TaskInstancesAttachmentsByTaskInstanceId',
    args.taskInstanceId
  ),
  getV1TaskInstancesFormByTaskInstanceId: (args: {
    taskInstanceId: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getV1TaskInstancesFormByTaskInstanceId'>(
    DefaultApi,
    'getV1TaskInstancesFormByTaskInstanceId',
    args.taskInstanceId
  ),
  getV1TaskInstancesFormModelByTaskInstanceId: (args: {
    taskInstanceId: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getV1TaskInstancesFormModelByTaskInstanceId'>(
    DefaultApi,
    'getV1TaskInstancesFormModelByTaskInstanceId',
    args.taskInstanceId
  ),
  getV1TaskDefinitions: (args?: {
    skip?: number,
    top?: number,
    inlinecount?: 'allpages' | 'none',
    expand?: 'attributeDefinitions'
  }) => new OpenApiRequestBuilder<DefaultApi, 'getV1TaskDefinitions'>(
    DefaultApi,
    'getV1TaskDefinitions',
    args?.skip,
    args?.top,
    args?.inlinecount,
    args?.expand
  ),
  getV1WorkflowDefinitions: (args?: {
    orderby?: 'id' | 'id asc' | 'id desc' | 'version' | 'version asc' | 'version desc' | 'name' | 'name asc' | 'name desc' | 'createdAt' | 'createdAt asc' | 'createdAt desc' | 'createdBy' | 'createdBy asc' | 'createdBy desc',
    skip?: number,
    top?: number,
    inlinecount?: 'allpages' | 'none'
  }) => new OpenApiRequestBuilder<DefaultApi, 'getV1WorkflowDefinitions'>(
    DefaultApi,
    'getV1WorkflowDefinitions',
    args?.orderby,
    args?.skip,
    args?.top,
    args?.inlinecount
  ),
  getV1WorkflowDefinitionsByDefinitionId: (args: {
    definitionId: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getV1WorkflowDefinitionsByDefinitionId'>(
    DefaultApi,
    'getV1WorkflowDefinitionsByDefinitionId',
    args.definitionId
  ),
  deleteV1WorkflowDefinitionsByDefinitionId: (args: {
    definitionId: string,
    cascade?: boolean
  }) => new OpenApiRequestBuilder<DefaultApi, 'deleteV1WorkflowDefinitionsByDefinitionId'>(
    DefaultApi,
    'deleteV1WorkflowDefinitionsByDefinitionId',
    args.definitionId,
    args.cascade
  ),
  getV1WorkflowDefinitionsVersionsByDefinitionId: (args: {
    definitionId: string,
    orderby?: 'id' | 'id asc' | 'id desc' | 'version' | 'version asc' | 'version desc' | 'name' | 'name asc' | 'name desc' | 'createdAt' | 'createdAt asc' | 'createdAt desc' | 'createdBy' | 'createdBy asc' | 'createdBy desc',
    skip?: number,
    top?: number,
    inlinecount?: 'allpages' | 'none'
  }) => new OpenApiRequestBuilder<DefaultApi, 'getV1WorkflowDefinitionsVersionsByDefinitionId'>(
    DefaultApi,
    'getV1WorkflowDefinitionsVersionsByDefinitionId',
    args.definitionId,
    args.orderby,
    args.skip,
    args.top,
    args.inlinecount
  ),
  getV1WorkflowDefinitionsVersionsByDefinitionIdAndVersionNumber: (args: {
    definitionId: string,
    versionNumber: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getV1WorkflowDefinitionsVersionsByDefinitionIdAndVersionNumber'>(
    DefaultApi,
    'getV1WorkflowDefinitionsVersionsByDefinitionIdAndVersionNumber',
    args.definitionId,
    args.versionNumber
  ),
  getV1WorkflowDefinitionsModelByDefinitionId: (args: {
    definitionId: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getV1WorkflowDefinitionsModelByDefinitionId'>(
    DefaultApi,
    'getV1WorkflowDefinitionsModelByDefinitionId',
    args.definitionId
  ),
  getV1WorkflowDefinitionsVersionsModelByDefinitionIdAndVersionNumber: (args: {
    definitionId: string,
    versionNumber: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getV1WorkflowDefinitionsVersionsModelByDefinitionIdAndVersionNumber'>(
    DefaultApi,
    'getV1WorkflowDefinitionsVersionsModelByDefinitionIdAndVersionNumber',
    args.definitionId,
    args.versionNumber
  ),
  getV1WorkflowDefinitionsSampleContextsDefaultStartContextByDefinitionId: (args: {
    definitionId: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getV1WorkflowDefinitionsSampleContextsDefaultStartContextByDefinitionId'>(
    DefaultApi,
    'getV1WorkflowDefinitionsSampleContextsDefaultStartContextByDefinitionId',
    args.definitionId
  ),
  getV1WorkflowDefinitionsVersionsSampleContextsDefaultStartContextByDefinitionIdAndVersionNumber: (args: {
    definitionId: string,
    versionNumber: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getV1WorkflowDefinitionsVersionsSampleContextsDefaultStartContextByDefinitionIdAndVersionNumber'>(
    DefaultApi,
    'getV1WorkflowDefinitionsVersionsSampleContextsDefaultStartContextByDefinitionIdAndVersionNumber',
    args.definitionId,
    args.versionNumber
  ),
  getV1WorkflowInstances: (args?: {
    orderby?: 'id asc' | 'id desc' | 'definitionId asc' | 'definitionId desc' | 'definitionVersion asc' | 'definitionVersion desc' | 'startedAt asc' | 'startedAt desc' | 'completedAt asc' | 'completedAt desc' | 'startedBy asc' | 'startedBy desc' | 'subject asc' | 'subject desc' | 'businessKey asc' | 'businessKey desc',
    skip?: number,
    top?: number,
    inlinecount?: 'allpages' | 'none',
    expand?: 'attributes',
    id?: string,
    definitionId?: string,
    definitionVersion?: string,
    status?: 'RUNNING' | 'ERRONEOUS' | 'SUSPENDED' | 'CANCELED' | 'COMPLETED',
    startedAt?: string,
    startedFrom?: string,
    startedUpTo?: string,
    completedAt?: string,
    completedFrom?: string,
    completedUpTo?: string,
    startedBy?: string,
    subject?: string,
    containsText?: string,
    businessKey?: string,
    rootInstanceId?: string,
    parentInstanceId?: string,
    attributesExampleCustomAttribute?: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getV1WorkflowInstances'>(
    DefaultApi,
    'getV1WorkflowInstances',
    args?.orderby,
    args?.skip,
    args?.top,
    args?.inlinecount,
    args?.expand,
    args?.id,
    args?.definitionId,
    args?.definitionVersion,
    args?.status,
    args?.startedAt,
    args?.startedFrom,
    args?.startedUpTo,
    args?.completedAt,
    args?.completedFrom,
    args?.completedUpTo,
    args?.startedBy,
    args?.subject,
    args?.containsText,
    args?.businessKey,
    args?.rootInstanceId,
    args?.parentInstanceId,
    args?.attributesExampleCustomAttribute
  ),
  createV1WorkflowInstances: (args: {
    body: WorkflowInstanceStartPayload
  }) => new OpenApiRequestBuilder<DefaultApi, 'createV1WorkflowInstances'>(
    DefaultApi,
    'createV1WorkflowInstances',
    args.body
  ),
  updateV1WorkflowInstances: (args: {
    body: WorkflowInstancesUpdatePayload[]
  }) => new OpenApiRequestBuilder<DefaultApi, 'updateV1WorkflowInstances'>(
    DefaultApi,
    'updateV1WorkflowInstances',
    args.body
  ),
  getV1WorkflowInstancesByWorkflowInstanceId: (args: {
    workflowInstanceId: string,
    expand?: 'attributes'
  }) => new OpenApiRequestBuilder<DefaultApi, 'getV1WorkflowInstancesByWorkflowInstanceId'>(
    DefaultApi,
    'getV1WorkflowInstancesByWorkflowInstanceId',
    args.workflowInstanceId,
    args.expand
  ),
  updateV1WorkflowInstancesByWorkflowInstanceId: (args: {
    workflowInstanceId: string,
    body: WorkflowInstanceUpdatePayload
  }) => new OpenApiRequestBuilder<DefaultApi, 'updateV1WorkflowInstancesByWorkflowInstanceId'>(
    DefaultApi,
    'updateV1WorkflowInstancesByWorkflowInstanceId',
    args.workflowInstanceId,
    args.body
  ),
  getV1WorkflowInstancesAttributesByWorkflowInstanceId: (args: {
    workflowInstanceId: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getV1WorkflowInstancesAttributesByWorkflowInstanceId'>(
    DefaultApi,
    'getV1WorkflowInstancesAttributesByWorkflowInstanceId',
    args.workflowInstanceId
  ),
  getV1WorkflowInstancesContextByWorkflowInstanceId: (args: {
    workflowInstanceId: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getV1WorkflowInstancesContextByWorkflowInstanceId'>(
    DefaultApi,
    'getV1WorkflowInstancesContextByWorkflowInstanceId',
    args.workflowInstanceId
  ),
  updateV1WorkflowInstancesContextByWorkflowInstanceId: (args: {
    workflowInstanceId: string,
    body: Record<string, any>
  }) => new OpenApiRequestBuilder<DefaultApi, 'updateV1WorkflowInstancesContextByWorkflowInstanceId'>(
    DefaultApi,
    'updateV1WorkflowInstancesContextByWorkflowInstanceId',
    args.workflowInstanceId,
    args.body
  ),
  updateV1WorkflowInstancesContextByWorkflowInstanceId1: (args: {
    workflowInstanceId: string,
    body: Record<string, any>
  }) => new OpenApiRequestBuilder<DefaultApi, 'updateV1WorkflowInstancesContextByWorkflowInstanceId1'>(
    DefaultApi,
    'updateV1WorkflowInstancesContextByWorkflowInstanceId1',
    args.workflowInstanceId,
    args.body
  ),
  getV1WorkflowInstancesAttachmentsByWorkflowInstanceId: (args: {
    workflowInstanceId: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getV1WorkflowInstancesAttachmentsByWorkflowInstanceId'>(
    DefaultApi,
    'getV1WorkflowInstancesAttachmentsByWorkflowInstanceId',
    args.workflowInstanceId
  ),
  updateV1WorkflowInstancesAttachmentsByWorkflowInstanceId: (args: {
    workflowInstanceId: string,
    body: AttachmentsContext
  }) => new OpenApiRequestBuilder<DefaultApi, 'updateV1WorkflowInstancesAttachmentsByWorkflowInstanceId'>(
    DefaultApi,
    'updateV1WorkflowInstancesAttachmentsByWorkflowInstanceId',
    args.workflowInstanceId,
    args.body
  ),
  getV1WorkflowInstancesErrorMessagesByWorkflowInstanceId: (args: {
    workflowInstanceId: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getV1WorkflowInstancesErrorMessagesByWorkflowInstanceId'>(
    DefaultApi,
    'getV1WorkflowInstancesErrorMessagesByWorkflowInstanceId',
    args.workflowInstanceId
  ),
  getV1WorkflowInstancesExecutionLogsByWorkflowInstanceId: (args: {
    workflowInstanceId: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getV1WorkflowInstancesExecutionLogsByWorkflowInstanceId'>(
    DefaultApi,
    'getV1WorkflowInstancesExecutionLogsByWorkflowInstanceId',
    args.workflowInstanceId
  ),
  getV1WorkflowInstancesRolesByWorkflowInstanceId: (args: {
    workflowInstanceId: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getV1WorkflowInstancesRolesByWorkflowInstanceId'>(
    DefaultApi,
    'getV1WorkflowInstancesRolesByWorkflowInstanceId',
    args.workflowInstanceId
  ),
  updateV1WorkflowInstancesRolesByWorkflowInstanceId: (args: {
    workflowInstanceId: string,
    body: WorkflowInstanceRolesUpdatePayload
  }) => new OpenApiRequestBuilder<DefaultApi, 'updateV1WorkflowInstancesRolesByWorkflowInstanceId'>(
    DefaultApi,
    'updateV1WorkflowInstancesRolesByWorkflowInstanceId',
    args.workflowInstanceId,
    args.body
  ),
  getV1Forms: (args?: {
    skip?: number,
    top?: number,
    inlinecount?: 'allpages' | 'none',
    type?: 'start' | 'task'
  }) => new OpenApiRequestBuilder<DefaultApi, 'getV1Forms'>(
    DefaultApi,
    'getV1Forms',
    args?.skip,
    args?.top,
    args?.inlinecount,
    args?.type
  ),
  deleteV1FormsByFormId: (args: {
    formId: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'deleteV1FormsByFormId'>(
    DefaultApi,
    'deleteV1FormsByFormId',
    args.formId
  ),
  getV1FormsRevisionsModelByFormIdAndRevisionId: (args: {
    formId: string,
    revisionId: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getV1FormsRevisionsModelByFormIdAndRevisionId'>(
    DefaultApi,
    'getV1FormsRevisionsModelByFormIdAndRevisionId',
    args.formId,
    args.revisionId
  ),
  getV1FormsVersionsModelByFormIdAndVersionNumber: (args: {
    formId: string,
    versionNumber: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getV1FormsVersionsModelByFormIdAndVersionNumber'>(
    DefaultApi,
    'getV1FormsVersionsModelByFormIdAndVersionNumber',
    args.formId,
    args.versionNumber
  ),
  getV1Export: () => new OpenApiRequestBuilder<DefaultApi, 'getV1Export'>(
    DefaultApi,
    'getV1Export'
  ),
  createV1Purge: () => new OpenApiRequestBuilder<DefaultApi, 'createV1Purge'>(
    DefaultApi,
    'createV1Purge'
  ),
  getV1JobsByJobId: (args: {
    jobId: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getV1JobsByJobId'>(
    DefaultApi,
    'getV1JobsByJobId',
    args.jobId
  ),
  createV1Messages: (args: {
    body: SendMessagePayload
  }) => new OpenApiRequestBuilder<DefaultApi, 'createV1Messages'>(
    DefaultApi,
    'createV1Messages',
    args.body
  )
};
