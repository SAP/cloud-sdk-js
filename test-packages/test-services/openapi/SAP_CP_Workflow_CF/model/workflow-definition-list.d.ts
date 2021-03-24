import { WorkflowDefinitionJob } from './workflow-definition-job';
export declare type WorkflowDefinitionList = {
    'id': string;
    'name': string;
    'version': string;
    'createdAt': string;
    'createdBy'?: string;
    'applicationScope': string;
    'jobs': WorkflowDefinitionJob[];
} | Record<string, any>[];
//# sourceMappingURL=workflow-definition-list.d.ts.map