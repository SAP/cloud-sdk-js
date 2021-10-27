import { oDataUri as oDataUriV2 } from '@sap-cloud-sdk/odata-v2';
import { ODataCreateRequestConfig } from '@sap-cloud-sdk/odata-common';
import { TestEntity } from '../../../core/test/test-util/test-services/v2/test-service';

describe('ODataCreateRequestConfig', () => {
  let config: ODataCreateRequestConfig<TestEntity>;
  beforeEach(() => {
    config = new ODataCreateRequestConfig(TestEntity, oDataUriV2);
  });

  it('method is post', () => {
    expect(config.method).toBe('post');
  });

  it('has resourcePath without keys', () => {
    expect(config.resourcePath()).toBe(TestEntity._entityName);
  });

  it('has no format', () => {
    expect(Object.keys(config.queryParameters())).not.toContain('$format');
  });
});
