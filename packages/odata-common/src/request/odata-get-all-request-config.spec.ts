import { testFilterString } from '@sap-cloud-sdk/core/test/test-util/filter-factory';
import { TestEntity } from '@sap-cloud-sdk/core/test/test-util/test-services/v2/test-service';
import { oDataUri as oDataUriV2 } from '@sap-cloud-sdk/core/dist/odata-v2/uri-conversion';
import { asc } from '../order';
import { ODataGetAllRequestConfig } from './odata-get-all-request-config';

describe('ODataGetAllRequestConfig', () => {
  let config: ODataGetAllRequestConfig<TestEntity>;
  beforeEach(() => {
    config = new ODataGetAllRequestConfig(TestEntity, oDataUriV2);
  });

  it('method is get', () => {
    expect(config.method).toBe('get');
  });

  it('has resourcePath without keys', () => {
    expect(config.resourcePath()).toBe(TestEntity._entityName);
  });

  it('has format json', () => {
    expect(config.queryParameters()['$format']).toBe('json');
  });

  it('has skip if set', () => {
    config.skip = 10;
    expect(config.queryParameters()['$skip']).toBe(config.skip);
  });

  it('has no top if not set', () => {
    expect(Object.keys(config.queryParameters())).not.toContain('top');
  });

  it('has top if set', () => {
    config.top = 10;
    expect(config.queryParameters()['$top']).toBe(config.top);
  });

  it('has no skip if not set', () => {
    expect(Object.keys(config.queryParameters())).not.toContain('skip');
  });

  it('has selection if set', () => {
    config.selects = [TestEntity.KEY_PROPERTY_GUID, TestEntity.STRING_PROPERTY];
    expect(Object.keys(config.queryParameters())).toContain('$select');
  });

  it('select all fields', () => {
    config.selects = [TestEntity.ALL_FIELDS];
    expect(Object.keys(config.queryParameters())).toContain('$select');
  });

  it('has no selection if not set', () => {
    expect(Object.keys(config.queryParameters())).not.toContain('$select');
  });

  it('has filters if set', () => {
    config.filter = testFilterString.filter;
    expect(Object.keys(config.queryParameters())).toContain('$filter');
  });

  it('has no filters if not set', () => {
    expect(Object.keys(config.queryParameters())).not.toContain('$filter');
  });

  it('has orderby if set', () => {
    config.orderBy = [asc(TestEntity.INT_16_PROPERTY)];
    expect(Object.keys(config.queryParameters())).toContain('$orderby');
  });

  it('has no orderby if not set', () => {
    expect(Object.keys(config.queryParameters())).not.toContain('$orderby');
  });
});
