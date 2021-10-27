import { v4 as uuid } from 'uuid';
import { oDataUri } from '@sap-cloud-sdk/odata-v2';
import { ODataUpdateRequestConfig } from '@sap-cloud-sdk/odata-common';
import { testEntityResourcePath } from '../../../core/test/test-util/test-data';
import { TestEntity } from '../../../core/test/test-util/test-services/v2/test-service';
import { uriConverter } from '../../../odata-v2/src/uri-conversion/uri-value-converter';

describe('ODataUpdateRequestConfig', () => {
  let config: ODataUpdateRequestConfig<TestEntity>;
  beforeEach(() => {
    config = new ODataUpdateRequestConfig(TestEntity, oDataUri);
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
        uriConverter.convertToUriFormat
      )
    );
  });

  it('has no format', () => {
    expect(Object.keys(config.queryParameters())).not.toContain('format');
  });
});
