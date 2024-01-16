/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { ExecutionId } from './execution-id';
import type { ConfigurationId } from './configuration-id';
import type { ConfigurationName } from './configuration-name';
import type { ScenarioId } from './scenario-id';
import type { ExecutionStatus } from './execution-status';
import type { ExecutionStatusMessage } from './execution-status-message';
import type { ArtifactArray } from './artifact-array';
import type { ExecutionScheduleId } from './execution-schedule-id';
/**
 * Execution that may generate artifacts
 */
export type ExecutionData =
  | {
      id: ExecutionId;
      configurationId: ConfigurationId;
      configurationName?: ConfigurationName;
      scenarioId?: ScenarioId;
      /**
       * Target status of the execution
       * @example "STOPPED"
       */
      targetStatus?: 'COMPLETED' | 'RUNNING' | 'STOPPED' | 'DELETED';
      status: ExecutionStatus;
      statusMessage?: ExecutionStatusMessage;
      outputArtifacts?: ArtifactArray;
      executionScheduleId?: ExecutionScheduleId;
    }
  | Record<string, any>;
