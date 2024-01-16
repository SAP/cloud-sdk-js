/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { CreationResponse2 } from './creation-response-2';
import type { DockerRegistrySecretDeletionResponseMessage } from './docker-registry-secret-deletion-response-message';
/**
 * Representation of the 'DockerRegistrySecretDeletionResponse' schema.
 */
export type DockerRegistrySecretDeletionResponse =
  | (CreationResponse2 & {
      message?: DockerRegistrySecretDeletionResponseMessage;
    })
  | Record<string, any>;
