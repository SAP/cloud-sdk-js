import { asc, ODataGetAllRequestConfig } from '../internal';
import { CommonEntity } from '../../test/common-entity';
import { commonOdataUri } from '../../test/common-request-config';

describe('ODataGetAllRequestConfig', () => {
  let config: ODataGetAllRequestConfig<CommonEntity>;
  beforeEach(() => {
    config = new ODataGetAllRequestConfig(CommonEntity, commonOdataUri);
  });

  it('method is get', () => {
    expect(config.method).toBe('get');
  });

  it('has resourcePath without keys', () => {
    expect(config.resourcePath()).toBe(CommonEntity._entityName);
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
    config.selects = [
      CommonEntity.KEY_PROPERTY_GUID,
      CommonEntity.STRING_PROPERTY
    ];
    expect(Object.keys(config.queryParameters())).toContain('$select');
  });

  it('select all fields', () => {
    config.selects = [CommonEntity.ALL_FIELDS];
    expect(Object.keys(config.queryParameters())).toContain('$select');
  });

  it('has no selection if not set', () => {
    expect(Object.keys(config.queryParameters())).not.toContain('$select');
  });

  it('has filters if set', () => {
    config.filter = CommonEntity.STRING_PROPERTY.equals('test');
    expect(Object.keys(config.queryParameters())).toContain('$filter');
  });

  it('has no filters if not set', () => {
    expect(Object.keys(config.queryParameters())).not.toContain('$filter');
  });

  it('has orderby if set', () => {
    config.orderBy = [asc(CommonEntity.INT_16_PROPERTY)];
    expect(Object.keys(config.queryParameters())).toContain('$orderby');
  });

  it('has no orderby if not set', () => {
    expect(Object.keys(config.queryParameters())).not.toContain('$orderby');
  });
});
