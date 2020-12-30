/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import { DefaultApi } from './openapi/api';
import { WorkflowInstanceStartPayload, WorkflowInstancesUpdatePayload, WorkflowInstanceUpdatePayload, AttachmentsContext, WorkflowInstanceRolesUpdatePayload, SendMessagePayload } from './openapi/model';

export const SAPCPWorkflowCFMainApi = {
  queryDefinitions: (args?: {
    orderby?: 'id' | 'id asc' | 'id desc' | 'version' | 'version asc' | 'version desc' | 'name' | 'name asc' | 'name desc' | 'createdAt' | 'createdAt asc' | 'createdAt desc' | 'createdBy' | 'createdBy asc' | 'createdBy desc',
    skip?: number,
    top?: number,
    inlinecount?: 'allpages' | 'none'
  }) => new OpenApiRequestBuilder<DefaultApi, 'queryDefinitions'>(
    DefaultApi,
    'queryDefinitions',
    args?.orderby,
    args?.skip,
    args?.top,
    args?.inlinecount
  ),
  getDefinition: (args: {
    definitionId: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getDefinition'>(
    DefaultApi,
    'getDefinition',
    args.definitionId
  ),
  undeployDefinition: (args: {
    definitionId: string,
    cascade?: boolean
  }) => new OpenApiRequestBuilder<DefaultApi, 'undeployDefinition'>(
    DefaultApi,
    'undeployDefinition',
    args.definitionId,
    args.cascade
  ),
  getDefinitionVersions: (args: {
    definitionId: string,
    orderby?: 'id' | 'id asc' | 'id desc' | 'version' | 'version asc' | 'version desc' | 'name' | 'name asc' | 'name desc' | 'createdAt' | 'createdAt asc' | 'createdAt desc' | 'createdBy' | 'createdBy asc' | 'createdBy desc',
    skip?: number,
    top?: number,
    inlinecount?: 'allpages' | 'none'
  }) => new OpenApiRequestBuilder<DefaultApi, 'getDefinitionVersions'>(
    DefaultApi,
    'getDefinitionVersions',
    args.definitionId,
    args.orderby,
    args.skip,
    args.top,
    args.inlinecount
  ),
  getDefinitionVersion: (args: {
    definitionId: string,
    versionNumber: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getDefinitionVersion'>(
    DefaultApi,
    'getDefinitionVersion',
    args.definitionId,
    args.versionNumber
  ),
  getModelForDefinition: (args: {
    definitionId: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getModelForDefinition'>(
    DefaultApi,
    'getModelForDefinition',
    args.definitionId
  ),
  getModelForDefinitionVersion: (args: {
    definitionId: string,
    versionNumber: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getModelForDefinitionVersion'>(
    DefaultApi,
    'getModelForDefinitionVersion',
    args.definitionId,
    args.versionNumber
  ),
  getDefaultSampleContext: (args: {
    definitionId: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getDefaultSampleContext'>(
    DefaultApi,
    'getDefaultSampleContext',
    args.definitionId
  ),
  getDefaultSampleContextForVersion: (args: {
    definitionId: string,
    versionNumber: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getDefaultSampleContextForVersion'>(
    DefaultApi,
    'getDefaultSampleContextForVersion',
    args.definitionId,
    args.versionNumber
  ),
  queryInstances: (args?: {
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
  }) => new OpenApiRequestBuilder<DefaultApi, 'queryInstances'>(
    DefaultApi,
    'queryInstances',
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
  startInstance: (args: {
    body: WorkflowInstanceStartPayload
  }) => new OpenApiRequestBuilder<DefaultApi, 'startInstance'>(
    DefaultApi,
    'startInstance',
    args.body
  ),
  updateInstances: (args: {
    body: WorkflowInstancesUpdatePayload[]
  }) => new OpenApiRequestBuilder<DefaultApi, 'updateInstances'>(
    DefaultApi,
    'updateInstances',
    args.body
  ),
  getInstance: (args: {
    workflowInstanceId: string,
    expand?: 'attributes'
  }) => new OpenApiRequestBuilder<DefaultApi, 'getInstance'>(
    DefaultApi,
    'getInstance',
    args.workflowInstanceId,
    args.expand
  ),
  updateInstance: (args: {
    workflowInstanceId: string,
    body: WorkflowInstanceUpdatePayload
  }) => new OpenApiRequestBuilder<DefaultApi, 'updateInstance'>(
    DefaultApi,
    'updateInstance',
    args.workflowInstanceId,
    args.body
  ),
  getInstanceAttributes: (args: {
    workflowInstanceId: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getInstanceAttributes'>(
    DefaultApi,
    'getInstanceAttributes',
    args.workflowInstanceId
  ),
  getInstanceContext: (args: {
    workflowInstanceId: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getInstanceContext'>(
    DefaultApi,
    'getInstanceContext',
    args.workflowInstanceId
  ),
  setInstanceContext: (args: {
    workflowInstanceId: string,
    body: Record<string, any>
  }) => new OpenApiRequestBuilder<DefaultApi, 'setInstanceContext'>(
    DefaultApi,
    'setInstanceContext',
    args.workflowInstanceId,
    args.body
  ),
  updateInstanceContext: (args: {
    workflowInstanceId: string,
    body: Record<string, any>
  }) => new OpenApiRequestBuilder<DefaultApi, 'updateInstanceContext'>(
    DefaultApi,
    'updateInstanceContext',
    args.workflowInstanceId,
    args.body
  ),
  getInstanceAttachments: (args: {
    workflowInstanceId: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getInstanceAttachments'>(
    DefaultApi,
    'getInstanceAttachments',
    args.workflowInstanceId
  ),
  setInstanceAttachments: (args: {
    workflowInstanceId: string,
    body: AttachmentsContext
  }) => new OpenApiRequestBuilder<DefaultApi, 'setInstanceAttachments'>(
    DefaultApi,
    'setInstanceAttachments',
    args.workflowInstanceId,
    args.body
  ),
  getInstanceErrorMessages: (args: {
    workflowInstanceId: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getInstanceErrorMessages'>(
    DefaultApi,
    'getInstanceErrorMessages',
    args.workflowInstanceId
  ),
  queryInstanceExecutionLogs: (args: {
    workflowInstanceId: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'queryInstanceExecutionLogs'>(
    DefaultApi,
    'queryInstanceExecutionLogs',
    args.workflowInstanceId
  ),
  getInstanceRoles: (args: {
    workflowInstanceId: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getInstanceRoles'>(
    DefaultApi,
    'getInstanceRoles',
    args.workflowInstanceId
  ),
  updateInstanceRoles: (args: {
    workflowInstanceId: string,
    body: WorkflowInstanceRolesUpdatePayload
  }) => new OpenApiRequestBuilder<DefaultApi, 'updateInstanceRoles'>(
    DefaultApi,
    'updateInstanceRoles',
    args.workflowInstanceId,
    args.body
  ),
  getFormDefinitionsMetadata: (args?: {
    skip?: number,
    top?: number,
    inlinecount?: 'allpages' | 'none',
    type?: 'start' | 'task'
  }) => new OpenApiRequestBuilder<DefaultApi, 'getFormDefinitionsMetadata'>(
    DefaultApi,
    'getFormDefinitionsMetadata',
    args?.skip,
    args?.top,
    args?.inlinecount,
    args?.type
  ),
  undeployForm: (args: {
    formId: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'undeployForm'>(
    DefaultApi,
    'undeployForm',
    args.formId
  ),
  getModelByIdAndRevision: (args: {
    formId: string,
    revisionId: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getModelByIdAndRevision'>(
    DefaultApi,
    'getModelByIdAndRevision',
    args.formId,
    args.revisionId
  ),
  getModelByIdAndVersion: (args: {
    formId: string,
    versionNumber: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getModelByIdAndVersion'>(
    DefaultApi,
    'getModelByIdAndVersion',
    args.formId,
    args.versionNumber
  ),
  purge: () => new OpenApiRequestBuilder<DefaultApi, 'purge'>(
    DefaultApi,
    'purge'
  ),
  getJob: (args: {
    jobId: string
  }) => new OpenApiRequestBuilder<DefaultApi, 'getJob'>(
    DefaultApi,
    'getJob',
    args.jobId
  ),
  sendMessage: (args: {
    body: SendMessagePayload
  }) => new OpenApiRequestBuilder<DefaultApi, 'sendMessage'>(
    DefaultApi,
    'sendMessage',
    args.body
  )
};
