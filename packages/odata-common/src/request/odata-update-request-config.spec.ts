import { v4 as uuid } from 'uuid';
import { testEntityResourcePath } from '../../../../test-resources/test/test-util/test-data';
import {
  commonOdataUri,
  commonUriConverter
} from '../../test/common-request-config';
import { CommonEntity } from '../../test/common-entity';
import { ODataUpdateRequestConfig } from './odata-update-request-config';

describe('ODataUpdateRequestConfig', () => {
  let config: ODataUpdateRequestConfig<CommonEntity>;
  beforeEach(() => {
    config = new ODataUpdateRequestConfig(CommonEntity, commonOdataUri);
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
      testEntityResourcePath(
        keyPropGuid,
        keyPropString,
        commonUriConverter.convertToUriFormat,
        'A_CommonEntity'
      )
    );
  });

  it('has no format', () => {
    expect(Object.keys(config.queryParameters())).not.toContain('format');
  });
});
