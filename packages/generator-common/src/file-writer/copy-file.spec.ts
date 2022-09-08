import * as fs from 'fs';
import mock from 'mock-fs';
import { copyFile } from './copy-file';

describe('copyFile', () => {
  afterEach(() => mock.restore());

  it('should copy file', async () => {
    const newContent = 'new';
    mock({
      dest: {
        'some.ts': ''
      },
      src: {
        changelog: newContent
      }
    });
    await copyFile('src/changelog', 'dest/changelog');
    const actual = await fs.promises.readFile('dest/changelog', {
      encoding: 'utf-8'
    });
    expect(actual).toBe(newContent);
  });

  it('should overwrite when overwrite is set', async () => {
    const newContent = 'new';
    mock({
      dest: {
        'some.ts': '',
        changelog: 'old'
      },
      src: {
        changelog: newContent
      }
    });
    await copyFile('src/changelog', 'dest/changelog', true);
    const actual = await fs.promises.readFile('dest/changelog', {
      encoding: 'utf-8'
    });
    expect(actual).toBe(newContent);
  });

  it('should not overwrite when overwrite is not set', async () => {
    const oldContent = 'old';
    mock({
      dest: {
        'some.ts': '',
        changelog: oldContent
      },
      src: {
        changelog: 'new'
      }
    });
    await copyFile('src/changelog', 'dest/changelog');
    const actual = await fs.promises.readFile('dest/changelog', {
      encoding: 'utf-8'
    });
    expect(actual).toBe(oldContent);
  });
});
