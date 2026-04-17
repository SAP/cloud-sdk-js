import { createFsFromVolume, vol } from 'memfs';
import { Union, type IFS, type IUnionFs } from 'unionfs';
import type * as fs from 'fs';
import type { jest } from '@jest/globals';

/**
 * Creates an overlay filesystem: memfs on top of the real fs.
 *
 * - Reads: unionfs tries memfs first, falls back to the real filesystem.
 * - Writes: routed directly to memfs (the overlay layer).
 * - copyFile: bridges layers — reads source via unionfs, writes to memfs.
 *
 * Usage in spec files:
 *
 *   import { mockFsFactory } from '@sap-cloud-sdk/test-util';
 *   const mockFs = () => mockFsFactory(jest.requireActual('fs'));
 *   jest.mock('fs', () => mockFs());
 *   jest.mock('fs/promises', () => mockFs().promises);
 *   jest.mock('node:fs', () => mockFs());
 *   jest.mock('node:fs/promises', () => mockFs().promises);
 * @param realFs The real fs module to use as the base layer.
 * @returns A unionfs instance that combines memfs and the real fs.
 * @internal
 */
export function mockFsFactory(realFs: typeof fs): IUnionFs {
  const memfs = createFsFromVolume(vol) as unknown as IFS;

  // unionfs handles reads: memfs (high priority) → realFs (fallback)
  const ufs = new Union();
  ufs.use(realFs);
  ufs.use(memfs);

  // All writes go directly to memfs — bypasses unionfs fallthrough
  // which swallows intentional errors like EEXIST from flag:'wx'.
  for (const m of [
    'writeFileSync',
    'mkdirSync',
    'appendFileSync',
    'rmdirSync',
    'unlinkSync',
    'renameSync'
  ] as const) {
    if (memfs[m]) {
      (ufs as any)[m] = memfs[m].bind(memfs);
    }
  }
  for (const m of [
    'writeFile',
    'mkdir',
    'appendFile',
    'rmdir',
    'unlink',
    'rename'
  ] as const) {
    if (memfs.promises[m]) {
      (ufs as any).promises[m] = memfs.promises[m].bind(memfs.promises);
    }
  }

  // Fix unionfs statSync: with { throwIfNoEntry: false }, memfs returns
  // undefined instead of throwing, so unionfs stops instead of falling through.
  (ufs as any).statSync = (p: string, options?: any) => {
    try {
      const result = memfs.statSync(p, options);
      if (result) {
        return result;
      }
    } catch {
      // Ignore and fall back to real fs
    }
    return realFs.statSync(p, options);
  };
  (ufs as any).lstatSync = (p: string, options?: any) => {
    try {
      const result = memfs.lstatSync(p, options);
      if (result) {
        return result;
      }
    } catch {
      // Ignore and fall back to real fs
    }
    return realFs.lstatSync(p, options);
  };

  // Bridge copyFile: read from union (finds file on either layer),
  // write to memfs
  (ufs as any).copyFileSync = (src: string, dest: string) => {
    memfs.writeFileSync(dest, (ufs as any).readFileSync(src));
  };
  (ufs as any).promises.copyFile = async (src: string, dest: string) => {
    await memfs.promises.writeFile(
      dest,
      await (ufs as any).promises.readFile(src)
    );
  };

  return ufs;
}

/**
 * Mock all `fs` module variants with pure memfs using `jest.unstable_mockModule` (ESM).
 * Must be called before any dynamic `import()` of modules that use `fs`.
 * @param j - The jest object
 * @internal
 */
export function mockFsWithMemfs(j: typeof jest): void {
  j.unstable_mockModule('fs', () => import('memfs').then(m => m.fs));
  j.unstable_mockModule('fs/promises', () =>
    import('memfs').then(m => m.fs.promises)
  );
  j.unstable_mockModule('node:fs', () => import('memfs').then(m => m.fs));
  j.unstable_mockModule('node:fs/promises', () =>
    import('memfs').then(m => m.fs.promises)
  );
}
