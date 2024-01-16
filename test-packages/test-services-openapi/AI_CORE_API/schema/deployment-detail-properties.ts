/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { DeploymentStatusDetails } from './deployment-status-details';
import type { DeploymentDetails } from './deployment-details';
/**
 * Detail properties of the deployment
 */
export type DeploymentDetailProperties =
  | {
      statusDetails?: DeploymentStatusDetails;
      details?: DeploymentDetails;
    }
  | Record<string, any>;
