/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { v4 as uuid } from 'uuid';
import { ODataDeleteRequestConfig } from '../../../src/common/request-builder/request/odata-delete-request-config';
import { testEntityResourcePath } from '../../test-util/test-data';
import { TestEntity } from '../../test-util/test-services/v2/test-service';
import * as uriConversion from '../../../src/v2/request-builder/request/uri-conversion';

describe('ODataDeleteRequestConfig', () => {
  let config: ODataDeleteRequestConfig<TestEntity>;
  beforeEach(() => {
    config = new ODataDeleteRequestConfig(TestEntity, uriConversion);
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
      testEntityResourcePath(keyPropGuid, keyPropString)
    );
  });

  it('has no format', () => {
    expect(Object.keys(config.queryParameters())).not.toContain('$format');
  });
});
