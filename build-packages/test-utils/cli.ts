import { resolve } from 'node:path';
import { build } from 'esbuild';

const [, , actionName] = process.argv;
if (!actionName || process.argv.length !== 3) {
  // eslint-disable-next-line no-console
  console.error('Usage: build-action <action-name>');
  process.exit(1);
}

await build({
  platform: 'node',
  entryPoints: ['index.ts'],
  bundle: true,
  format: 'esm',
  outfile: resolve(
    import.meta.dirname,
    '../../../.github/actions',
    actionName,
    'index.js'
  ),
  conditions: ['workspace', 'import', 'require'],
  // Globals that are not available in CJS and can cause issues with esm/cjs detection.
  define: {
    __dirname: 'import.meta.dirname',
    __filename: 'import.meta.filename'
  }
});
