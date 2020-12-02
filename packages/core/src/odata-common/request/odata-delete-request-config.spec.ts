import { v4 as uuid } from 'uuid';
import { testEntityResourcePath } from '../../../test/test-util/test-data';
import { TestEntity } from '../../../test/test-util/test-services/v2/test-service';
import { oDataUriV2 } from '../../odata-v2/uri-conversion';
import { ODataDeleteRequestConfig } from './odata-delete-request-config';

describe('ODataDeleteRequestConfig', () => {
  let config: ODataDeleteRequestConfig<TestEntity>;
  beforeEach(() => {
    config = new ODataDeleteRequestConfig(TestEntity, oDataUriV2);
  });

  it('method is delete', () => {
    expect(config.method).toBe('delete');
  });

  it('has resourcePath with keys', () => {
    const keyPropGuid = uuid();
    const keyPropString = 'keyProp';
    config.keys = {
      KeyPropertyGuid: keyPropGuid,
      KeyPropertyString: keyPropString
    };
    expect(config.resourcePath()).toEqual(
      testEntityResourcePath(keyPropGuid, keyPropString)
    );
  });

  it('has no format', () => {
    expect(Object.keys(config.queryParameters())).not.toContain('$format');
  });
});
