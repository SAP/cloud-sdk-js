import { unixEOL } from '@sap-cloud-sdk/util';
/* eslint-disable valid-jsdoc */
/**
 * @internal
 */
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
