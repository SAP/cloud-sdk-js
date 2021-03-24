import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import { WorkflowInstance, WorkflowInstanceStartPayload, WorkflowInstancesUpdatePayload, WorkflowInstanceUpdatePayload, CustomAttribute, AttachmentsContext, WorkflowInstanceErrorMessage, WorkflowInstanceExecutionLog, WorkflowInstanceRoles, WorkflowInstanceRolesUpdatePayload } from './model';
export declare const WorkflowInstancesApi: {
    getV1WorkflowInstances: (queryParameters?: {
        $orderby?: "completedAt asc" | "completedAt desc" | "subject asc" | "subject desc" | "id asc" | "id desc" | "definitionId asc" | "definitionId desc" | "definitionVersion asc" | "definitionVersion desc" | "startedAt asc" | "startedAt desc" | "startedBy asc" | "startedBy desc" | "businessKey asc" | "businessKey desc" | undefined;
        $skip?: number | undefined;
        $top?: number | undefined;
        $inlinecount?: "none" | "allpages" | undefined;
        $expand?: "attributes" | undefined;
        id?: string | undefined;
        definitionId?: string | undefined;
        definitionVersion?: string | undefined;
        status?: "CANCELED" | "COMPLETED" | "RUNNING" | "SUSPENDED" | "ERRONEOUS" | undefined;
        startedAt?: string | undefined;
        startedFrom?: string | undefined;
        startedUpTo?: string | undefined;
        completedAt?: string | undefined;
        completedFrom?: string | undefined;
        completedUpTo?: string | undefined;
        startedBy?: string | undefined;
        subject?: string | undefined;
        containsText?: string | undefined;
        businessKey?: string | undefined;
        rootInstanceId?: string | undefined;
        parentInstanceId?: string | undefined;
        'attributes.ExampleCustomAttribute'?: string | undefined;
    } | undefined) => OpenApiRequestBuilder<WorkflowInstance[]>;
    createV1WorkflowInstances: (body: WorkflowInstanceStartPayload) => OpenApiRequestBuilder<WorkflowInstance>;
    updateV1WorkflowInstances: (body: WorkflowInstancesUpdatePayload[]) => OpenApiRequestBuilder<any>;
    getV1WorkflowInstancesByWorkflowInstanceId: (workflowInstanceId: string, queryParameters?: {
        $expand?: "attributes" | undefined;
    } | undefined) => OpenApiRequestBuilder<WorkflowInstance>;
    updateV1WorkflowInstancesByWorkflowInstanceId: (workflowInstanceId: string, body: WorkflowInstanceUpdatePayload) => OpenApiRequestBuilder<any>;
    getV1WorkflowInstancesAttributesByWorkflowInstanceId: (workflowInstanceId: string) => OpenApiRequestBuilder<CustomAttribute[]>;
    getV1WorkflowInstancesContextByWorkflowInstanceId: (workflowInstanceId: string) => OpenApiRequestBuilder<Record<string, any>>;
    updateV1WorkflowInstancesContextByWorkflowInstanceId: (workflowInstanceId: string, body: Record<string, any>) => OpenApiRequestBuilder<any>;
    getV1WorkflowInstancesAttachmentsByWorkflowInstanceId: (workflowInstanceId: string) => OpenApiRequestBuilder<AttachmentsContext>;
    updateV1WorkflowInstancesAttachmentsByWorkflowInstanceId: (workflowInstanceId: string, body: AttachmentsContext) => OpenApiRequestBuilder<any>;
    getV1WorkflowInstancesErrorMessagesByWorkflowInstanceId: (workflowInstanceId: string) => OpenApiRequestBuilder<WorkflowInstanceErrorMessage[]>;
    getV1WorkflowInstancesExecutionLogsByWorkflowInstanceId: (workflowInstanceId: string) => OpenApiRequestBuilder<WorkflowInstanceExecutionLog[]>;
    getV1WorkflowInstancesRolesByWorkflowInstanceId: (workflowInstanceId: string) => OpenApiRequestBuilder<WorkflowInstanceRoles>;
    updateV1WorkflowInstancesRolesByWorkflowInstanceId: (workflowInstanceId: string, body: WorkflowInstanceRolesUpdatePayload) => OpenApiRequestBuilder<any>;
    updateV1WorkflowInstancesContextByWorkflowInstanceId1: (workflowInstanceId: string, body: Record<string, any>) => OpenApiRequestBuilder<any>;
};
//# sourceMappingURL=workflow-instances-api.d.ts.map