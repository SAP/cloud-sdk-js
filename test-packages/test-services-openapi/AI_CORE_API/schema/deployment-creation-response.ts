/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { CreationResponse } from './creation-response';
import type { DeploymentUrl } from './deployment-url';
import type { ExecutionStatus } from './execution-status';
import type { DeploymentCreationResponseMessage } from './deployment-creation-response-message';
import type { DeploymentTimeToLive } from './deployment-time-to-live';
/**
 * Representation of the 'DeploymentCreationResponse' schema.
 */
export type DeploymentCreationResponse =
  | (CreationResponse & {
      deploymentUrl?: DeploymentUrl;
      status?: ExecutionStatus;
      message?: DeploymentCreationResponseMessage;
      ttl?: DeploymentTimeToLive;
    })
  | Record<string, any>;
