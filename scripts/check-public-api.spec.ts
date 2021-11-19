import { resolve } from 'path';
import mock from 'mock-fs';
import {
  checkSingleIndexFile,
  indexFiles,
  parseBarrelFile,
  parseTypeDefinitionFile,
  regexExportedIndex,
  typeDescriptorPaths
} from './check-public-api';

describe('check-public-api', () => {
  it('finds all index.ts', async () => {
    mock({
      root: {
        'index.ts': '',
        folder1: {
          file1: '',
          folder2: {
            file2: '',
            'index.ts': ''
          }
        }
      }
    });
    expect(indexFiles('root', '**/index.ts')).toEqual([
      'root/folder1/folder2/index.ts',
      'root/index.ts'
    ]);
    mock.restore();
  });

  it('fails if index file is not in root', () => {
    mock({
      root: {
        folder1: {
          'index.ts': ''
        }
      }
    });
    expect(() => checkSingleIndexFile('root')).toThrowError(
      'No index.ts file found in root'
    );
    mock.restore();
  });

  it('passes if index file is present in root', () => {
    mock({
      root: {
        'index.ts': '',
        folder1: {
          otherFile: '',
          'index.ts': '',
          folder2: {
            otherFile: ''
          }
        }
      }
    });
    checkSingleIndexFile('root');
    mock.restore();
  });

  it('finds the .d.ts files and excludes index.d.ts', () => {
    expect(
      typeDescriptorPaths(resolve(__dirname, '../dist')).length
    ).toBeGreaterThan(0);
    expect(
      typeDescriptorPaths(resolve(__dirname, '../dist')).find(path =>
        path.includes('index.d.ts')
      )
    ).toBeUndefined();
  });

  it('parses one .d.ts file', () => {
    const exportedType = parseTypeDefinitionFile(dummyTypeDefinition);
    expect(exportedType.map(e => e.name).sort()).toEqual([
      'CacheEntry',
      'IsolationStrategy',
      'parseTypeDefinitionFile',
      'responseDataAccessor'
    ]);
  });

  it('parses one .d.ts file without content', () => {
    const exportedType = parseTypeDefinitionFile('some non matching');
    expect(exportedType).toEqual([]);
  });

  it('parses one index.ts file', () => {
    const exportedObjects = parseBarrelFile(dummyIndexFile, regexExportedIndex);
    expect(exportedObjects).toEqual(['o1', 'o2', 'o3', 'o4', 'o5', 'o6', 'o7']);
  });

  it('parses one index.ts file witout matching', () => {
    const exportedObjects = parseBarrelFile(
      'some non matching',
      regexExportedIndex
    );
    expect(exportedObjects).toEqual([]);
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

export declare function parseTypeDefinitionFile(path: string): Promise<string[]>;
export declare const responseDataAccessor: ResponseDataAccessor;

`;

const dummyIndexFile = `export { o1 } from './bla';
    
    export { o2, o3 } from './bla';
    export { o4, 
    
    o5,o6,
     o7} from './bla';
`;
