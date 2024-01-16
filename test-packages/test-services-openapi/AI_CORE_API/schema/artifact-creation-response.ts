/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { CreationResponse } from './creation-response';
import type { ArtifactUrl } from './artifact-url';
import type { ArtifactCreationResponseMessage } from './artifact-creation-response-message';
/**
 * Representation of the 'ArtifactCreationResponse' schema.
 */
export type ArtifactCreationResponse =
  | (CreationResponse & {
      url: ArtifactUrl;
      message?: ArtifactCreationResponseMessage;
    })
  | Record<string, any>;
