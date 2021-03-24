/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
      import { CustomAttribute } from './custom-attribute';
      export type TaskInstanceList = {
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
    } | Record<string, any>[];
