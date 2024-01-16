/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { LabelList } from './label-list';
/**
 * Representation of the 'ExecutableArtifact' schema.
 */
export type ExecutableArtifact =
  | {
      /**
       * Name of the executable input artifacts
       */
      name: string;
      /**
       * Artifact kind (model, dataset, other)
       */
      kind?: string;
      /**
       * Description of the signature argument
       */
      description?: string;
      labels?: LabelList;
    }
  | Record<string, any>;
