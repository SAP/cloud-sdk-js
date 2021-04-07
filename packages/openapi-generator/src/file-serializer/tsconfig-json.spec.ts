import { resolve } from 'path';
import { unixEOL } from '@sap-cloud-sdk/util'
import { readJSON } from '@sap-cloud-sdk/util';
import { GeneratorOptions } from '../options';
import { tsconfigJson } from './tsconfig-json';

describe('tsconfigJson', () => {
  it('contains the needed dom lib', () => {
    const tsConfig = JSON.parse(tsconfigJson({} as GeneratorOptions));
    expect(tsConfig.compilerOptions.lib).toContain('dom');
  });

  it('returns the custom ts config content', () => {
    const pathTsConfig = resolve(
      __dirname,
      '../../../../test-resources/openapi-service-specs/tsconfig.json'
    );
    const expected = JSON.stringify(readJSON(pathTsConfig), null, 2) + unixEOL;
    expect(
      tsconfigJson({ tsConfig: pathTsConfig } as GeneratorOptions)
    ).toEqual(expected);
  });
});
