import { promises } from 'fs';
import { resolve } from 'path';
import { EOL } from 'os';
import mock from 'mock-fs';
import {
  CompilerOptions,
  ModuleKind,
  ModuleResolutionKind,
  ScriptTarget
} from 'typescript';
import { GlobSync } from 'glob';
import {
  readCompilerOptions,
  readIncludeExcludeWithDefaults,
  transpileDirectory
} from './compiler';
import { CreateFileOptions, defaultPrettierConfig } from './file-writer';

const { readFile, readdir } = promises;

describe('compiler options', () => {
  const pathRootNodeModules = resolve(__dirname, '../../../node_modules');
  beforeEach(() => {
    mock({
      [pathRootNodeModules]: mock.load(pathRootNodeModules),
      'config1/tsconfig.json': JSON.stringify({
        compilerOptions: { moduleResolution: 'node' }
      }),
      'config2/tsconfig.json': JSON.stringify({
        compilerOptions: { moduleResolution: 'classic' }
      }),
      'config3/tsconfig.json': JSON.stringify({
        compilerOptions: { lib: ['es5'] }
      }),
      'config4/tsconfig.json': JSON.stringify({
        compilerOptions: { target: 'es2019' }
      }),
      'config5/tsconfig.json': JSON.stringify({
        compilerOptions: { module: 'AMD' }
      }),
      'config6/tsconfig.json': JSON.stringify({
        exclude: ['def'],
        include: ['abc']
      })
    });
  });

  afterEach(() => {
    mock.restore();
  });

  it('reads the include and exclude with defaults', async () => {
    await expect(
      readIncludeExcludeWithDefaults('config1/tsconfig.json')
    ).resolves.toEqual({
      include: ['**/*.ts'],
      exclude: ['dist/**/*', '**/*.d.ts', '**/*.spec.ts', 'node_modules/**/*']
    });
  });

  it('reads the include and exclude from file', async () => {
    await expect(
      readIncludeExcludeWithDefaults('config6/tsconfig.json')
    ).resolves.toEqual({
      include: ['abc'],
      exclude: ['def']
    });
  });

  it('reads the compiler options with file path', async () => {
    await expect(
      readCompilerOptions('config1/tsconfig.json')
    ).resolves.toBeDefined();
  });

  it('reads the compiler options with folder path', async () => {
    await expect(readCompilerOptions('config1')).resolves.toBeDefined();
  });

  it('parses the module resolution kind', async () => {
    await expect(readCompilerOptions('config1')).resolves.toEqual({
      moduleResolution: ModuleResolutionKind.NodeJs
    });
    await expect(readCompilerOptions('config2')).resolves.toEqual({
      moduleResolution: ModuleResolutionKind.Classic
    });
  });

  it('parses the module script target', async () => {
    await expect(readCompilerOptions('config4')).resolves.toEqual({
      target: ScriptTarget.ES2019
    });
  });

  it('parses the module kind', async () => {
    await expect(readCompilerOptions('config5')).resolves.toEqual({
      module: ModuleKind.AMD
    });
  });

  it('add prefix to the libs', async () => {
    await expect(readCompilerOptions('config3')).resolves.toEqual({
      lib: ['lib.es5.d.ts']
    });
  });
});

describe('compilation', () => {
  const createFileOptions: CreateFileOptions = {
    overwrite: true,
    prettierOptions: defaultPrettierConfig
  };

  beforeAll(async () => {
    const rootNodeModules = resolve(__dirname, '../../../node_modules');
    const packageNodeModules = resolve(__dirname, '../node_modules');
    mock({
      'test-src/file-1.ts': "export type someOtherType='A'|'B'",
      'test-src/index.ts': "export * from './file-1'",
      'test-src/sub-folder/file-2.ts': "export type someType= 'A' | 'B'",
      'test-src/test-file.spec.ts': 'This should be excluded per default',
      'test-src/sub-folder/index.ts': "export * from './file-2'",
      'broken-src/file.ts': `const foo = 1;${EOL}const bar = 1;${EOL}   foo = 2;`,
      [rootNodeModules]: mock.load(rootNodeModules),
      [packageNodeModules]: mock.load(packageNodeModules)
    });
    await transpileDirectory('test-src', {
      compilerOptions: compilerConfig('test-dist'),
      createFileOptions
    });
  });

  function compilerConfig(outFolder): CompilerOptions {
    return {
      outDir: outFolder,
      target: ScriptTarget.ES2019,
      declaration: true,
      declarationMap: true,
      sourceMap: true,
      moduleResolution: ModuleResolutionKind.NodeJs,
      module: ModuleKind.CommonJS,
      lib: ['lib.esnext.d.ts']
    };
  }

  afterAll(() => {
    mock.restore();
  });

  it('compiles all files', async () => {
    const files = await readdir('test-dist');
    expect(files.includes('test-file.spec.js')).toBe(false);
    expect(files).toEqual([
      'file-1.d.ts',
      'file-1.d.ts.map',
      'file-1.js',
      'file-1.js.map',
      'index.d.ts',
      'index.d.ts.map',
      'index.js',
      'index.js.map',
      'sub-folder'
    ]);
    const filesSubfolder = await readdir('test-dist/sub-folder');
    expect(filesSubfolder).toEqual([
      'file-2.d.ts',
      'file-2.d.ts.map',
      'file-2.js',
      'file-2.js.map',
      'index.d.ts',
      'index.d.ts.map',
      'index.js',
      'index.js.map'
    ]);
  });

  it('does NOT run prettier on emitted .js files to keep source maps intact', async () => {
    await expect(
      readFile('test-dist/file-1.js', { encoding: 'utf-8' })
    ).resolves.toContain('"'); // double quotes get await with prettier
  });

  it('does NOT runs prettier on emitted .map files to keep them minimal', async () => {
    await expect(
      readFile('test-dist/file-1.js.map', { encoding: 'utf-8' })
    ).resolves.toContain('"version":3,'); // no spacing after
    await expect(
      readFile('test-dist/file-1.d.ts.map', { encoding: 'utf-8' })
    ).resolves.toContain('"version":3,'); // no spacing after
  });

  it('runs prettier on emitted .d.ts files', async () => {
    await expect(
      readFile('test-dist/file-1.d.ts', { encoding: 'utf-8' })
    ).resolves.toContain('someOtherType = '); // spacing after = added by prettier
  });

  it('considers includes correctly', async () => {
    await transpileDirectory(
      'test-src',
      { compilerOptions: compilerConfig('test-dist-1'), createFileOptions },
      {
        include: ['file-1.ts', '**/file-2.ts'],
        exclude: []
      }
    );
    const files = new GlobSync('**/*.js', {
      cwd: 'test-dist-1'
    }).found;
    expect(files).toEqual(['file-1.js', 'sub-folder/file-2.js']);
  });

  it('considers exclude correctly', async () => {
    await transpileDirectory(
      'test-src',
      { compilerOptions: compilerConfig('test-dist-2'), createFileOptions },
      {
        include: ['**/*.ts'],
        exclude: ['**/index.ts', 'test-file.spec.ts']
      }
    );
    const files = new GlobSync('**/*.js', {
      cwd: 'test-dist-2'
    }).found;
    expect(files).toEqual(['file-1.js', 'sub-folder/file-2.js']);
  });

  it('throws error with file information on broken source file', async () => {
    await expect(
      transpileDirectory('broken-src', {
        compilerOptions: compilerConfig('broken-dist'),
        createFileOptions
      })
    ).rejects.toThrowError(
      "error TS2588: Cannot assign to 'foo' because it is a constant"
    );
  });

  it('throws error general information on broken module', async () => {
    const compilerOptions = {
      ...compilerConfig,
      outDir: 'test-non-existing-lib',
      lib: ['non-existing-lib']
    };
    await expect(
      transpileDirectory('test-src', { compilerOptions, createFileOptions })
    ).rejects.toThrowError(
      /error TS6231: Could not resolve the path .* with the extensions: '\.ts', '\.tsx', '\.d\.ts'\.*/
    );
  });
});
