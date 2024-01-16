/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */

/**
 * Representation of the 'ArgoCDApplicationBaseData' schema.
 */
export type ArgoCDApplicationBaseData =
  | {
      /**
       * URL of the repository to synchronise
       */
      repositoryUrl: string;
      /**
       * revision to synchronise
       */
      revision: string;
      /**
       * path within the repository to synchronise
       */
      path: string;
    }
  | Record<string, any>;
