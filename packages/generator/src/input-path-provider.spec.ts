import mock from 'mock-fs';
import { swaggerPathForEdmx } from './input-path-provider';

describe('swaggerPathForEdmx', () => {
  it('replaces path ending with .json', () => {
    mock({
      '/service-specs': {
        'service.edmx': '',
        'service.json': ''
      }
    });
    expect(swaggerPathForEdmx('/service-specs/service.edmx')).toEqual(
      '/service-specs/service.json'
    );
    mock.restore();
  });

  it('replaces path ending with .JSON', () => {
    mock({
      '/service-specs': {
        'service.edmx': '',
        'service.JSON': ''
      }
    });
    expect(swaggerPathForEdmx('/service-specs/service.edmx')).toEqual(
      '/service-specs/service.JSON'
    );
    mock.restore();
  });

  it('returns undefined if there is no equally named json file', () => {
    mock({
      '/service-specs': {
        'service.edmx': '',
        'SERVICE.json': '',
        'service.txt': ''
      }
    });
    expect(swaggerPathForEdmx('/service-specs/service.edmx')).toBeUndefined();
    mock.restore();
  });
});
