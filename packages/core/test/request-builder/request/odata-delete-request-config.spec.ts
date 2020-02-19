import { v4 as uuid } from 'uuid';
import { ODataDeleteRequestConfig } from '../../../src/request-builder/request/odata-delete-request-config';
import { testEntityResourcePath } from '../../test-util/test-data';
import { TestEntity } from '../../test-util/test-services/test-service';

describe('ODataDeleteRequestConfig', () => {
  let config: ODataDeleteRequestConfig<TestEntity>;
  beforeEach(() => {
    config = new ODataDeleteRequestConfig(TestEntity);
  });

  it('method is delete', () => {
    expect(config.method).toBe('delete');
  });

  it('has resourcePath with keys', () => {
    const keyPropGuid = uuid();
    const keyPropString = 'keyProp';
    config.keys = { KeyPropertyGuid: keyPropGuid, KeyPropertyString: keyPropString };
    expect(config.resourcePath()).toEqual(testEntityResourcePath(keyPropGuid, keyPropString));
  });

  it('has no format', () => {
    expect(Object.keys(config.queryParameters())).not.toContain('$format');
  });
});
