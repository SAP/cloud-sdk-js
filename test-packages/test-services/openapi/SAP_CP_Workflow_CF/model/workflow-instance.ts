/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
      import { CustomAttribute } from './custom-attribute';
      export type WorkflowInstance = {
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
