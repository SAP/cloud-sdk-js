/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { VersionId } from './version-id';
import type { ScenarioId } from './scenario-id';
/**
 * Representation of the 'VersionDetailData' schema.
 */
export type VersionDetailData =
  | {
      id: VersionId;
      scenarioId?: ScenarioId;
    }
  | Record<string, any>;
