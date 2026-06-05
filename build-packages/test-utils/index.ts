import type { jest } from '@jest/globals';

/**
 * Mock all `fs` module variants with pure memfs using `jest.unstable_mockModule` (ESM).
 * Must be called before any dynamic `import()` of modules that use `fs`.
 * @internal
 */
export function mockFsWithMemfs(j: typeof jest): void {
  j.unstable_mockModule('fs', () =>
    import('memfs').then(m => ({
      ...m.fs,
      default: m.fs,
      __esModule: true
    }))
  );
  j.unstable_mockModule('fs/promises', () =>
    import('memfs').then(m => ({
      ...m.fs.promises,
      default: m.fs.promises,
      __esModule: true
    }))
  );
  j.unstable_mockModule('node:fs', () =>
    import('memfs').then(m => ({
      ...m.fs,
      default: m.fs,
      __esModule: true
    }))
  );
  j.unstable_mockModule('node:fs/promises', () =>
    import('memfs').then(m => ({
      ...m.fs.promises,
      default: m.fs.promises,
      __esModule: true
    }))
  );
}
