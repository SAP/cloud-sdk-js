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

describe('compiler options', () => {
  const pathRootNodeModules = resolve(__dirname, '../../../node_modules');
  beforeAll(() => {
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
        compilerOptions: { target: 'es2016' }
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

  afterAll(() => {
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
      target: ScriptTarget.ES2016
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
  beforeAll(async () => {
    const rootNodeModules = resolve(__dirname, '../../../node_modules');
    const packageNodeModules = resolve(__dirname, '../node_modules');
    mock({
      'test-src/file-1.ts': "export type someOtherType = 'A' | 'B'",
      'test-src/index.ts': "export * from './file-1'",
      'test-src/sub-folder/file-2.ts': "export type someType = 'A' | 'B'",
      'test-src/test-file.spec.ts': 'This should be excluded per default',
      'test-src/sub-folder/index.ts': "export * from './file-2'",
      'broken-src/file.ts': `const foo = 1;${EOL}const bar = 1;${EOL}   foo = 2;`,
      [rootNodeModules]: mock.load(rootNodeModules),
      [packageNodeModules]: mock.load(packageNodeModules)
    });
  });
  function compilerConfig(outFolder): CompilerOptions {
    return {
      outDir: outFolder,
      target: ScriptTarget.ES5,
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
    await transpileDirectory('test-src', compilerConfig('test-dist'));
    const files = await promises.readdir('test-dist');
    expect(files.includes('test-file.spec.js')).toBe(false);
    expect(files).toIncludeAnyMembers([
      'file-1.js',
      'file-1.d.ts',
      'file-1.d.ts.map'
    ]);
    const filesSubfolder = await promises.readdir('test-dist/sub-folder');
    expect(filesSubfolder).toIncludeAnyMembers([
      'file-2.js',
      'file-2.d.ts',
      'file-2.d.ts.map'
    ]);
  });

  it('considers includes correctly', async () => {
    await transpileDirectory('test-src', compilerConfig('test-dist-1'), {
      include: ['file-1.ts', '**/file-2.ts'],
      exclude: []
    });
    const files = new GlobSync('**/*.js', {
      cwd: 'test-dist-1'
    }).found;
    expect(files).toIncludeSameMembers(['file-1.js', 'sub-folder/file-2.js']);
  });

  it('considers exclude correctly', async () => {
    await transpileDirectory('test-src', compilerConfig('test-dist-2'), {
      include: ['**/*.ts'],
      exclude: ['**/index.ts', 'test-file.spec.ts']
    });
    const files = new GlobSync('**/*.js', {
      cwd: 'test-dist-2'
    }).found;
    expect(files).toIncludeSameMembers(['file-1.js', 'sub-folder/file-2.js']);
  });

  it('throws error with file information on broken source file', async () => {
    await expect(
      transpileDirectory('broken-src', compilerConfig('broken-dist'))
    ).rejects.toThrowError(
      "broken-src/file.ts:3:4 - error TS2588: Cannot assign to 'foo' because it is a constant"
    );
  });

  it('throws error general information on broken module', async () => {
    await expect(
      transpileDirectory('test-src', {
        ...compilerConfig,
        lib: ['non-existing-lib']
      })
    ).rejects.toThrowError(
      /error TS6231: Could not resolve the path .* with the extensions: '\.ts', '\.tsx', '\.d\.ts'\./
    );
  });
});
