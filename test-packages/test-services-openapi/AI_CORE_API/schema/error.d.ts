/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { ErrorDetails } from './error-details';
/**
 * Error Response
 */
export type Error =
  | {
      /**
       * Min Length: 1.
       */
      code: string;
      /**
       * Min Length: 1.
       */
      message: string;
      /**
       * Min Length: 1.
       */
      target: string;
      requestId: string;
      details: Set<ErrorDetails>;
    }
  | Record<string, any>;
