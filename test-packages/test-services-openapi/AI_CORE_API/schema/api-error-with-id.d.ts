/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { Id } from './id';
import type { ApiError } from './api-error';
/**
 * Representation of the 'ApiErrorWithId' schema.
 */
export type ApiErrorWithId =
  | {
      id: Id;
      error: ApiError;
    }
  | Record<string, any>;
