import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import type { TestEntity } from './schema';
/**
 * Representation of the DefaultApi API.
 * This API is part of the SwaggerYamlService service.
 *
 * This API client has been created automatically using the SAP Cloud SDK - do not edit manually.
 */
export declare const DefaultApi: {
  /**
   * Test POST
   *
   * @param pathParam Path parameter number 1
   * @param queryParameters Optional object containing the query parameters.
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
   * @param pathParam Path parameter number 1
   * @param body Optional object containing the request body of type 'TestEntity'
   * @returns string
   */
  patchEntity: (
    pathParam: string,
    body: TestEntity | undefined
  ) => OpenApiRequestBuilder<string>;
};
//# sourceMappingURL=default-api.d.ts.map
