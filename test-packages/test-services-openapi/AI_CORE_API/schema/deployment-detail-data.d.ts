/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { DeploymentId } from './deployment-id';
import type { DeploymentUrl } from './deployment-url';
import type { ConfigurationId } from './configuration-id';
import type { ConfigurationName } from './configuration-name';
import type { ScenarioId } from './scenario-id';
import type { DeploymentStatus } from './deployment-status';
import type { DeploymentStatusMessage } from './deployment-status-message';
import type { DeploymentTimeToLive } from './deployment-time-to-live';
/**
 * Detailed data about a deployment
 */
export type DeploymentDetailData =
  | {
      id: DeploymentId;
      deploymentUrl?: DeploymentUrl;
      configurationId: ConfigurationId;
      configurationName?: ConfigurationName;
      scenarioId?: ScenarioId;
      status: DeploymentStatus;
      statusMessage?: DeploymentStatusMessage;
      /**
       * Deployment target status
       */
      targetStatus?: 'RUNNING' | 'STOPPED' | 'DELETED';
      /**
       * Last operation applied to this deployment.
       */
      lastOperation?: 'CREATE' | 'UPDATE' | 'DELETE' | 'CASCADE-UPDATE' | any;
      latestRunningConfigurationId?: ConfigurationId & any;
      ttl?: DeploymentTimeToLive;
    }
  | Record<string, any>;
