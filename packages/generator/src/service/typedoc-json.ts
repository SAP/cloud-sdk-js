import { EOL } from 'os';

export function typedocJson(): string {
  return (
    JSON.stringify(
      {
        out: 'documentation',
        exclude: ['node_modules/', 'dist/']
      },
      null,
      2
    ) + EOL
  );
}
