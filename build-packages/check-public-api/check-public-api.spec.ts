import mock from 'mock-fs';
import path from 'path';
import * as core from '@actions/core';
import {
  checkBarrelRecursive,
  checkIndexFileExists,
  exportAllInBarrel,
  parseBarrelFile,
  parseIndexFile,
  parseExportedObjectsInFile,
  regexExportedIndex,
  typeDescriptorPaths
} from './index';

describe('check-public-api', () => {
  let errorSpy: any;

  beforeEach(() => {
    errorSpy = jest.spyOn(core, 'error').mockImplementation();
  });
  afterEach(() => {
    errorSpy.mockRestore();
    mock.restore();
  });

  describe('exportAllInBarrel', () => {
    it('checkIndexFileExists fails if index file is not in root', () => {
      mock({
        root: {
          dir1: {
            'index.ts': ''
          }
        }
      });
      checkIndexFileExists('root/index.ts');
      expect(errorSpy).toHaveBeenCalledWith('No index.ts file found in root.');
    });

    it('fails if internal.ts is not present in root', async () => {
      mock({
        src: {
          file1: '',
          dir2: {
            file2: ''
          }
        }
      });
      await exportAllInBarrel('src', 'internal.ts');
      expect(errorSpy).toHaveBeenCalledWith(
        "No 'internal.ts' file found in 'src'."
      );
    });

    it('fails if a file is not exported in barrel file', async () => {
      mock({
        dir1: {
          file1: '',
          'index.ts': "export * from './file1';",
          dir2: {
            file2: '',
            file3: '',
            'index.ts': "export * from './file2';export * from './file3';"
          }
        }
      });

      await exportAllInBarrel('dir1', 'index.ts');

      expect(errorSpy).toHaveBeenCalledWith(
        `'dir2' is not exported in '${path.normalize('dir1/index.ts')}'.`
      );
      expect(errorSpy).toHaveBeenCalledWith("'index.ts' is not in sync.");
    });

    it('checkBarrelRecursive passes recursive check for barrel file exports', async () => {
      mock({
        dir1: {
          file1: '',
          'index.ts': "export * from './file1'; export * from './dir2';",
          dir2: {
            file2: '',
            file3: '',
            'index.ts': "export * from './file2';export * from './file3';"
          }
        }
      });
      await checkBarrelRecursive('dir1');
    });

    it('typeDescriptorPaths finds the .d.ts files and excludes index.d.ts', async () => {
      mock({
        dir1: {
          'file1.d.ts': '',
          'index.d.ts': '',
          dir2: {
            'file2.d.ts': '',
            'file3.d.ts': '',
            'index.d.ts': ''
          }
        }
      });

      expect(await typeDescriptorPaths('dir1')).toEqual([
        path.normalize('dir1/file1.d.ts'),
        path.normalize('dir1/dir2/file3.d.ts'),
        path.normalize('dir1/dir2/file2.d.ts')
      ]);
    });
  });

  describe('parseExportedObjectsInFile', () => {
    it('parses one .d.ts file', () => {
      const exportedType = parseExportedObjectsInFile(dummyTypeDefinition);
      expect(exportedType.map(e => e.name).sort()).toEqual([
        'CacheEntry',
        'IsolationStrategy',
        'MyType',
        'parseExportedObjectsInFile',
        'responseDataAccessor'
      ]);
    });

    it('parses one .d.ts file without content', () => {
      const exportedType = parseExportedObjectsInFile('some non matching');
      expect(exportedType).toEqual([]);
    });
  });

  describe('parseBarrelFile', () => {
    it('parses barrel file', () => {
      const exportedObjects = parseBarrelFile(
        dummyIndexFile,
        regexExportedIndex
      );
      expect(exportedObjects).toEqual([
        'o1',
        'o2',
        'o3',
        'o4',
        'o5',
        'o6',
        'o7'
      ]);
    });

    it('parses barrel file without matching', () => {
      const exportedObjects = parseBarrelFile(
        'some non matching',
        regexExportedIndex
      );
      expect(exportedObjects).toEqual([]);
    });
  });

  describe('parseIndexFile', () => {
    it('parses referenced star imports', async () => {
      mock({
        'index.ts': "export * from './common';export * from './subdir/ref';",
        'common.ts':
          "export { commonExport } from './local';export * from './crossref';",
        'crossref.ts': "export { crossRefExport } from './local';",
        subdir: {
          'ref.ts': "export { subdirRefExport } from './local';"
        }
      });

      await expect(parseIndexFile('index.ts', true)).resolves.toEqual([
        'commonExport',
        'crossRefExport',
        'subdirRefExport'
      ]);
    });

    it('parses exports types correctly', async () => {
      mock({
        'index.ts':
          "export * from './common';export type { namedExport } from './named';",
        'common.ts': "export type { commonExport } from './local'",
        'named.ts': "export type { namedExport } from './local'"
      });

      const result = await parseIndexFile('index.ts', true);
      expect(result).toEqual(['namedExport', 'commonExport']);
    });

    it('ignores public re-exports', async () => {
      mock({
        'index.ts':
          "export { ignoreme } from '@other/package';export { local } from './local';"
      });

      await expect(parseIndexFile('index.ts', true)).resolves.toEqual([
        'local'
      ]);
    });

    it('throws an error on internal re-exports', async () => {
      mock({
        'index.ts':
          "export { internal } from '@other/package/internal';export { local } from './local';"
      });

      await parseIndexFile('index.ts', true);
      expect(errorSpy).toHaveBeenCalledWith(
        "Re-exporting internal modules is not allowed. 'internal' exported in 'index.ts'."
      );
    });
  });
});

const dummyTypeDefinition = `
/**
 * @hidden
 */
export interface CacheEntry<T> {
    expires?: moment.Moment;
    entry: T;
}

/**
 * Enumerator that selects the isolation type of destination in cache.
 */
export declare enum IsolationStrategy {
    Tenant = "Tenant",
    User = "User",
    Tenant_User = "TenantUser",
    No_Isolation = "NoIsolation"
}

export declare function parseExportedObjectsInFile(path: string): Promise<string[]>;
export declare const responseDataAccessor: ResponseDataAccessor;

export declare type MyType = {value:string}
`;

const dummyIndexFile = `export { o1 } from './bla';
    
    export { o2, o3 } from './bla';
    export { o4, 
    
    o5,o6,
     o7} from './bla';
`;
