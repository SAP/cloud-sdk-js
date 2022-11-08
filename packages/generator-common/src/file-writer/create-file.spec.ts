import { promises, readFileSync } from 'fs';
import { resolve } from 'path';
import mock from 'mock-fs';
import prettier from 'prettier';
import { createLogger, unixEOL } from '@sap-cloud-sdk/util';
import {
  createFile,
  CreateFileOptions,
  defaultPrettierConfig,
  readPrettierConfig
} from './create-file';

const { readFile } = promises;

describe('createFile', () => {
  const pathRootNodeModules = resolve(__dirname, '../../../../node_modules');
  const pathFormattedPackageJson = resolve(
    __dirname,
    '../../test/package.json'
  );
  const defaultCreateConfig: CreateFileOptions = {
    prettierOptions: defaultPrettierConfig,
    overwrite: true
  };

  beforeEach(() => {
    mock({
      [pathRootNodeModules]: mock.load(pathRootNodeModules),
      [pathFormattedPackageJson]: mock.load(pathFormattedPackageJson),
      [resolve(process.cwd(), 'some-dir', '.prettierrc')]: JSON.stringify({
        semi: false
      }),
      directory: {
        existingFile: 'already exists'
      }
    });
  });

  afterEach(() => {
    mock.restore();
  });

  it('creates formatted content with copyright for non typescript files', async () => {
    await createFile(
      'directory',
      'filename.ts',
      'const content = 123;',
      defaultCreateConfig
    );
    expect(await readFile('directory/filename.ts', 'utf8'))
      .toMatchInlineSnapshot(`
      "/*
       * Copyright (c) ${new Date().getFullYear()} SAP SE or an SAP affiliate company. All rights reserved.
       *
       * This is a generated file powered by the SAP Cloud SDK for JavaScript.
       */
      const content = 123;
      "
    `);
  });

  it('creates formatted content without copyright for non typescript files', async () => {
    await createFile(
      'directory',
      'filename.json',
      JSON.stringify({ content: 123 }),
      defaultCreateConfig
    );
    expect(await readFile('directory/filename.json', 'utf8')).toEqual(
      `{ "content": 123 }${unixEOL}`
    );
  });

  it('throws an error if overwriting is disabled', async () => {
    await expect(() =>
      createFile('directory', 'existingFile', 'content', {
        ...defaultCreateConfig,
        overwrite: false
      })
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Could not write file \\"existingFile\\". File already exists. If you want to allow overwriting files, enable the `overwrite` flag."'
    );
  });

  xit('has the same result as CLI prettier for .json files.', async () => {
    // TODO I could not get this to work. For some reason the CLI makes each array entry a new line, the API does it when the printWith is hit.
    const formattedCLI = await readFile(pathFormattedPackageJson, {
      encoding: 'utf-8'
    });
    await createFile('/', 'api-formatted.json', formattedCLI, {
      overwrite: true,
      prettierOptions: defaultPrettierConfig
    });
    const formattedAPI = await readFile('/api-formatted.json', {
      encoding: 'utf-8'
    });
    expect(formattedAPI).toEqual(formattedCLI);
  });

  it('uses prettier per default', async () => {
    const spy = jest.spyOn(prettier, 'format');
    await createFile(
      'directory',
      'formatted.ts',
      "const abc='123'",
      defaultCreateConfig
    );
    expect(
      readFileSync('directory/formatted.ts', { encoding: 'utf-8' })
    ).toContain(`const abc = '123';${unixEOL}`);
    expect(spy).toHaveBeenCalledWith(expect.any(String), {
      ...defaultPrettierConfig,
      parser: 'typescript'
    });
  });

  it('uses custom prettier config', async () => {
    await createFile('directory', 'formatted.ts', "const abc='123'", {
      ...defaultCreateConfig,
      prettierOptions: await readPrettierConfig('some-dir/.prettierrc')
    });
    expect(
      readFileSync('directory/formatted.ts', { encoding: 'utf-8' })
    ).toContain(`const abc = "123"${unixEOL}`);
  });

  it('uses default config if custom prettier config is not found', async () => {
    const logger = createLogger('create-file');
    const spy = jest.spyOn(prettier, 'format');
    const loggerSpy = jest.spyOn(logger, 'warn');
    const defaultConfig = await readPrettierConfig('not-existing/.prettierrc');

    expect(loggerSpy).toHaveBeenCalledWith(
      expect.stringMatching(
        'Prettier config file not found: .*not-existing/.prettierrc - default is used.'
      )
    );
    expect(defaultConfig).toBe(defaultPrettierConfig);
  });

  it('does not fail on unknown file and warns', async () => {
    const logger = createLogger('create-file');
    const loggerSpy = jest.spyOn(logger, 'info');
    await createFile(
      'directory',
      'formatted.unknown',
      "const abc='123'",
      defaultCreateConfig
    );
    expect(loggerSpy).toHaveBeenCalledWith(
      'No prettier-parser configured for file formatted.unknown - skip prettier.'
    );
    expect(
      readFileSync('directory/formatted.unknown', { encoding: 'utf-8' })
    ).toEqual("const abc='123'");
  });
});
