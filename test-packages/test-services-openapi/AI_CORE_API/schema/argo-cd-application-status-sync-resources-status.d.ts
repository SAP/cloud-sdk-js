/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
/**
 * Representation of the 'ArgoCDApplicationStatusSyncResourcesStatus' schema.
 */
export type ArgoCDApplicationStatusSyncResourcesStatus =
  | {
      /**
       * ArgoCD application object name
       */
      name?: string;
      /**
       * ArgoCD application object kind
       */
      kind?: string;
      /**
       * ArgoCD application object sync status
       */
      status?: string;
      /**
       * ArgoCD application object message
       */
      message?: string;
    }
  | Record<string, any>;
