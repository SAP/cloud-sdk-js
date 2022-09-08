import { CommonEntity } from '@sap-cloud-sdk/test-services-odata-common/common-entity';
import { ODataBatchRequestConfig } from './odata-batch-request-config';

describe('ODataBatchConfig', () => {
  let config: ODataBatchRequestConfig;

  beforeEach(() => {
    config = new ODataBatchRequestConfig(
      CommonEntity._defaultServicePath,
      'batch_id'
    );
  });

  it('method is post', () => {
    expect(config.method).toBe('post');
  });

  it('has resourcePath without keys', () => {
    expect(config.resourcePath()).toBe('$batch');
  });

  it('has no parameters', () => {
    expect(Object.keys(config.queryParameters()).length).toEqual(0);
  });
});
