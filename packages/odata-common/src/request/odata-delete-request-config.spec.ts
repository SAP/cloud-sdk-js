import { v4 as uuid } from 'uuid';
import { CommonEntity, commonEntityApi } from '../../test/common-entity';
import { commonODataUri } from '../../test/common-request-config';
import { testEntityResourcePath } from '../../test/test-util';
import { DefaultDeSerializers } from '../de-serializers';
import { ODataDeleteRequestConfig } from './odata-delete-request-config';

describe('ODataDeleteRequestConfig', () => {
  let config: ODataDeleteRequestConfig<CommonEntity, DefaultDeSerializers>;
  beforeEach(() => {
    config = new ODataDeleteRequestConfig(commonEntityApi, commonODataUri);
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
});
