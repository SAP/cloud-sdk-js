import { v4 as uuid } from 'uuid';
import { testEntityResourcePath } from '@sap-cloud-sdk/core/test/test-util/test-data';
import { TestEntity } from '@sap-cloud-sdk/core/test/test-util/test-services/v2/test-service';
import { oDataUri as oDataUriV2 } from '@sap-cloud-sdk/core/dist/odata-v2/uri-conversion';
import { ODataUpdateRequestConfig } from './odata-update-request-config';

describe('ODataUpdateRequestConfig', () => {
  let config: ODataUpdateRequestConfig<TestEntity>;
  beforeEach(() => {
    config = new ODataUpdateRequestConfig(TestEntity, oDataUriV2);
  });

  it('method is patch as default', () => {
    expect(config.method).toBe('patch');
  });

  it('method is put when configured', () => {
    config.updateWithPut();
    expect(config.method).toBe('put');
  });

  it('has resourcePath with keys', () => {
    const keyPropGuid = uuid();
    const keyPropString = 'keyProp';
    config.keys = {
      KeyPropertyGuid: keyPropGuid,
      KeyPropertyString: keyPropString
    };
    expect(config.resourcePath()).toBe(
      testEntityResourcePath(keyPropGuid, keyPropString)
    );
  });

  it('has no format', () => {
    expect(Object.keys(config.queryParameters())).not.toContain('format');
  });
});
