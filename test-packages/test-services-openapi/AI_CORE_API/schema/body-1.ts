/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { DockerRegistrySecretWithSensitiveDataRequest } from './docker-registry-secret-with-sensitive-data-request';
import type { DockerRegistryNameComponent } from './docker-registry-name-component';
/**
 * Representation of the 'Body1' schema.
 */
export type Body1 =
  | (DockerRegistrySecretWithSensitiveDataRequest & {
      name: DockerRegistryNameComponent;
    })
  | Record<string, any>;
