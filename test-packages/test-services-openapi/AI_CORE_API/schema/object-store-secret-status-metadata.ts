/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */

/**
 * Key value paris of meta-data assigned to the secret when the secret was being created.
 */
export type ObjectStoreSecretStatusMetadata =
  | {
      /**
       * 0 and 1 values for setting the flag
       * @example "1"
       */
      'serving.kubeflow.org/s3-usehttps'?: string;
      /**
       * 0 and 1 values for setting the flag
       * @example "0"
       */
      'serving.kubeflow.org/s3-verifyssl'?: string;
      /**
       * Annotation for endpoint required by KF_Serving
       * @example "some_endpoint"
       */
      'serving.kubeflow.org/s3-endpoint'?: string;
      /**
       * Annotation for region required by KF_Serving
       * @example "EU"
       */
      'serving.kubeflow.org/s3-region'?: string;
      /**
       * Storage type of the secret
       * @example "S3"
       */
      'storage.ai.sap.com/type'?: string;
      /**
       * bucket assigned to the secret on creation
       * @example "my_bucket"
       */
      'storage.ai.sap.com/bucket'?: string;
      /**
       * Endpoint assigned to the secret on creation
       * @example "some_endpoint"
       */
      'storage.ai.sap.com/endpoint'?: string;
      /**
       * Region of the storage server
       * @example "EU"
       */
      'storage.ai.sap.com/region'?: string;
      /**
       * Pathprefix type assigned to the secret on creation.
       * @example "mnist_folder"
       */
      'storage.ai.sap.com/pathPrefix'?: string;
      /**
       * name node of the HDFS file system
       * @example "https://c3272xxxxxfa8f.files.hdl.canary-eu10.hanacloud.ondemand.com"
       */
      'storage.ai.sap.com/hdfsNameNode'?: string;
      /**
       * headers for webHDFS and other protocols
       * @example "{\"x-sap-filecontainer\": \"c32727xxxxxxx322dcfa8f\"}"
       */
      'storage.ai.sap.com/headers'?: string;
      /**
       * container uri of azure storage
       * @example "https://sapcv842awjkfb2.blob.core.windows.net/sapcp-osaas-xxx-xxxx-xxxx-xxxx-xxxx-zrs"
       */
      'storage.ai.sap.com/containerUri'?: string;
      /**
       * subscription id
       * @example "dgewg2-gkrwnegiw"
       */
      'storage.ai.sap.com/subscriptionId'?: string;
      /**
       * tenant id
       * @example "dawd2120-dadwad2"
       */
      'storage.ai.sap.com/tenantId'?: string;
    }
  | Record<string, any>;
