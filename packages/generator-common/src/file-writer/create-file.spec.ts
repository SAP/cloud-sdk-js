import { promises, readFileSync } from 'fs';
import { join, resolve } from 'path';
import mock from 'mock-fs';
import prettier from 'prettier';
import { createLogger, unixEOL } from '@sap-cloud-sdk/util';
import {
  clearPrettierConfigCache,
  createFile,
  defaultPrettierConfig
} from './create-file';

const { readFile } = promises;

describe('createFile', () => {
  const pathRootNodeModules = resolve(__dirname, '../../../../node_modules');

  beforeEach(() => {
    mock({
      [pathRootNodeModules]: mock.load(pathRootNodeModules),
      [resolve(process.cwd(), 'some-dir', '.prettierrc')]: JSON.stringify({
        semi: false
      }),
      directory: {
        existingFile: 'already exists'
      }
    });
  });

  afterEach(() => {
    clearPrettierConfigCache();
    mock.restore();
  });

  it('creates content ending with new line', async () => {
    await createFile('directory', 'filename', 'content', { overwrite: true });
    expect(await readFile('directory/filename', 'utf8')).toMatchInlineSnapshot(`
      "/*
       * Copyright (c) ${new Date().getFullYear()} SAP SE or an SAP affiliate company. All rights reserved.
       *
       * This is a generated file powered by the SAP Cloud SDK for JavaScript.
       */
      content;
      "
    `);
  });

  it('creates content without copyright', async () => {
    await createFile('directory', 'filename', 'content', {
      overwrite: true,
      withCopyright: false
    });
    expect(await readFile('directory/filename', 'utf8')).toEqual(
      `content;${unixEOL}`
    );
  });

  it('throws an error if overwriting is disabled', async () => {
    await expect(() =>
      createFile('directory', 'existingFile', 'content', { overwrite: false })
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Could not write file \\"existingFile\\". File already exists. If you want to allow overwriting files, enable the `overwrite` flag."'
    );
  });

  it('uses prettier per default', async () => {
    const spy = jest.spyOn(prettier, 'format');
    await createFile('directory', 'formatted.ts', "const abc='123'", {
      withCopyright: false
    });
    expect(
      readFileSync('directory/formatted.ts', { encoding: 'utf-8' })
    ).toEqual(`const abc = '123';${unixEOL}`);
    expect(spy).toHaveBeenCalledWith(expect.any(String), defaultPrettierConfig);
  });

  it('uses custom prettier config', async () => {
    await createFile('directory', 'formatted.ts', "const abc='123'", {
      prettierConfigPath: join('some-dir/.prettierrc'),
      withCopyright: false
    });
    expect(
      readFileSync('directory/formatted.ts', { encoding: 'utf-8' })
    ).toEqual(`const abc = "123"${unixEOL}`);
  });

  it('uses default config if custom prettier config is not found', async () => {
    const logger = createLogger('create-file');
    const spy = jest.spyOn(prettier, 'format');
    const loggerSpy = jest.spyOn(logger, 'warn');
    await createFile('directory', 'formatted.ts', "const abc='123'", {
      prettierConfigPath: join('not-existing/.prettierrc'),
      withCopyright: false
    });
    expect(loggerSpy).toHaveBeenCalledWith(
      expect.stringMatching(
        'Prettier config file not found: .*not-existing/.prettierrc - default is used.'
      )
    );
    expect(spy).toHaveBeenCalledWith(expect.any(String), defaultPrettierConfig);
  });
});
