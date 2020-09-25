import { v4 as uuid } from 'uuid';
import { ODataUpdateRequestConfig } from '../../../../src/odata/common/request/odata-update-request-config';
import { testEntityResourcePath } from '../../../test-util/test-data';
import { TestEntity } from '../../../test-util/test-services/v2/test-service';
import { oDataUriV2 } from '../../../../src/odata/v2/uri-conversion';

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
