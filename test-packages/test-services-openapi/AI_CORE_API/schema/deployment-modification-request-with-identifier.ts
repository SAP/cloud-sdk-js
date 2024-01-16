/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { DeploymentId } from './deployment-id';
/**
 * Request object for changing the target status of a deployment ( STOPPED and DELETED are supported)
 */
export type DeploymentModificationRequestWithIdentifier =
  | {
      id: DeploymentId;
      /**
       * Deployment target status
       */
      targetStatus: 'STOPPED' | 'DELETED';
    }
  | Record<string, any>;
