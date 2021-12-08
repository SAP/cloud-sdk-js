import { CommonEntity, commonEntityApi } from '../../test/common-entity';
import { createRequestConfig } from '../../test/common-request-config';

describe('ODataCreateRequestConfig', () => {
  const config = createRequestConfig({
    payload: commonEntityApi.entityBuilder().build()
  });

  it('method is post', () => {
    expect(config.method).toBe('post');
  });

  it('has resourcePath without keys', () => {
    expect(config.resourcePath()).toBe(CommonEntity._entityName);
  });

  it('has no format', () => {
    expect(Object.keys(config.queryParameters())).not.toContain('$format');
  });
});
