/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { GenericSecretData } from './generic-secret-data';
/**
 * Representation of the 'GenericSecretPostBody' schema.
 */
export type GenericSecretPostBody =
  | {
      /**
       * The name of the secret
       * Max Length: 252.
       * Min Length: 1.
       * Pattern: "^[a-z0-9\\-\\.]+$".
       */
      name: string;
      data: GenericSecretData;
    }
  | Record<string, any>;
