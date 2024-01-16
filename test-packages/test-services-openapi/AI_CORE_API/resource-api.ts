/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type {
  ResourceGetResponse,
  ResourcePatchBody,
  ResourcePatchResponse
} from './schema';
/**
 * Representation of the 'ResourceApi'.
 * This API is part of the 'AI_CORE_API' service.
 */
export const ResourceApi = {
  /**
   * Lists all hot spare nodes, used nodes and total nodes corresponding to tenant.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  kubesubmitV4ResourcesGet: () =>
    new OpenApiRequestBuilder<ResourceGetResponse>(
      'get',
      '/admin/resources/nodes'
    ),
  /**
   * Set hot spare nodes corresponding to tenant at main tenant level.
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  kubesubmitV4ResourcesPatch: (body: ResourcePatchBody) =>
    new OpenApiRequestBuilder<ResourcePatchResponse>(
      'patch',
      '/admin/resources/nodes',
      {
        body
      }
    )
};
