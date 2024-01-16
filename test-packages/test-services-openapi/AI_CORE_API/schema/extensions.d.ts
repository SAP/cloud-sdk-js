/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { Spec } from './spec';
/**
 * Representation of the 'Extensions' schema.
 */
export type Extensions =
  | {
      analytics?: Spec & Record<string, any>;
      resourceGroups?: Spec & Record<string, any>;
      dataset?:
        | (Spec & {
            /**
             * List of Dataset extension capabilities
             */
            capabilities?:
              | {
                  /**
                   * Support for uploading of files
                   * Default: true.
                   */
                  upload?: boolean;
                  /**
                   * Support for downloading of files
                   * Default: true.
                   */
                  download?: boolean;
                  /**
                   * Support for deletion of files
                   * Default: true.
                   */
                  delete?: boolean;
                }
              | Record<string, any>;
            limits?:
              | {
                  /**
                   * Max size (in bytes) of a single uploaded file allowed by this runtime per resource group.
                   * Default: 104857600.
                   */
                  maxUploadFileSize?: number;
                  /**
                   * Max number of files per dataset. <0 means unlimited.
                   * Default: -1.
                   */
                  maxFilesPerDataset?: number;
                  acceptedContentTypes?: string[];
                }
              | Record<string, any>;
          })
        | Record<string, any>;
      metrics?:
        | (Spec & {
            /**
             * List of Metrics extension capabilities
             */
            capabilities?:
              | {
                  /**
                   * Support for returning extended results
                   */
                  extendedResults?: boolean;
                }
              | Record<string, any>;
          })
        | Record<string, any>;
    }
  | Record<string, any>;
