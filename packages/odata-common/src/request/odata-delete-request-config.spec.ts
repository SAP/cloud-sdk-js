import { randomUUID } from 'node:crypto';
import { commonEntityApi } from '@sap-cloud-sdk/test-services-odata-common/common-entity';
import { commonODataUri } from '@sap-cloud-sdk/test-services-odata-common/common-request-config';
import { testEntityResourcePath } from '../../test/test-util';
import { ODataDeleteRequestConfig } from './odata-delete-request-config';
import type { DefaultDeSerializers } from '../de-serializers';
import type { CommonEntity } from '@sap-cloud-sdk/test-services-odata-common/common-entity';

describe('ODataDeleteRequestConfig', () => {
  let config: ODataDeleteRequestConfig<CommonEntity, DefaultDeSerializers>;
  beforeEach(() => {
    config = new ODataDeleteRequestConfig(commonEntityApi, commonODataUri);
  });

  it('method is delete', () => {
    expect(config.method).toBe('delete');
  });

  it('has resourcePath with keys', () => {
    const keyPropGuid = randomUUID();
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
