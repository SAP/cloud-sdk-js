/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { v4 as uuid } from 'uuid';
import { ODataUpdateRequestConfig } from '../../../src/common/request-builder/request/odata-update-request-config';
import { testEntityResourcePath } from '../../test-util/test-data';
import { TestEntity } from '../../test-util/test-services/v2/test-service';
import * as uriConversion from '../../../src/v2/request-builder/request/uri-conversion';

describe('ODataUpdateRequestConfig', () => {
  let config: ODataUpdateRequestConfig<TestEntity>;
  beforeEach(() => {
    config = new ODataUpdateRequestConfig(TestEntity, uriConversion);
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
