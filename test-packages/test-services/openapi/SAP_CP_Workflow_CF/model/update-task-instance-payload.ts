/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
      import { AttachmentsContext } from './attachments-context';
      export type UpdateTaskInstancePayload = {
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
