import { CustomAttribute } from './custom-attribute';
export declare type WorkflowInstance = {
    'definitionId'?: string;
    'definitionVersion'?: string;
    'id'?: string;
    'startedAt'?: string;
    'startedBy'?: string;
    'completedAt'?: string;
    'status'?: 'RUNNING' | 'ERRONEOUS' | 'SUSPENDED' | 'CANCELED' | 'COMPLETED';
    'businessKey'?: string;
    'subject'?: string;
    'rootInstanceId'?: string;
    'parentInstanceId'?: string;
    'applicationScope'?: string;
    'attributes'?: CustomAttribute[];
} | Record<string, any>;
//# sourceMappingURL=workflow-instance.d.ts.map