import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import { WorkflowDefinition, WorkflowDefinitionVersion, WorkflowModel, SampleContext } from './model';
export declare const WorkflowDefinitionsApi: {
    getV1WorkflowDefinitions: (queryParameters?: {
        $orderby?: "createdAt asc" | "createdAt desc" | "id asc" | "id desc" | "id" | "version" | "version asc" | "version desc" | "name" | "name asc" | "name desc" | "createdAt" | "createdBy" | "createdBy asc" | "createdBy desc" | undefined;
        $skip?: number | undefined;
        $top?: number | undefined;
        $inlinecount?: "none" | "allpages" | undefined;
    } | undefined) => OpenApiRequestBuilder<WorkflowDefinition[]>;
    getV1WorkflowDefinitionsByDefinitionId: (definitionId: string) => OpenApiRequestBuilder<WorkflowDefinition>;
    deleteV1WorkflowDefinitionsByDefinitionId: (definitionId: string, queryParameters?: {
        cascade?: boolean | undefined;
    } | undefined) => OpenApiRequestBuilder<any>;
    getV1WorkflowDefinitionsVersionsByDefinitionId: (definitionId: string, queryParameters?: {
        $orderby?: "createdAt asc" | "createdAt desc" | "id asc" | "id desc" | "id" | "version" | "version asc" | "version desc" | "name" | "name asc" | "name desc" | "createdAt" | "createdBy" | "createdBy asc" | "createdBy desc" | undefined;
        $skip?: number | undefined;
        $top?: number | undefined;
        $inlinecount?: "none" | "allpages" | undefined;
    } | undefined) => OpenApiRequestBuilder<WorkflowDefinitionVersion[]>;
    getV1WorkflowDefinitionsVersionsByDefinitionIdAndVersionNumber: (definitionId: string, versionNumber: string) => OpenApiRequestBuilder<WorkflowDefinitionVersion>;
    getV1WorkflowDefinitionsModelByDefinitionId: (definitionId: string) => OpenApiRequestBuilder<WorkflowModel>;
    getV1WorkflowDefinitionsVersionsModelByDefinitionIdAndVersionNumber: (definitionId: string, versionNumber: string) => OpenApiRequestBuilder<WorkflowModel>;
    getV1WorkflowDefinitionsSampleContextsDefaultStartContextByDefinitionId: (definitionId: string) => OpenApiRequestBuilder<SampleContext>;
    getV1WorkflowDefinitionsVersionsSampleContextsDefaultStartContextByDefinitionIdAndVersionNumber: (definitionId: string, versionNumber: string) => OpenApiRequestBuilder<SampleContext>;
};
//# sourceMappingURL=workflow-definitions-api.d.ts.map