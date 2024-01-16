/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { CreationResponse } from './creation-response';
import type { DeploymentModificationResponseMessage } from './deployment-modification-response-message';
/**
 * Representation of the 'DeploymentModificationResponse' schema.
 */
export type DeploymentModificationResponse =
  | (CreationResponse & {
      message?: DeploymentModificationResponseMessage;
    })
  | Record<string, any>;
