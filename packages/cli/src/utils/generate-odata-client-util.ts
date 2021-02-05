/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import * as path from 'path';
import { PathLike } from 'fs';
import { flags } from '@oclif/command';
// eslint-disable-next-line import/no-internal-modules
import { IBooleanFlag, IOptionFlag } from '@oclif/parser/lib/flags';
import { Options } from 'yargs';
import {
  AlphabetLowercase,
  AlphabetUppercase
  // eslint-disable-next-line import/no-internal-modules
} from '@oclif/parser/lib/alphabet';
import { GeneratorOptionsSDK } from './generator-options';

interface GeneratorOptionCli {
  projectDir: string;
}

type KeysToOptions = {
  [optionName in keyof GeneratorOptionCli]: Options;
};

export const generatorOptionCli: KeysToOptions = {
  projectDir: {
    default: '.',
    describe:
      'Path to the folder in which the VDM should be created. The input and output dir are relative to this directory.',
    type: 'string'
  }
};

type AllOptions = GeneratorOptionsSDK & GeneratorOptionCli;

// OClif distinguishes between boolean and string flags. Split the keys to get proper typing
type FilterBooleanKeys<Base> = {
  [Key in keyof Base]: Base[Key] extends boolean | undefined ? Key : never;
};

type FilterStringKeys<Base> = {
  [Key in keyof Base]: Base[Key] extends string | PathLike | undefined
    ? Key
    : never;
};

type FilterNumberKeys<Base> = {
  [Key in keyof Base]: Base[Key] extends number | undefined ? Key : never;
};

type BoolArgKeys = NonNullable<FilterBooleanKeys<AllOptions>[keyof AllOptions]>;
export type BoolArgType = {
  [optionName in BoolArgKeys]: IBooleanFlag<boolean>;
};

type StringArgKeys = NonNullable<
  FilterStringKeys<AllOptions>[keyof AllOptions]
>;
export type StringArgType = {
  [optionName in StringArgKeys]: IOptionFlag<string | undefined>;
};

type NumberArgKeys = NonNullable<
  FilterNumberKeys<AllOptions>[keyof AllOptions]
>;
export type NumberArgType = {
  [optionName in NumberArgKeys]: IOptionFlag<number | undefined>;
};

export type FlagsParsed = {
  [Key in keyof AllOptions]: AllOptions[Key] extends boolean
    ? boolean
    : string | undefined;
};

export function toIntegerFlag(
  yargsNumber: Options
): IOptionFlag<number | undefined> {
  return flags.integer({
    char: yargsNumber.alias as AlphabetLowercase | AlphabetUppercase,
    description: yargsNumber.describe,
    required: yargsNumber.requiresArg,
    default: yargsNumber.default
  });
}

export function toBooleanFlag(yargsBool: Options): IBooleanFlag<boolean> {
  const extendedDescription = `${yargsBool.describe} [default: ${yargsBool.default}].`;
  return flags.boolean({
    char: yargsBool.alias as AlphabetLowercase | AlphabetUppercase,
    description: extendedDescription,
    required: yargsBool.requiresArg,
    default: yargsBool.default,
    allowNo: yargsBool.default
  });
}

export function toStringFlag(
  yargsString: Options
): IOptionFlag<string | undefined> {
  const options: Partial<IOptionFlag<string>> = {
    char: yargsString.alias as AlphabetLowercase | AlphabetUppercase,
    description: yargsString.describe,
    required: yargsString.requiresArg,
    default: yargsString.default
  };

  if (yargsString?.coerce?.name === 'resolve') {
    options.parse = (input: string, context: any): string => {
      let projectDir = '.';
      if (context.argv.includes('--projectDir')) {
        projectDir = context.argv[context.argv.indexOf('--projectDir') + 1];
      }
      return path.resolve(projectDir, input);
    };
  }
  return flags.string(options);
}
