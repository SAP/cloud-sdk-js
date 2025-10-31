import mock from 'mock-fs';
import { defaultTsConfig, tsconfigJson } from './ts-config';

describe('tsconfigJson', () => {
  afterEach(() => {
    mock.restore();
  });

  it('returns the default tsconfig if transpilation is enabled', async () => {
    const tsConfig = await tsconfigJson(true, undefined);
    expect(JSON.parse(tsConfig!)).toEqual(defaultTsConfig);
  });

  it('returns undefined if transpilation is disabled', async () => {
    const tsConfig = await tsconfigJson(false, undefined);
    expect(tsConfig).toBeUndefined();
  });

  it('returns a custom config content if custom file path is defined', async () => {
    const customConfig = { customConfig: true };
    mock({
      path: {
        'customConfig.json': JSON.stringify(customConfig)
      }
    });
    const tsConfig = await tsconfigJson(false, './path/customConfig.json');
    expect(JSON.parse(tsConfig!)).toEqual(customConfig);
  });

  it('returns custom config content if custom directory path is defined', async () => {
    const customConfig = { customConfig: true };
    mock({
      path: {
        'tsconfig.json': JSON.stringify(customConfig)
      }
    });
    const tsConfig = await tsconfigJson(false, './path');
    expect(JSON.parse(tsConfig!)).toEqual(customConfig);
  });

  it('returns custom config content if custom file or directory does not exist', async () => {
    mock({});
    await expect(() => tsconfigJson(false, './path')).rejects.toThrow(
      'Could not read tsconfig.json at ./path.'
    );
  });
});
