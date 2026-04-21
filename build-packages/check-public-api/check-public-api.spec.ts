import path from 'path';
import { describe, jest, beforeEach } from '@jest/globals';
import { vol } from 'memfs';

jest.unstable_mockModule('fs', () =>
  import('memfs').then(m => ({
    ...m.fs,
    default: m.fs
  }))
);
jest.unstable_mockModule('fs/promises', () =>
  import('memfs').then(m => ({
    ...m.fs.promises,
    default: m.fs.promises
  }))
);
jest.unstable_mockModule('node:fs', () =>
  import('memfs').then(m => ({
    ...m.fs,
    default: m.fs
  }))
);
jest.unstable_mockModule('node:fs/promises', () =>
  import('memfs').then(m => ({
    ...m.fs.promises,
    default: m.fs.promises
  }))
);

const actionsCoreMock = {
  error: jest.fn(),
  info: jest.fn(),
  warning: jest.fn(),
  getInput: jest.fn(),
  setFailed: jest.fn()
};

jest.unstable_mockModule('@actions/core', () => actionsCoreMock);

const {
  checkBarrelRecursive,
  checkIndexFileExists,
  exportAllInBarrel,
  parseBarrelFile,
  parseIndexFile,
  parseExportedObjectsInFile,
  regexExportedIndex,
  typeDescriptorPaths
  // eslint-disable-next-line import/no-useless-path-segments
} = await import('./index.js');

describe('check-public-api', () => {
  beforeEach(() => {
    actionsCoreMock.error.mockReset();
    vol.reset();
  });

  describe('exportAllInBarrel', () => {
    it('checkIndexFileExists fails if index fi  le is not in root', async () => {
      vol.fromNestedJSON(
        {
          root: {
            dir1: {
              'index.ts': ''
            }
          }
        },
        process.cwd()
      );
      await checkIndexFileExists('root/index.ts');
      expect(actionsCoreMock.error).toHaveBeenCalledWith(
        'No index.ts file found in root.'
      );
    });

    it('fails if internal.ts is not present in root', async () => {
      vol.fromNestedJSON(
        {
          src: {
            file1: '',
            dir2: {
              file2: ''
            }
          }
        },
        process.cwd()
      );
      await exportAllInBarrel('src', 'internal.ts');
      expect(actionsCoreMock.error).toHaveBeenCalledWith(
        "No 'internal.ts' file found in 'src'."
      );
    });

    it('fails if a file is not exported in barrel file', async () => {
      vol.fromNestedJSON(
        {
          dir1: {
            file1: '',
            'index.ts': "export * from './file1';",
            dir2: {
              file2: '',
              file3: '',
              'index.ts': "export * from './file2';export * from './file3';"
            }
          }
        },
        process.cwd()
      );

      await exportAllInBarrel('dir1', 'index.ts');

      expect(actionsCoreMock.error).toHaveBeenCalledWith(
        `'dir2' is not exported in '${path.normalize('dir1/index.ts')}'.`
      );
      expect(actionsCoreMock.error).toHaveBeenCalledWith(
        "'index.ts' is not in sync."
      );
    });

    it('checkBarrelRecursive passes recursive check for barrel file exports', async () => {
      vol.fromNestedJSON(
        {
          dir1: {
            file1: '',
            'index.ts': "export * from './file1'; export * from './dir2';",
            dir2: {
              file2: '',
              file3: '',
              'index.ts': "export * from './file2';export * from './file3';"
            }
          }
        },
        process.cwd()
      );
      await checkBarrelRecursive('dir1');
    });

    it('typeDescriptorPaths finds the .d.ts files and excludes index.d.ts', async () => {
      vol.fromNestedJSON(
        {
          dir1: {
            'file1.d.ts': '',
            'index.d.ts': '',
            dir2: {
              'file2.d.ts': '',
              'file3.d.ts': '',
              'index.d.ts': ''
            }
          }
        },
        process.cwd()
      );

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
      vol.fromNestedJSON(
        {
          'index.ts': "export * from './common';export * from './subdir/ref';",
          'common.ts':
            "export { commonExport } from './local';export * from './crossref';",
          'crossref.ts': "export { crossRefExport } from './local';",
          subdir: {
            'ref.ts': "export { subdirRefExport } from './local';"
          }
        },
        process.cwd()
      );

      await expect(parseIndexFile('index.ts', true)).resolves.toEqual([
        'commonExport',
        'crossRefExport',
        'subdirRefExport'
      ]);
    });

    it('parses exports types correctly', async () => {
      vol.fromNestedJSON(
        {
          'index.ts':
            "export * from './common';export type { namedExport } from './named';",
          'common.ts': "export type { commonExport } from './local'",
          'named.ts': "export type { namedExport } from './local'"
        },
        process.cwd()
      );

      const result = await parseIndexFile('index.ts', true);
      expect(result).toEqual(['namedExport', 'commonExport']);
    });

    it('ignores public re-exports', async () => {
      vol.fromNestedJSON(
        {
          'index.ts':
            "export { ignoreme } from '@other/package';export { local } from './local';"
        },
        process.cwd()
      );

      await expect(parseIndexFile('index.ts', true)).resolves.toEqual([
        'local'
      ]);
    });

    it('throws an error on internal re-exports', async () => {
      vol.fromNestedJSON(
        {
          'index.ts':
            "export { internal } from '@other/package/internal';export { local } from './local';"
        },
        process.cwd()
      );

      await parseIndexFile('index.ts', true);
      expect(actionsCoreMock.error).toHaveBeenCalledWith(
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

    export { o2,  o3 as o3$Some_thing   } from './bla';  // :-) This is a comment
    export { o4     as  o4Something,
    /****
      * * This is a block comment **??? *
      * **/
    o5,o6,
     o7} from './bla';
`;
