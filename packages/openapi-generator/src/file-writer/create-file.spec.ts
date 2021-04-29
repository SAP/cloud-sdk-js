import { promises } from 'fs';
import mock from 'mock-fs';
import { createFile } from './create-file';
const { readFile } = promises;

describe('createFile', () => {
  beforeEach(() => {
    mock({
      directory: {
        existingFile: 'already exists'
      }
    });
  });

  afterEach(() => {
    mock.restore();
  });

  it('creates content ending with new line', async () => {
    await createFile('directory', 'filename', 'content', true);
    expect(await readFile('directory/filename', 'utf8')).toMatchInlineSnapshot(`
      "/*
       * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
       *
       * This is a generated file powered by the SAP Cloud SDK for JavaScript.
       */
      content
      "
    `);
  });

  it('creates content without copyright', async () => {
    await createFile('directory', 'filename', 'content', true, false);
    expect(await readFile('directory/filename', 'utf8')).toEqual('content');
  });

  it('throws an error if overwriting is disabled', async () => {
    await expect(() =>
      createFile('directory', 'existingFile', 'content', false)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Could not write file. File already exists. If you want to allow overwriting files, enable the `overwrite` flag."'
    );
  });
});
