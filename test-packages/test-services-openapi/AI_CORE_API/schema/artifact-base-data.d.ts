/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { Labeled } from './labeled';
import type { ArtifactName } from './artifact-name';
import type { ArtifactUrl } from './artifact-url';
import type { ArtifactDescription } from './artifact-description';
/**
 * Representation of the 'ArtifactBaseData' schema.
 */
export type ArtifactBaseData =
  | (Labeled & {
      name: ArtifactName;
      /**
       * Kind of the artifact, i.e. model or dataset
       */
      kind: 'model' | 'dataset' | 'resultset' | 'other';
      url: ArtifactUrl;
      description?: ArtifactDescription;
    })
  | Record<string, any>;
