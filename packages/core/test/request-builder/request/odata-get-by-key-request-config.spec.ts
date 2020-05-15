/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { v4 as uuid } from 'uuid';
import { ODataGetByKeyRequestConfig } from '../../../src/odata/common/request/odata-get-by-key-request-config';
import { testEntityResourcePath } from '../../test-util/test-data';
import { TestEntity } from '../../test-util/test-services/v2/test-service';
import { oDataUri } from '../../../src/odata/v2/uri-conversion';

describe('ODataGetByKeyRequestConfig', () => {
  let config: ODataGetByKeyRequestConfig<TestEntity>;
  beforeEach(() => {
    config = new ODataGetByKeyRequestConfig(TestEntity, oDataUri);
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
