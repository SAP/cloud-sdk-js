import { unixEOL } from '@sap-cloud-sdk/util';

export function typedocJson(): string {
  return (
    JSON.stringify(
      {
        out: 'documentation',
        exclude: ['node_modules/', 'dist/']
      },
      null,
      2
    ) + unixEOL
  );
}
