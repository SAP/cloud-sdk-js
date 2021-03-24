import { CustomAttribute } from './custom-attribute';
export declare type TaskInstance = {
    'activityId': string;
    'claimedAt'?: string;
    'completedAt'?: string;
    'createdAt': string;
    'createdBy'?: string;
    'lastChangedAt'?: string;
    'description'?: string;
    'id': string;
    'priority': 'VERY_HIGH' | 'HIGH' | 'MEDIUM' | 'LOW';
    'dueDate'?: string;
    'processor'?: string;
    'recipientUsers'?: Set<string>;
    'recipientGroups'?: Set<string>;
    'status': 'READY' | 'RESERVED' | 'CANCELED' | 'COMPLETED';
    'subject'?: string;
    'workflowDefinitionId': string;
    'workflowInstanceId': string;
    'attributes'?: CustomAttribute[];
    'definitionId'?: string;
    'applicationScope': string;
} | Record<string, any>;
//# sourceMappingURL=task-instance.d.ts.map