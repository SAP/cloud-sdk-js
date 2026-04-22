import { mockFsWithMemfs } from '@sap-cloud-sdk/test-util-internal/fs-mocker';

mockFsWithMemfs(jest);

import { jest } from '@jest/globals';
import { vol } from 'memfs';
import { defaultTsConfig, tsconfigJson } from './ts-config';

describe('tsconfigJson', () => {
  afterEach(() => {
    vol.reset();
  });

  it('returns the default tsconfig if transpilation is enabled', async () => {
    const tsConfig = await tsconfigJson(true);
    expect(JSON.parse(tsConfig!)).toEqual(defaultTsConfig(false));
  });

  it('returns the default tsconfig with ESM config when generateESM is true', async () => {
    const tsConfig = await tsconfigJson(true, undefined, true);
    expect(JSON.parse(tsConfig!)).toEqual(defaultTsConfig(true));
  });

  it('returns undefined if transpilation is disabled', async () => {
    const tsConfig = await tsconfigJson();
    expect(tsConfig).toBeUndefined();
  });

  it('returns a custom config content if custom file path is defined', async () => {
    const customConfig = { customConfig: true };
    vol.fromNestedJSON(
      { path: { 'customConfig.json': JSON.stringify(customConfig) } },
      process.cwd()
    );
    const tsConfig = await tsconfigJson(false, './path/customConfig.json');
    expect(JSON.parse(tsConfig!)).toEqual(customConfig);
  });

  it('returns custom config content if custom directory path is defined', async () => {
    const customConfig = { customConfig: true };
    vol.fromNestedJSON(
      { path: { 'tsconfig.json': JSON.stringify(customConfig) } },
      process.cwd()
    );
    const tsConfig = await tsconfigJson(false, './path');
    expect(JSON.parse(tsConfig!)).toEqual(customConfig);
  });

  it('returns custom config content if custom file or directory does not exist', async () => {
    vol.fromNestedJSON({});
    await expect(() => tsconfigJson(false, './path')).rejects.toThrow(
      'Could not read tsconfig.json at ./path.'
    );
  });
});
