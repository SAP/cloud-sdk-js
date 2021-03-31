import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import type { TestEntity } from './schema';
/**
 * Representation of the 'DefaultApi'.
 * This API is part of the 'SwaggerYamlService' service.
 */
export declare const DefaultApi: {
  /**
   * Test POST
   *
   * @param pathParam Path parameter with the original name pathParam
   * @param queryParameters Object containing the query parameters.
   * @returns TestEntity[]
   */
  postEntity: (
    pathParam: string,
    queryParameters?:
      | {
          queryParam?: string | undefined;
        }
      | undefined
  ) => OpenApiRequestBuilder<TestEntity[]>;
  /**
   * Makes a patch request to the '/entities/{pathParam}' endpoint and returns a 'string'
   *
   * @param pathParam Path parameter with the original name pathParam
   * @param body Request body
   * @returns string
   */
  patchEntity: (
    pathParam: string,
    body: TestEntity | undefined
  ) => OpenApiRequestBuilder<string>;
};
//# sourceMappingURL=default-api.d.ts.map
