/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { ODataBatchConfig } from '../../src/request-builder/request/odata-batch-config';
import { defaultTestServicePath } from '../test-util/test-services/test-service';

describe('ODataBatchConfig', () => {
  let config: ODataBatchConfig;

  beforeEach(() => {
    config = new ODataBatchConfig(defaultTestServicePath, 'batch_id');
  });

  it('method is post', () => {
    expect(config.method).toBe('post');
  });

  it('has resourcePath without keys', () => {
    expect(config.resourcePath()).toBe('$batch');
  });

  it('has no parameters', () => {
    expect(Object.keys(config.queryParameters()).length).toEqual(0);
  });
});
