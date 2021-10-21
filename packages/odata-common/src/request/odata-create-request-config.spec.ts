import { TestEntity } from '@sap-cloud-sdk/core/test/test-util/test-services/v2/test-service';
import { oDataUri as oDataUriV2 } from '@sap-cloud-sdk/core/dist/odata-v2/uri-conversion';
import { ODataCreateRequestConfig } from './odata-create-request-config';

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
