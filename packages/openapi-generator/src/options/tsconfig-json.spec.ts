import { defaultTsConfig } from '@sap-cloud-sdk/generator-common/internal';
import mock from 'mock-fs';
import { tsconfigJson } from './tsconfig-json';
import type { ParsedGeneratorOptions } from './options';

describe('tsconfigJson', () => {
  afterEach(() => {
    mock.restore();
  });

  it('returns the default tsconfig if transpilation is enabled', async () => {
    const tsConfig = await tsconfigJson({
      transpile: true
    } as ParsedGeneratorOptions);
    expect(JSON.parse(tsConfig!)).toEqual(defaultTsConfig);
  });

  it('returns undefined if transpilation is disabled', async () => {
    const tsConfig = await tsconfigJson({
      transpile: false
    } as ParsedGeneratorOptions);
    expect(tsConfig).toBeUndefined();
  });

  it('returns a custom config content if custom file path is defined', async () => {
    const customConfig = { customConfig: true };
    mock({
      path: {
        'customConfig.json': JSON.stringify(customConfig)
      }
    });
    const tsConfig = await tsconfigJson({
      tsconfig: './path/customConfig.json'
    } as ParsedGeneratorOptions);
    expect(JSON.parse(tsConfig!)).toEqual(customConfig);
  });

  it('returns custom config content if custom directory path is defined', async () => {
    const customConfig = { customConfig: true };
    mock({
      path: {
        'tsconfig.json': JSON.stringify(customConfig)
      }
    });
    const tsConfig = await tsconfigJson({
      tsconfig: './path'
    } as ParsedGeneratorOptions);
    expect(JSON.parse(tsConfig!)).toEqual(customConfig);
  });

  it('returns custom config content if custom file or directory does not exist', async () => {
    mock({});
    await expect(() =>
      tsconfigJson({
        tsconfig: './path'
      } as ParsedGeneratorOptions)
    ).rejects.toThrow('Could not read tsconfig.json at ./path.');
  });
});
