/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
/**
 * Representation of the 'ResourceGroupLabel' schema.
 */
export type ResourceGroupLabel =
  | {
      /**
       * @example "ext.ai.sap.com/my-label"
       * Max Length: 63.
       * Pattern: "^ext.ai.sap.com/(([A-Za-z0-9][-A-Za-z0-9_.]*)?[A-Za-z0-9]){1,48}$".
       */
      key: string;
      /**
       * Max Length: 5000.
       */
      value: string;
    }
  | Record<string, any>;
