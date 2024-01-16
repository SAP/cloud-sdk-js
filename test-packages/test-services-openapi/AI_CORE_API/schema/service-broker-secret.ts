/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */

/**
 * Representation of the 'ServiceBrokerSecret' schema.
 */
export type ServiceBrokerSecret =
  | {
      /**
       * broker secret name
       */
      name?: string;
      /**
       * username key reference in broker secret
       */
      passwordKeyRef?: string;
      /**
       * password key reference in broker secret
       */
      usernameKeyRef?: string;
    }
  | Record<string, any>;
