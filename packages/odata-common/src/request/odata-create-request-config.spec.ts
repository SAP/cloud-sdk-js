import { oDataUri as oDataUriV2 } from '@sap-cloud-sdk/odata-v2/internal';
import { ODataCreateRequestConfig } from '@sap-cloud-sdk/odata-common';
import { TestEntity } from '@sap-cloud-sdk/test-services/v2/test-service';
import { CommonEntity } from '../../test/common-entity';
import { createRequestConfig } from '../../test/common-request-config';

describe('ODataCreateRequestConfig', () => {
  const config = createRequestConfig({
    payload: CommonEntity.builder().build()
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
