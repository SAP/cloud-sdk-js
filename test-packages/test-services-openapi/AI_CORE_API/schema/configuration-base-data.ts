/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { ConfigurationName } from './configuration-name';
import type { ExecutableId } from './executable-id';
import type { ScenarioId } from './scenario-id';
import type { ParameterArgumentBindingList } from './parameter-argument-binding-list';
import type { ArtifactArgumentBindingList } from './artifact-argument-binding-list';
/**
 * Representation of the 'ConfigurationBaseData' schema.
 */
export type ConfigurationBaseData =
  | {
      name: ConfigurationName;
      executableId: ExecutableId;
      scenarioId: ScenarioId;
      parameterBindings?: ParameterArgumentBindingList;
      inputArtifactBindings?: ArtifactArgumentBindingList;
    }
  | Record<string, any>;
