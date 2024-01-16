/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { ExecutableId } from './executable-id';
import type { ScenarioId } from './scenario-id';
import type { VersionId } from './version-id';
import type { ExecutableParameterList } from './executable-parameter-list';
import type { ExecutableArtifactList } from './executable-artifact-list';
/**
 * Representation of the 'ExecutableDetailData' schema.
 */
export type ExecutableDetailData =
  | {
      id: ExecutableId;
      scenarioId?: ScenarioId;
      versionId: VersionId;
      parameters?: ExecutableParameterList;
      inputArtifacts?: ExecutableArtifactList;
      outputArtifacts?: ExecutableArtifactList;
      /**
       * Whether this executable is deployable
       */
      deployable: boolean;
    }
  | Record<string, any>;
