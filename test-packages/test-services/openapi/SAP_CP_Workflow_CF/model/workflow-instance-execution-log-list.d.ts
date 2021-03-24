export declare type WorkflowInstanceExecutionLogList = {
    'id': string;
    'type': 'WORKFLOW_STARTED' | 'WORKFLOW_COMPLETED' | 'WORKFLOW_CANCELED' | 'WORKFLOW_CONTINUED' | 'WORKFLOW_SUSPENDED' | 'WORKFLOW_CONTEXT_OVERWRITTEN_BY_ADMIN' | 'WORKFLOW_CONTEXT_PATCHED_BY_ADMIN' | 'WORKFLOW_ROLES_PATCHED_BY_ADMIN' | 'WORKFLOW_RESUMED' | 'USERTASK_CREATED' | 'USERTASK_CLAIMED' | 'USERTASK_RELEASED' | 'USERTASK_COMPLETED' | 'USERTASK_FAILED' | 'USERTASK_PATCHED_BY_ADMIN' | 'USERTASK_CANCELED_BY_BOUNDARY_EVENT' | 'SERVICETASK_CREATED' | 'SERVICETASK_COMPLETED' | 'SERVICETASK_FAILED' | 'SCRIPTTASK_CREATED' | 'SCRIPTTASK_COMPLETED' | 'SCRIPTTASK_FAILED' | 'INTERMEDIATE_TIMER_EVENT_REACHED' | 'INTERMEDIATE_TIMER_EVENT_TRIGGERED' | 'INTERMEDIATE_MESSAGE_EVENT_REACHED' | 'INTERMEDIATE_MESSAGE_EVENT_TRIGGERED' | 'NONCANCELING_BOUNDARY_TIMER_EVENT_TRIGGERED' | 'CANCELING_BOUNDARY_TIMER_EVENT_TRIGGERED' | 'MAILTASK_CREATED' | 'MAILTASK_COMPLETED' | 'MAILTASK_FAILED' | 'EXCLUSIVE_GATEWAY_REACHED' | 'EXCLUSIVE_GATEWAY_FAILED' | 'PARALLEL_GATEWAY_REACHED' | 'PARALLEL_GATEWAY_FAILED';
    'timestamp': string;
    'referenceInstanceId': string;
    'activityId'?: string;
    'subject'?: string;
    'userId'?: string;
    'error'?: {
        'message'?: string;
        'errorCode'?: string;
        'logId'?: string;
    } | Record<string, any>;
    'recipientUsers'?: Set<string>;
    'recipientGroups'?: Set<string>;
    'initiatorId'?: string;
    'restEndpoint'?: {
        'httpMethod'?: string;
        'destinationName': string;
        'destinationUrl'?: string;
        'relativePath'?: string;
    } | Record<string, any>;
    'retriesRemaining'?: number;
    'taskId'?: string;
    'changes'?: {
        'create'?: Set<string>;
        'update'?: Set<string>;
        'delete'?: Set<string>;
    } | Record<string, any>;
    'recipients'?: {
        'to'?: string[];
        'cc'?: string[];
        'bcc'?: string[];
        'ignored'?: string[];
    } | Record<string, any>;
    'sendDisabled'?: boolean;
    'propagatedPrincipal'?: string;
    'activityName'?: string;
    'cause'?: string;
    'boundaryEventName'?: string;
} | Record<string, any>[];
//# sourceMappingURL=workflow-instance-execution-log-list.d.ts.map