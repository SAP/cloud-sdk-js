/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { ScalingDetails } from './scaling-details';
import type { ResourcesDetails } from './resources-details';
/**
 * Detail information about a deployment (including predefined sections: `scaling` and `resources`).
 * JSON String representation of this object is limited to 5000 characters
 *
 */
export type DeploymentDetails =
  | {
      scaling?: ScalingDetails;
      resources?: ResourcesDetails;
    }
  | Record<string, any>;
