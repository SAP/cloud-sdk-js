/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { Capabilities } from './schema';
/**
 * Representation of the 'MetaApi'.
 * This API is part of the 'AI_CORE_API' service.
 */
export const MetaApi = {
  /**
   * Meta information about an implementation of AI API, describing its capabilities, limits and extensions
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  metaGet: () => new OpenApiRequestBuilder<Capabilities>('get', '/lm/meta')
};
