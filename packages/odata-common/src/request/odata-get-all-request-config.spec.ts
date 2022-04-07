import { CommonEntity, commonEntityApi } from '../../test/common-entity';
import { commonODataUri } from '../../test/common-request-config';
import { DefaultDeSerializers } from '../de-serializers';
import { asc } from '../order';
import { ODataGetAllRequestConfig } from './odata-get-all-request-config';

describe('ODataGetAllRequestConfig', () => {
  let config: ODataGetAllRequestConfig<CommonEntity, DefaultDeSerializers>;
  beforeEach(() => {
    config = new ODataGetAllRequestConfig(commonEntityApi, commonODataUri);
  });

  it('method is get', () => {
    expect(config.method).toBe('get');
  });

  it('has resourcePath without keys', () => {
    expect(config.resourcePath()).toBe(CommonEntity._entityName);
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
    config.selects = [
      commonEntityApi.schema.KEY_PROPERTY_GUID,
      commonEntityApi.schema.STRING_PROPERTY
    ];
    expect(Object.keys(config.queryParameters())).toContain('$select');
  });

  it('select all fields', () => {
    config.selects = [commonEntityApi.schema.ALL_FIELDS];
    expect(Object.keys(config.queryParameters())).toContain('$select');
  });

  it('has no selection if not set', () => {
    expect(Object.keys(config.queryParameters())).not.toContain('$select');
  });

  it('has filters if set', () => {
    config.filter = commonEntityApi.schema.STRING_PROPERTY.equals('test');
    expect(Object.keys(config.queryParameters())).toContain('$filter');
  });

  it('has no filters if not set', () => {
    expect(Object.keys(config.queryParameters())).not.toContain('$filter');
  });

  it('has orderby if set', () => {
    config.orderBy = [asc(commonEntityApi.schema.INT_16_PROPERTY)];
    expect(Object.keys(config.queryParameters())).toContain('$orderby');
  });

  it('has no orderby if not set', () => {
    expect(Object.keys(config.queryParameters())).not.toContain('$orderby');
  });
});
