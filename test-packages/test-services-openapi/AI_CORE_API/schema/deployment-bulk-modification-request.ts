/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { DeploymentModificationRequestList } from './deployment-modification-request-list';
/**
 * Request object for changing the target status of multiple deployments
 */
export type DeploymentBulkModificationRequest =
  | {
      deployments?: DeploymentModificationRequestList;
    }
  | Record<string, any>;
