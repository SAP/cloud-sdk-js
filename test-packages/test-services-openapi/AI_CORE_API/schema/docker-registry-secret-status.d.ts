/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
/**
 * This represents the meta-data of a stored secret. The 'data' field of the secret is never retrieved.
 */
export type DockerRegistrySecretStatus =
  | {
      /**
       * Name of dockerRegistryStore
       * @example "mydockeregistry"
       */
      name?: string;
    }
  | Record<string, any>;
