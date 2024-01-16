/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { CreationResponse2 } from './creation-response-2';
import type { ResourceGroupDeletionResponseMessage } from './resource-group-deletion-response-message';
/**
 * Representation of the 'ResourceGroupDeletionResponse' schema.
 */
export type ResourceGroupDeletionResponse =
  | (CreationResponse2 & {
      message?: ResourceGroupDeletionResponseMessage;
    })
  | Record<string, any>;
