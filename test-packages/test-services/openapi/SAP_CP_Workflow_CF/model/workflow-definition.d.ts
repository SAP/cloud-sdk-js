import { WorkflowDefinitionJob } from './workflow-definition-job';
export declare type WorkflowDefinition = {
    'id': string;
    'name': string;
    'version': string;
    'createdAt': string;
    'createdBy'?: string;
    'applicationScope': string;
    'jobs': WorkflowDefinitionJob[];
} | Record<string, any>;
//# sourceMappingURL=workflow-definition.d.ts.map