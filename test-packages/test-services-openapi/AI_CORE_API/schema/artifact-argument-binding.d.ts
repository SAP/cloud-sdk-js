/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { ArtifactId } from './artifact-id';
/**
 * Required for execution
 * Result of activation
 *
 */
export type ArtifactArgumentBinding =
  | {
      /**
       * Max Length: 256.
       */
      key: string;
      artifactId: ArtifactId;
    }
  | Record<string, any>;
