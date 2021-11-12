import { v4 as uuid } from 'uuid';
import { TestEntity } from '@sap-cloud-sdk/test-services/v2/test-service';
import { oDataUri as oDataUriV2 } from '@sap-cloud-sdk/odata-v2/internal';
import { ODataGetByKeyRequestConfig } from '@sap-cloud-sdk/odata-common';
import { testEntityResourcePath } from '../../../../test-resources/test/test-util/test-data';
import { uriConverter } from '../../../odata-v2/src/uri-conversion/uri-value-converter';

describe('ODataGetByKeyRequestConfig', () => {
  let config: ODataGetByKeyRequestConfig<TestEntity>;
  beforeEach(() => {
    config = new ODataGetByKeyRequestConfig(TestEntity, oDataUriV2);
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
      testEntityResourcePath(
        keyPropGuid,
        keyPropString,
        uriConverter.convertToUriFormat
      )
    );
  });

  it('has format json', () => {
    expect(config.queryParameters()['$format']).toBe('json');
  });

  it('has selection', () => {
    config.selects = [TestEntity.INT_32_PROPERTY, TestEntity.BOOLEAN_PROPERTY];
    expect(Object.keys(config.queryParameters())).toContain('$select');
  });

  it('has custom field selection', () => {
    config.selects = [TestEntity.customField('SomeCustomField')];
    expect(config.queryParameters()['$select']).toBe('SomeCustomField');
  });
});
