/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { Url } from './url';
/**
 * Response for successful file creation
 */
export type FileCreationResponse =
  | {
      /**
       * File creation response message
       * @example "File creation acknowledged"
       */
      message: string;
      url: Url;
    }
  | Record<string, any>;
