import { ODataCreateRequestConfig } from '../../../../src/odata-common';
import { TestEntity } from '../../../test-util/test-services/v2/test-service';
import { oDataUriV2 } from '../../../../src';

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
