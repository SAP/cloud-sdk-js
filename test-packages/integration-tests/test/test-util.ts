const tinyexec = import('tinyexec');

async function execNode(args: string[]): Promise<void> {
  const { x } = await tinyexec;
  const result = await x('node', args, { nodeOptions: { cwd: __dirname } });
  if (result.exitCode) {
    throw new Error([result.stderr, result.stdout].filter(Boolean).join('\n'));
  }
}

export async function execGenerator(args: string[]): Promise<void> {
  return execNode(args);
}

export async function execNodeScript(scriptPath: string): Promise<void> {
  return execNode([scriptPath]);
}
