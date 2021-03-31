/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '../../../../../src';

/**
 * Representation of the 'DefaultApi'.
 * This API is part of the 'TestService' service.
 */
export const DefaultApi = {
  /**
   * Makes a get request to the '/test-cases/default-tag' endpoint and returns a 'any'
   *
   * @returns any
   */
  noTag: () => new OpenApiRequestBuilder<any>('get', '/test-cases/default-tag'),
  /**
   * Makes a post request to the '/test-cases/default-tag' endpoint and returns a 'any'
   *
   * @returns any
   */
  defaultTag: () =>
    new OpenApiRequestBuilder<any>('post', '/test-cases/default-tag')
};
