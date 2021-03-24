/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import { Job } from './model';

export const JobsApi = {
  getV1JobsByJobId: (jobId: string) => new OpenApiRequestBuilder<Job>(
    'get',
    `/v1/jobs/${jobId}`
  )
};
