/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */

/**
 * Information about the ArgoCD application itself
 */
export type ArgoCDApplicationStatusSource =
  | {
      /**
       * URL of the repository
       */
      repoURL?: string;
      /**
       * Path of the repository
       */
      path?: string;
      /**
       * Revision number of the ArgoCD application
       */
      revision?: string;
    }
  | Record<string, any>;
