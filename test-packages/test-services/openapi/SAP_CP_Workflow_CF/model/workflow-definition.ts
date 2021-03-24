/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
      import { WorkflowDefinitionJob } from './workflow-definition-job';
      export type WorkflowDefinition = {
      'id': string;
      'name': string;
      'version': string;
      'createdAt': string;
      'createdBy'?: string;
      'applicationScope': string;
      'jobs': WorkflowDefinitionJob[];
    } | Record<string, any>;
