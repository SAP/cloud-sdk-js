/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { CreationResponse2 } from './creation-response-2';
import type { DockerRegistrySecretModificationResponseMessage } from './docker-registry-secret-modification-response-message';
/**
 * Representation of the 'DockerRegistrySecretModificationResponse' schema.
 */
export type DockerRegistrySecretModificationResponse =
  | (CreationResponse2 & {
      message?: DockerRegistrySecretModificationResponseMessage;
    })
  | Record<string, any>;
