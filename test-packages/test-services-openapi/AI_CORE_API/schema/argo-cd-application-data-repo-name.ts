/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */

/**
 * Representation of the 'ArgoCDApplicationDataRepoName' schema.
 */
export type ArgoCDApplicationDataRepoName =
  | {
      /**
       * Name of the repository to synchronise
       */
      repositoryName: string;
      /**
       * revision to synchronise
       */
      revision: string;
      /**
       * path within the repository to synchronise
       */
      path: string;
      /**
       * ArgoCD application name
       * Max Length: 54.
       * Min Length: 3.
       * Pattern: "^[a-z0-9\\-]+$".
       */
      applicationName?: string;
    }
  | Record<string, any>;
