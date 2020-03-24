/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { ODataCreateRequestConfig } from '../../../src/request-builder/request/odata-create-request-config';
import { TestEntity } from '../../test-util/test-services/test-service';

describe('ODataCreateRequestConfig', () => {
  let config: ODataCreateRequestConfig<TestEntity>;
  beforeEach(() => {
    config = new ODataCreateRequestConfig(TestEntity);
  });

  it('method is post', () => {
    expect(config.method).toBe('post');
  });

  it('has resourcePath without keys', () => {
    expect(config.resourcePath()).toBe(TestEntity._entityName);
  });

  it('has no format', () => {
    expect(Object.keys(config.queryParameters())).not.toContain('$format');
  });
});
