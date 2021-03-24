export declare type Job = {
    'status'?: 'RUNNING' | 'ERRONEOUS';
    'details'?: Record<string, any>;
    'error'?: {
        'code'?: string;
        'message'?: string;
        'logId'?: string;
    } | Record<string, any>;
} | Record<string, any>;
//# sourceMappingURL=job.d.ts.map