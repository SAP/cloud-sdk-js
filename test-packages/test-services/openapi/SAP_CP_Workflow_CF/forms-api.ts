/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import { FormMetadata, FormModel } from './model';

export const FormsApi = {
  getV1Forms: (queryParameters?: {'$skip'?: number,
  '$top'?: number,
  '$inlinecount'?: 'allpages' | 'none',
  'type'?: 'start' | 'task'}) => new OpenApiRequestBuilder<FormMetadata[]>(
    'get',
    '/v1/forms',
    {
          queryParameters
        }
  ),
  deleteV1FormsByFormId: (formId: string) => new OpenApiRequestBuilder<any>(
    'delete',
    `/v1/forms/${formId}`
  ),
  getV1FormsRevisionsModelByFormIdAndRevisionId: (formId: string, revisionId: string) => new OpenApiRequestBuilder<FormModel>(
    'get',
    `/v1/forms/${formId}/revisions/${revisionId}/model`
  ),
  getV1FormsVersionsModelByFormIdAndVersionNumber: (formId: string, versionNumber: string) => new OpenApiRequestBuilder<FormModel>(
    'get',
    `/v1/forms/${formId}/versions/${versionNumber}/model`
  )
};
