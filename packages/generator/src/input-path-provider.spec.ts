jest.mock('fs', () => jest.requireActual('memfs').fs);
jest.mock('fs/promises', () => jest.requireActual('memfs').fs.promises);

import { sep } from 'path';
import { jest } from '@jest/globals';
import { vol } from 'memfs';
import { swaggerPathForEdmx } from './input-path-provider';

describe('swaggerPathForEdmx', () => {
  afterEach(() => vol.reset());

  it('replaces path ending with .json', () => {
    vol.fromNestedJSON({
      '/service-specs/service.edmx': '',
      '/service-specs/service.json': ''
    });
    expect(swaggerPathForEdmx('/service-specs/service.edmx')).toEqual(
      `${sep}service-specs${sep}service.json`
    );
  });

  it('replaces path ending with .JSON', () => {
    vol.fromNestedJSON({
      '/service-specs/service.edmx': '',
      '/service-specs/service.JSON': ''
    });
    expect(swaggerPathForEdmx('/service-specs/service.edmx')).toEqual(
      `${sep}service-specs${sep}service.JSON`
    );
  });

  it('returns undefined if there is no equally named json file', () => {
    vol.fromNestedJSON({
      '/service-specs/service.edmx': '',
      '/service-specs/SERVICE.json': '',
      '/service-specs/service.txt': ''
    });
    expect(swaggerPathForEdmx('/service-specs/service.edmx')).toBeUndefined();
  });
});
