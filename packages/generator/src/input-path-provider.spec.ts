import { sep } from 'path';
import mock from 'mock-fs';
import { swaggerPathForEdmx } from './input-path-provider';

describe('swaggerPathForEdmx', () => {
  afterEach(() => mock.restore());

  it('replaces path ending with .json', () => {
    mock({
      '/service-specs': {
        'service.edmx': '',
        'service.json': ''
      }
    });
    expect(swaggerPathForEdmx('/service-specs/service.edmx')).toEqual(
      `${sep}service-specs${sep}service.json`
    );
  });

  it('replaces path ending with .JSON', () => {
    mock({
      '/service-specs': {
        'service.edmx': '',
        'service.JSON': ''
      }
    });
    expect(swaggerPathForEdmx('/service-specs/service.edmx')).toEqual(
      `${sep}service-specs${sep}service.JSON`
    );
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
  });
});
