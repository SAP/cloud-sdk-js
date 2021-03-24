import { AttachmentsContext } from './attachments-context';
export declare type UpdateTaskInstancePayload = {
    'context'?: Record<string, any>;
    'attachments'?: AttachmentsContext;
    'status'?: 'COMPLETED';
    'subject'?: string;
    'description'?: string;
    'recipientUsers'?: string;
    'recipientGroups'?: string;
    'processor'?: string;
    'dueDate'?: string;
    'priority'?: 'VERY_HIGH' | 'HIGH' | 'MEDIUM' | 'LOW';
} | Record<string, any>;
//# sourceMappingURL=update-task-instance-payload.d.ts.map