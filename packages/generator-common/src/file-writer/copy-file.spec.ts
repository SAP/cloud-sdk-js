jest.mock('fs', () => jest.requireActual('memfs').fs);
jest.mock('fs/promises', () => jest.requireActual('memfs').fs.promises);
jest.mock('node:fs', () => jest.requireActual('memfs').fs);
jest.mock('node:fs/promises', () => jest.requireActual('memfs').fs.promises);

import * as fs from 'fs';
import { jest } from '@jest/globals';
import { vol } from 'memfs';
import { copyFile } from './copy-file';

describe('copyFile', () => {
  beforeEach(() => vol.reset());
  afterEach(() => vol.reset());

  it('should copy file', async () => {
    const newContent = 'new';
    vol.fromNestedJSON(
      { dest: { 'some.ts': '' }, src: { changelog: newContent } },
      process.cwd()
    );
    await copyFile('src/changelog', 'dest/changelog');
    const actual = await fs.promises.readFile('dest/changelog', {
      encoding: 'utf-8'
    });
    expect(actual).toBe(newContent);
  });

  it('should overwrite when overwrite is set', async () => {
    const newContent = 'new';
    vol.fromNestedJSON(
      {
        dest: { 'some.ts': '', changelog: 'old' },
        src: { changelog: newContent }
      },
      process.cwd()
    );
    await copyFile('src/changelog', 'dest/changelog', true);
    const actual = await fs.promises.readFile('dest/changelog', {
      encoding: 'utf-8'
    });
    expect(actual).toBe(newContent);
  });

  it('should not overwrite when overwrite is not set', async () => {
    const oldContent = 'old';
    vol.fromNestedJSON(
      {
        dest: { 'some.ts': '', changelog: oldContent },
        src: { changelog: 'new' }
      },
      process.cwd()
    );
    await copyFile('src/changelog', 'dest/changelog');
    const actual = await fs.promises.readFile('dest/changelog', {
      encoding: 'utf-8'
    });
    expect(actual).toBe(oldContent);
  });
});
