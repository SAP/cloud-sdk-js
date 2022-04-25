import { v4 as uuid } from 'uuid';
import { commonODataUri } from '@sap-cloud-sdk/test-services-odata-common/common-request-config';
import {
  CommonEntity,
  commonEntityApi
} from '@sap-cloud-sdk/test-services-odata-common/common-entity';
import { DefaultDeSerializers } from '../de-serializers';
import { testEntityResourcePath } from '../../test/test-util';
import { ODataUpdateRequestConfig } from './odata-update-request-config';

describe('ODataUpdateRequestConfig', () => {
  let config: ODataUpdateRequestConfig<CommonEntity, DefaultDeSerializers>;
  beforeEach(() => {
    config = new ODataUpdateRequestConfig(commonEntityApi, commonODataUri);
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
