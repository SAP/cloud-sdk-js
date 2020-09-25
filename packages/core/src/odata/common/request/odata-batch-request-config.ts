import { ODataRequestConfig } from './odata-request-config';

export class ODataBatchRequestConfig extends ODataRequestConfig {
  static readonly content_type_prefix = 'multipart/mixed; boundary=batch_';

  /**
   * Creates an instance of ODataBatchRequestConfig.
   *
   * @param defaultServicePath - The default OData service path
   * @param batchId - The batch id for building the header and the payload.
   */
  constructor(readonly defaultServicePath: string, readonly batchId: string) {
    super(
      'post',
      defaultServicePath,
      `${ODataBatchRequestConfig.content_type_prefix}${batchId}`
    );
  }

  resourcePath(): string {
    return '$batch';
  }

  queryParameters(): Record<string, any> {
    return {};
  }
}
