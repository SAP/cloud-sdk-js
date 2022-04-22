import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
/**
 * Representation of the 'DefaultApi'.
 * This API is part of the 'test-service' service.
 */
export declare const DefaultApi: {
  /**
   * Create a request builder for execution of get requests to the '/test-cases/default-tag' endpoint.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  noTag: () => OpenApiRequestBuilder<any>;
  /**
   * Create a request builder for execution of post requests to the '/test-cases/default-tag' endpoint.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  defaultTag: () => OpenApiRequestBuilder<any>;
};
//# sourceMappingURL=default-api.d.ts.map
