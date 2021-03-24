/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
      
      export type Job = {
      'status'?: 'RUNNING' | 'ERRONEOUS';
      'details'?: Record<string, any>;
      'error'?: {
            'code'?: string;
            'message'?: string;
            'logId'?: string;
          } | Record<string, any>;
    } | Record<string, any>;
