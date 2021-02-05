/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Options } from 'yargs';
import { TimeThresholds } from '../../test/test-utils';
import { toBooleanFlag, toStringFlag } from './generate-odata-client-util';

describe('Generate OData Client Utils', () => {
  it(
    'should translate the description correctly',
    () => {
      let yargsOption: Options = {
        describe: 'expectedDescription',
        default: false
      };
      expect(toBooleanFlag(yargsOption).description).toBe(
        'expectedDescription [default: false].'
      );

      yargsOption = { describe: 'expectedDescription', default: true };
      expect(toBooleanFlag(yargsOption).description).toBe(
        'expectedDescription [default: true].'
      );
    },
    TimeThresholds.EXTRA_SHORT
  );

  it(
    'should translate the alias correctly.',
    () => {
      const yargsOption: Options = { alias: 'expectedAlias' };
      expect(toBooleanFlag(yargsOption).char).toBe(yargsOption.alias);
    },
    TimeThresholds.EXTRA_SHORT
  );

  it(
    'should translate the required option correctly.',
    () => {
      let yargsOption: Options = { requiresArg: false };
      expect(toBooleanFlag(yargsOption).required).toBe(yargsOption.requiresArg);

      yargsOption = { requiresArg: true };
      expect(toBooleanFlag(yargsOption).required).toBe(yargsOption.requiresArg);
    },
    TimeThresholds.EXTRA_SHORT
  );

  it(
    'should translate the default and allowNo option correctly.',
    () => {
      let yargsOption: Options = { default: false };
      expect(toBooleanFlag(yargsOption).default).toBe(yargsOption.default);
      expect(toBooleanFlag(yargsOption).allowNo).toBe(yargsOption.default);

      yargsOption = { default: true };
      expect(toBooleanFlag(yargsOption).default).toBe(yargsOption.default);
      expect(toBooleanFlag(yargsOption).allowNo).toBe(yargsOption.default);
    },
    TimeThresholds.EXTRA_SHORT
  );

  it('should translate all string arguments correctly.', () => {
    const yargsOption: Options = {
      alias: 'expectedAlias',
      description: 'expectedDescription'
    };
    expect(toStringFlag(yargsOption).char).toBe(yargsOption.alias);
    expect(toStringFlag(yargsOption).description).toBe(yargsOption.describe);
  });

  it(
    'should translate the default option correctly.',
    () => {
      let yargsOption: Options = { default: false };
      expect(toStringFlag(yargsOption).default).toBe(yargsOption.default);

      yargsOption = { default: true };
      expect(toStringFlag(yargsOption).default).toBe(yargsOption.default);
    },
    TimeThresholds.EXTRA_SHORT
  );

  it(
    'should translate the required option correctly.',
    () => {
      let yargsOption: Options = { requiresArg: false };
      expect(toStringFlag(yargsOption).required).toBe(yargsOption.requiresArg);

      yargsOption = { requiresArg: true };
      expect(toStringFlag(yargsOption).required).toBe(yargsOption.requiresArg);
    },
    TimeThresholds.EXTRA_SHORT
  );
});
