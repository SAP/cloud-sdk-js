import { randomUUID } from 'node:crypto';
import { updateRequestConfig } from '@sap-cloud-sdk/test-services-odata-common/common-request-config';
import { commonEntityApi } from '@sap-cloud-sdk/test-services-odata-common/common-entity';
import { testEntityResourcePath } from '../../test/test-util';
import type { CommonEntity } from '@sap-cloud-sdk/test-services-odata-common/common-entity';
import type { DefaultDeSerializers } from '../de-serializers';
import type { ODataUpdateRequestConfig } from './odata-update-request-config';

describe('ODataUpdateRequestConfig', () => {
  let config: ODataUpdateRequestConfig<CommonEntity, DefaultDeSerializers>;
  beforeEach(() => {
    config = updateRequestConfig({
      payload: commonEntityApi
        .entityBuilder()
        .stringProperty('test')
        .int16Property(12)
        .build()
    });
  });

  it('method is patch as default', () => {
    expect(config.method).toBe('patch');
  });

  it('should only contain properties set using the builder in the payload', () => {
    expect(config.payload).toMatchObject({
      StringProperty: 'test',
      Int16Property: 12
    });
  });

  it('method is put when configured', () => {
    config.updateWithPut();
    expect(config.method).toBe('put');
  });

  it('has resourcePath with keys', () => {
    const keyPropGuid = randomUUID();
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
