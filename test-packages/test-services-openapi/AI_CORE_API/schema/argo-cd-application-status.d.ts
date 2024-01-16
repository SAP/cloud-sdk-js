/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { ArgoCDApplicationStatusSource } from './argo-cd-application-status-source';
import type { ArgoCDApplicationStatusSyncResourcesStatus } from './argo-cd-application-status-sync-resources-status';
/**
 * ArgoCD application definition and status
 */
export type ArgoCDApplicationStatus =
  | {
      /**
       * ArgoCD application health status
       */
      healthStatus?: string;
      /**
       * ArgoCD application sync status
       */
      syncStatus?: string;
      /**
       * ArgoCD application health status message
       */
      message?: string;
      source?: ArgoCDApplicationStatusSource;
      /**
       * Gets the timestamp information related to the sync state of the ArgoCD application
       */
      syncFinishedAt?: string;
      /**
       * Get timestamp information related to the sync state of the ArgoCD application
       */
      syncStartedAt?: string;
      /**
       * Get timestamp information related to the sync state of the ArgoCD application
       */
      reconciledAt?: string;
      /**
       * Status of all resources that need to be synchronized with the gitops repo
       */
      syncResourcesStatus?: ArgoCDApplicationStatusSyncResourcesStatus[];
      /**
       * Status of all resources that need to be synchronized with the gitops repo. Misspelled and deprecated, use syncResourcesStatus instead.
       * @deprecated
       */
      syncRessourcesStatus?: ArgoCDApplicationStatusSyncResourcesStatus[];
    }
  | Record<string, any>;
