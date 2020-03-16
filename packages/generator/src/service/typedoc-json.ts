/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

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
