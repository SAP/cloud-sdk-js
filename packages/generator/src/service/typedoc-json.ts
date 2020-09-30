export function typedocJson(): string {
  return (
    JSON.stringify(
      {
        out: 'documentation',
        exclude: ['node_modules/', 'dist/']
      },
      null,
      2
    ) + '\n'
  );
}
