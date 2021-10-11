import mock from 'mock-fs';
import { GeneratorOptions } from './generator-options';
import { defaultTsConfig, tsconfigJson } from './tsconfig-json';

describe('tsconfigJson', () => {
  it('returns the default tsconfig if transpilation is enabled', async () => {
    const tsConfig = await tsconfigJson({
      transpile: true
    } as GeneratorOptions);
    expect(JSON.parse(tsConfig!)).toEqual(defaultTsConfig);
  });

  it('returns undefined if transpilation is disabled', async () => {
    const tsConfig = await tsconfigJson({
      transpile: false
    } as GeneratorOptions);
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
      tsConfig: './path/customConfig.json'
    } as GeneratorOptions);
    expect(JSON.parse(tsConfig!)).toEqual(customConfig);
    mock.restore();
  });

  it('returns custom config content if custom directory path is defined', async () => {
    const customConfig = { customConfig: true };
    mock({
      path: {
        'tsconfig.json': JSON.stringify(customConfig)
      }
    });
    const tsConfig = await tsconfigJson({
      tsConfig: './path'
    } as GeneratorOptions);
    expect(JSON.parse(tsConfig!)).toEqual(customConfig);
    mock.restore();
  });

  it('returns custom config content if custom file or directory does not exist', async () => {
    mock({});
    await expect(() =>
      tsconfigJson({
        tsConfig: './path'
      } as GeneratorOptions)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Could not read tsconfig.json at ./path."'
    );
    mock.restore();
  });
});
