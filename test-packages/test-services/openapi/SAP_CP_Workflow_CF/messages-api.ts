/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import { SendMessagePayload, ConsumingWorkflowInstance } from './model';

export const MessagesApi = {
  createV1Messages: (body: SendMessagePayload) => new OpenApiRequestBuilder<ConsumingWorkflowInstance[]>(
    'post',
    '/v1/messages/',
    {
          body
        }
  )
};
