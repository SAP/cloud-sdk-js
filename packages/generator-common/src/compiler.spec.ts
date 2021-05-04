import { promises } from 'fs';
import { resolve } from 'path';
import mock from 'mock-fs';
import {
  CompilerOptions,
  ModuleKind,
  ModuleResolutionKind,
  ScriptTarget
} from 'typescript';
import { readCompilerOptions, transpileDirectory } from './compiler';

describe('compiler options', () => {
  beforeAll(() => {
    mock({
      'config1/tsconfig.json': JSON.stringify({
        compilerOptions: { moduleResolution: 'node' }
      }),
      'config2/tsconfig.json': JSON.stringify({
        compilerOptions: { moduleResolution: 'classic' }
      }),
      'config3/tsconfig.json': JSON.stringify({
        compilerOptions: { lib: ['es5'] }
      })
    });
  });

  afterAll(() => {
    mock.restore();
  });

  it('reads the compiler options with file path', async () => {
    await expect(
      readCompilerOptions('config1/tsconfig.json')
    ).resolves.toBeDefined();
  });

  it('reads the compiler options with folder path', async () => {
    await expect(readCompilerOptions('config1')).resolves.toBeDefined();
  });

  it('parses the module resolution enum', async () => {
    await expect(readCompilerOptions('config1')).resolves.toEqual({
      moduleResolution: ModuleResolutionKind.NodeJs
    });
    await expect(readCompilerOptions('config2')).resolves.toEqual({
      moduleResolution: ModuleResolutionKind.Classic
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
      'test-src/file.ts': "export type someOtherType = 'A' | 'B'",
      'test-src/index.ts': "export * from './file'",
      'test-src/subfolder/file.ts': "export type someType = 'A' | 'B'",
      'test-src/subfolder/index.ts': "export * from './file'",
      'broken-src/file.ts': 'const foo = 123; foo = 456;',
      [rootNodeModules]: mock.load(rootNodeModules),
      [packageNodeModules]: mock.load(packageNodeModules)
    });
  });
  const compilerConfig: CompilerOptions = {
    outDir: 'test-dist',
    target: ScriptTarget.ES5,
    declaration: true,
    declarationMap: true,
    sourceMap: true,
    moduleResolution: ModuleResolutionKind.NodeJs,
    module: ModuleKind.CommonJS,
    lib: ['lib.esnext.d.ts']
  };

  afterAll(() => {
    mock.restore();
  });

  it('compiles all files', async () => {
    await transpileDirectory('test-src', compilerConfig);
    const files = await promises.readdir('test-dist');
    expect(files).toIncludeAnyMembers([
      'file.js',
      'file.d.ts',
      'file.d.ts.map'
    ]);
    const filesSubfolder = await promises.readdir('test-dist/subfolder');
    expect(filesSubfolder).toIncludeAnyMembers([
      'file.js',
      'file.d.ts',
      'file.d.ts.map'
    ]);
  });

  it('throws on broken source file', async () => {
    await expect(
      transpileDirectory('broken-src', compilerConfig)
    ).rejects.toThrowError(
      "broken-src/file.ts:17:3 - error TS2588: Cannot assign to 'foo' because it is a constant."
    );
  });
});
