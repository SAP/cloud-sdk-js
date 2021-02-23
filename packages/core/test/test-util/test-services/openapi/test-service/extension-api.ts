/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '../../../../../src';
import { ExtensionApi } from './openapi/api';


export const TestServiceExtensionApi = {
  niceGetFunction: () => new OpenApiRequestBuilder<ExtensionApi, 'getTestCasesExtension'>(
    ExtensionApi,
    'getTestCasesExtension'
  ),
  testCasesExtensionPost: () => new OpenApiRequestBuilder<ExtensionApi, 'testCasesExtensionPost'>(
    ExtensionApi,
    'testCasesExtensionPost'
  )
};
