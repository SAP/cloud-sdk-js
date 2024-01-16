/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type {
  ResourceGroupList,
  ResourceGroupsPostRequest,
  ResourceGroupBase,
  ResourceGroup,
  ResourceGroupPatchRequest,
  ResourceGroupDeletionResponse
} from './schema';
/**
 * Representation of the 'ResourceGroupApi'.
 * This API is part of the 'AI_CORE_API' service.
 */
export declare const ResourceGroupApi: {
  /**
   * Retrieve a list of resource groups for a given tenant.
   *
   * @param queryParameters - Object containing the following keys: $top, $skip, $count, continueToken, labelSelector.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  kubesubmitV4ResourcegroupsGetAll: (queryParameters?: {
    $top?: number;
    $skip?: number;
    $count?: boolean;
    continueToken?: string;
    labelSelector?: string[];
  }) => OpenApiRequestBuilder<ResourceGroupList>;
  /**
   * Create resource group to a given main tenant. The length of resource group id must be between 3 and 253.
   *
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  kubesubmitV4ResourcegroupsCreate: (
    body: ResourceGroupsPostRequest
  ) => OpenApiRequestBuilder<ResourceGroupBase>;
  /**
   * Get a resource group of a given main tenant.
   *
   * @param resourceGroupId - Resource group identifier
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  kubesubmitV4ResourcegroupsGet: (
    resourceGroupId: string
  ) => OpenApiRequestBuilder<ResourceGroup>;
  /**
   * Replace some characteristics of the resource group, for instance labels.
   *
   * @param resourceGroupId - Resource group identifier
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  kubesubmitV4ResourcegroupsPatch: (
    resourceGroupId: string,
    body: ResourceGroupPatchRequest
  ) => OpenApiRequestBuilder<any>;
  /**
   * Delete a resource group of a given main tenant.
   *
   * @param resourceGroupId - Resource group identifier
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  kubesubmitV4ResourcegroupsDelete: (
    resourceGroupId: string
  ) => OpenApiRequestBuilder<ResourceGroupDeletionResponse>;
};
