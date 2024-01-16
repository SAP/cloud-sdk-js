/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */

/**
 * Representation of the 'ArgoCDRepositoryData' schema.
 */
export type ArgoCDRepositoryData =
  | {
      /**
       * Name of the repository
       * Max Length: 51.
       * Min Length: 1.
       * Pattern: "^[a-z0-9\\-]+$".
       */
      name?: string;
      /**
       * URL of the repository to synchronise
       */
      url: string;
      /**
       * Username for read-access to the repository
       */
      username: string;
      /**
       * Password for read-access to the repository
       */
      password: string;
    }
  | Record<string, any>;
