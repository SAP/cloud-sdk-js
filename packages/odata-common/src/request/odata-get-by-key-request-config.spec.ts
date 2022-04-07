import { v4 as uuid } from 'uuid';
import { CommonEntity, commonEntityApi } from '../../test/common-entity';
import { commonODataUri } from '../../test/common-request-config';
import { testEntityResourcePath } from '../../test/test-util';
import { DefaultDeSerializers } from '../de-serializers';
import { ODataGetByKeyRequestConfig } from './odata-get-by-key-request-config';

describe('ODataGetByKeyRequestConfig', () => {
  let config: ODataGetByKeyRequestConfig<CommonEntity, DefaultDeSerializers>;
  beforeEach(() => {
    config = new ODataGetByKeyRequestConfig(commonEntityApi, commonODataUri);
  });

  it('method is get', () => {
    expect(config.method).toBe('get');
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

  it('has selection', () => {
    config.selects = [
      commonEntityApi.schema.STRING_PROPERTY,
      commonEntityApi.schema.INT_16_PROPERTY
    ];
    expect(Object.keys(config.queryParameters())).toContain('$select');
  });

  it('has custom field selection', () => {
    config.selects = [commonEntityApi.customField('SomeCustomField')];
    expect(config.queryParameters()['$select']).toBe('SomeCustomField');
  });
});
