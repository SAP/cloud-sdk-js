import {
  CommonEntity,
  commonEntityApi
} from '@sap-cloud-sdk/test-services-odata-common/common-entity';
import { createRequestConfig } from '@sap-cloud-sdk/test-services-odata-common/common-request-config';

describe('ODataCreateRequestConfig', () => {
  const config = createRequestConfig({
    payload: commonEntityApi.entityBuilder().stringProperty('test').build()
  });

  it('method is post', () => {
    expect(config.method).toBe('post');
  });

  it('should only contain properties set using the builder in the payload', () => {
    expect(config.payload).toMatchObject({ StringProperty: 'test' });
  });

  it('has resourcePath without keys', () => {
    expect(config.resourcePath()).toBe(CommonEntity._entityName);
  });

  it('has no format', () => {
    expect(Object.keys(config.queryParameters())).not.toContain('$format');
  });
});
