import { join, dirname } from 'node:path';
const tinyexec = import('tinyexec');
const pathToGenerator = join(
  dirname(require.resolve('@sap-cloud-sdk/generator')),
  'cli.js'
);
const pathToOpenApiGenerator = join(
  dirname(require.resolve('@sap-cloud-sdk/openapi-generator')),
  'cli.js'
);

async function execNode(args: string[]): Promise<void> {
  const { x } = await tinyexec;
  const result = await x('node', args, { nodeOptions: { cwd: __dirname } });
  if (result.exitCode) {
    throw new Error([result.stderr, result.stdout].filter(Boolean).join('\n'));
  }
}

export async function execGenerator(args: string[]): Promise<void> {
  return execNode([pathToGenerator, ...args]);
}

export async function execOpenApiGenerator(args: string[]): Promise<void> {
  return execNode([pathToOpenApiGenerator, ...args]);
}

export async function execNodeScript(scriptPath: string): Promise<void> {
  return execNode([scriptPath]);
}
