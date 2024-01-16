/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { ServiceList, ExtendedService } from './schema';
/**
 * Representation of the 'ServiceApi'.
 * This API is part of the 'AI_CORE_API' service.
 */
export declare const ServiceApi: {
  /**
   * Retrieve a list of services for a given main tenant.
   *
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  kubesubmitV4AiservicesGetAll: () => OpenApiRequestBuilder<ServiceList>;
  /**
   * Get an service of a given main tenant.
   *
   * @param serviceName - Name of the Service
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  kubesubmitV4AiservicesGet: (
    serviceName: string
  ) => OpenApiRequestBuilder<ExtendedService>;
};
