/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */

/**
 * This represents all the meta-data and extra information to be stored as a k8-secret
 */
export type ObjectStoreSecretWithSensitiveDataRequest =
  | {
      /**
       * Name of the object store for the secret object to be created. Can be used later on check for existence of the secret.
       * @example "myobjectstore"
       */
      name: string;
      /**
       * Storage type e.g. S3, GCS,...
       * @example "S3"
       */
      type: string;
      /**
       * Bucket to be used
       * @example "mybucket1"
       */
      bucket?: string;
      /**
       * Optional parameter - URL of the storage server (S3 only)
       * @example "www.example.com"
       */
      endpoint?: string;
      /**
       * Optional parameter - Region of the storage server (S3 only)
       * @example "eu"
       */
      region?: string;
      /**
       * prefix folder to be added to storage path
       * @example "mp-api"
       */
      pathPrefix?: string;
      /**
       * 0, 1 flag for the KF-serving annotation - serving.kubeflow.org/s3-verifyssl
       * @example "0"
       */
      verifyssl?: string;
      /**
       * 0, 1 flag for KF-serving annotations - serving.kubeflow.org/s3-usehttps
       * @example "1"
       * Default: "1".
       */
      usehttps?: string;
      /**
       * key:value pairs of data
       */
      data: Record<string, any>;
    }
  | Record<string, any>;
