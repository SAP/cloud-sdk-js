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
 * @param realFs The real fs module to use as the base layer.
 * @returns A unionfs instance that combines memfs and the real fs.
 * @internal
 */
function mockFsFactory(realFs: typeof fs): IUnionFs {
  const memfs = createFsFromVolume(vol) as unknown as IFS;

  // unionfs handles reads: memfs (high priority) → realFs (fallback)
  const ufs = new Union();
  ufs.use(realFs);
  ufs.use(memfs);

  overrideWriteOperations(ufs, memfs);

  fixStatSyncFallthrough(ufs, memfs, realFs);

  return ufs;
}

/**
 * Fix unionfs stat sync fallthrough behavior: with { throwIfNoEntry: false },
 * memfs returns undefined instead of throwing, so unionfs stops instead of
 * falling through to the real fs.
 * @param ufs The unionfs instance to override.
 * @param memfs The memfs instance to try first.
 * @param realFs The real fs module to fall back to if memfs doesn't have the file.
 * @internal
 */
function fixStatSyncFallthrough(
  ufs: IUnionFs,
  memfs: IFS,
  realFs: typeof fs
): void {
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
}

/**
 * Route write operations directly to memfs to avoid unionfs fallthrough
 * behavior swallowing intentional errors (e.g. EEXIST with flag: 'wx').
 * @param ufs The unionfs instance to override.
 * @param memfs The memfs instance to route writes to.
 * @internal
 */
function overrideWriteOperations(ufs: IUnionFs, memfs: IFS): void {
  for (const m of [
    'writeFileSync',
    'mkdirSync',
    'appendFileSync',
    'rmdirSync',
    'unlinkSync',
    'renameSync'
  ] as const) {
    if ((memfs as any)[m]) {
      (ufs as any)[m] = (memfs as any)[m].bind(memfs);
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
    if ((memfs as any).promises[m]) {
      (ufs as any).promises[m] = (memfs as any).promises[m].bind(
        (memfs as any).promises
      );
    }
  }

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
}

export function mockFsWithUnionfs(j: typeof jest): void {
  const mockFs = () => mockFsFactory(j.requireActual('fs'));
  j.mock('fs', () => mockFs());
  j.mock('fs/promises', () => mockFs().promises);
  j.mock('node:fs', () => mockFs());
  j.mock('node:fs/promises', () => mockFs().promises);
}

/**
 * Jest helper to mock fs with memfs.
 * @param j The jest object to use for mocking.
 * @internal
 */
export function mockFsWithMemfs(j: typeof jest): void {
  j.mock('fs', () => (j.requireActual('memfs') as any).fs);
  j.mock('fs/promises', () => (j.requireActual('memfs') as any).fs.promises);
  j.mock('node:fs', () => (j.requireActual('memfs') as any).fs);
  j.mock('node:fs/promises', () => (j.requireActual('memfs') as any).fs.promises);
}