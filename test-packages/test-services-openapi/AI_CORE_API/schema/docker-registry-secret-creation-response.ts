/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { CreationResponseMessage } from './creation-response-message';
import type { DockerRegistrySecretCreationResponseMessage } from './docker-registry-secret-creation-response-message';
/**
 * Representation of the 'DockerRegistrySecretCreationResponse' schema.
 */
export type DockerRegistrySecretCreationResponse =
  | (CreationResponseMessage & {
      message?: DockerRegistrySecretCreationResponseMessage;
    })
  | Record<string, any>;
