import { v4 as uuid } from 'uuid';
import { testEntityResourcePath } from '@sap-cloud-sdk/core/test/test-util/test-data';
import { TestEntity } from '@sap-cloud-sdk/core/test/test-util/test-services/v2/test-service';
import { oDataUri as oDataUriV2 } from '@sap-cloud-sdk/odata-v2';
import { ODataDeleteRequestConfig } from '@sap-cloud-sdk/odata-common';
import { uriConverter } from '../../../odata-v2/src/uri-conversion/uri-value-converter';

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
      testEntityResourcePath(
        keyPropGuid,
        keyPropString,
        uriConverter.convertToUriFormat
      )
    );
  });

  it('has no format', () => {
    expect(Object.keys(config.queryParameters())).not.toContain('$format');
  });
});
