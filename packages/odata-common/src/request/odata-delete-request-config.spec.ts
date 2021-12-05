import { v4 as uuid } from 'uuid';
import { testEntityResourcePath } from '../../../../test-resources/test/test-util/test-data';
import { CommonEntity } from '../../test/common-entity';
import {
  commonODataUri,
  commonUriConverter
} from '../../test/common-request-config';
import { DefaultDeSerializers } from '../de-serializers';
import { ODataDeleteRequestConfig } from './odata-delete-request-config';

describe('ODataDeleteRequestConfig', () => {
  let config: ODataDeleteRequestConfig<CommonEntity, DefaultDeSerializers>;
  beforeEach(() => {
    config = new ODataDeleteRequestConfig(CommonEntity, commonODataUri);
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
      testEntityResourcePath(
        keyPropGuid,
        keyPropString,
        commonUriConverter,
        'A_CommonEntity'
      )
    );
  });

  it('has no format', () => {
    expect(Object.keys(config.queryParameters())).not.toContain('$format');
  });
});
