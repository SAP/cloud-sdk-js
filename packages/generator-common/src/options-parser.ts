import { dirname, resolve } from 'path';
import { createLogger } from '@sap-cloud-sdk/util';
import { InferredOptionType, Options as YargsOption } from 'yargs';
const logger = createLogger('generator-options');
import { sync as globSync } from 'glob';

/**
 * @internal
 * CLI options type, based on generator options type.
 */
export type Options<GeneratorOptionsT> = {
  [K in keyof GeneratorOptionsT]: Option<GeneratorOptionsT[K]>;
};

/**
 * @internal
 * Options for SAP Cloud SDK generators.
 * Some keys are modified, for more explicit parsing.
 */
export type Option<T = any> = Omit<YargsOption, 'coerce'> & {
  /**
   * Name of the option the current option was replaced with.
   */
  replacedBy?: string;

  /**
   * Only required options should set `demandOption`. Other options are not required by default.
   */
  demandOption?: true;

  /**
   * Coerce function with additional parameter for all options.
   */
  coerce?: (arg: T, options: any) => any;
} & Required<Pick<YargsOption, 'describe' | 'type'>>;

/**
 * @internal
 * Helper to represent parsed options based on a public generator options type and a CLI options configuration.
 * - Makes all properties required.
 * - Removes deprecated and replaced options.
 * - Sets default values.
 * - Replaces input types with coerced types.
 * @typeParam GeneratorOptionsOptionsT - Public generator options.
 * @typeParam CliOptionsT - Configuration of CLI options.
 */
export type ParsedOptions<CliOptionsT extends Record<string, Option>> = Omit<
  { [K in keyof CliOptionsT]: ParsedOptionType<CliOptionsT[K]> },
  OptionsWith<'deprecated' | 'replacedBy', CliOptionsT>
>;

type ParsedOptionType<OptionT extends Option> = OptionT extends {
  coerce: (...arg: any) => infer ReturnT;
}
  ? ReturnT
  : InferredOptionType<Omit<OptionT, 'coerce'>>;

/**
 * Union type of the options that specify the given property name.
 * @typeParam OptionPropertyT - The literal name of the property in each option.
 * @typeParam CliOptionsT - Configuration of CLI options.
 */
type OptionsWith<
  OptionPropertyT extends keyof Option,
  CliOptionsT extends Record<string, Option>
> = {
  [K in keyof CliOptionsT]: CliOptionsT[K] extends Record<OptionPropertyT, any>
    ? K
    : never;
}[keyof CliOptionsT];

/**
 * Resolves a string using glob notation. If a config is given in generatoroptions the glob working diretory is considered relative to this config.
 * @internal
 * @param arg Value for the string for which the glob is resolved
 * @param options Generator options
 */
export function resolveGlob<GeneratorOptionsT>(
  arg: string | undefined,
  options: GeneratorOptionsT & { config?: string }
): string[] {
  if (!arg) {
    return [];
  }

  const globConfig = options.config
    ? { cwd: resolve(dirname(options.config)) }
    : { cwd: resolve() };

  return globSync(arg, globConfig).map(s => resolve(s));
}

/**
 * Resolves arguments that represent paths to an absolute path as a `string`. Only works for required options.
 * @internal
 * @param arg - Path argument as passed by the user.
 * @param options - Options as passed by the user.
 * @returns Absolute path as a `string`.
 */
export function resolveRequiredPath<GeneratorOptionsT>(
  arg: string,
  options: GeneratorOptionsT & { config?: string }
): string {
  return options.config
    ? resolve(dirname(options.config), arg.toString())
    : resolve(arg.toString());
}

/**
 * Same as `resolveRequiredPath`, but for non-required options.
 * @internal
 * @param arg - Path argument as passed by the user, or `undefined` if nothing was passed.
 * @param options - Options as passed by the user.
 * @returns Absolute path as a `string` or `undefined`.
 */
export function resolvePath<GeneratorOptionsT>(
  arg: string | undefined,
  options: GeneratorOptionsT & { config?: string }
): string | undefined {
  return arg ? resolveRequiredPath(arg, options) : undefined;
}

/**
 * @internal
 * Remove defaults from CLI options. This is necessary to handle default setting on our own.
 * @param options - CLI options, record, that maps option name to option config.
 * @returns CLI options without default values.
 */
export function getOptionsWithoutDefaults<
  CliOptionsT extends Record<string, Option>
>(
  options: CliOptionsT
): { [K in keyof CliOptionsT]: Omit<CliOptionsT[K], 'default' | 'coerce'> } {
  return Object.entries(options).reduce(
    (optionsWithoutDefaults, [name, option]) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { default: def, coerce, ...optionWithoutDefault } = option;
      const describe =
        def === undefined
          ? optionWithoutDefault.describe
          : `${optionWithoutDefault.describe}\n[Default: ${def}]`;
      return {
        ...optionsWithoutDefaults,
        [name]: {
          ...optionWithoutDefault,
          describe
        }
      };
    },
    {} as CliOptionsT
  );
}

/**
 * @internal
 * Parse options for programmatic and CLI use.
 * Warn, if deprecated options are used or duplicate.
 * Adds defaults for options not set by the user.
 * @param options - Available CLI options along with their configuration.
 * @param userOptions - Options as set by user, either through the CLI or programmatically.
 * @returns Parsed options with default values.
 */
export function parseOptions<
  CliOptionsT extends Record<string, Option>,
  GeneratorOptionsT extends Partial<Record<keyof CliOptionsT, any>>
>(
  options: CliOptionsT,
  userOptions: GeneratorOptionsT
): ParsedOptions<CliOptionsT> {
  return new OptionsParser(options, userOptions).parseOptions();
}

class OptionsParser<
  CliOptionsT extends Record<string, Option>,
  GeneratorOptionsT extends Record<keyof CliOptionsT, any>
> {
  constructor(
    private options: CliOptionsT,
    private userOptions: GeneratorOptionsT
  ) {}

  parseOptions(): ParsedOptions<CliOptionsT> {
    this.warnIfDeprecatedOptionsUsed();
    this.warnIfDuplicateOptionsUsed();
    const parsedOptions = this.sanitizeIfReplacedOptionsUsed();
    return this.addDefaults(parsedOptions);
  }

  private addDefaults(
    parsedOptions: ParsedOptions<CliOptionsT>
  ): ParsedOptions<CliOptionsT> {
    Object.entries(this.options).forEach(([name, option]) => {
      if ('default' in option) {
        parsedOptions[name] = parsedOptions[name] ?? option.default;
      }
      if ('coerce' in option) {
        parsedOptions[name] = option.coerce?.(
          parsedOptions[name],
          parsedOptions
        );
      }
    });

    return parsedOptions;
  }

  private getDeprecatedOptionsInUse(): string[] {
    return Object.keys(this.options)
      .filter(name => this.options[name].deprecated)
      .filter(name => Object.keys(this.userOptions).includes(name));
  }

  private getReplacedOptionsUsed(): string[] {
    return Object.keys(this.options)
      .filter(name => this.options[name].replacedBy)
      .filter(name => Object.keys(this.userOptions).includes(name));
  }

  private getReplacingOptionName(replacedOptionName: string): string {
    const replacingOptionName = this.options[replacedOptionName].replacedBy;
    if (!replacingOptionName) {
      throw new Error(
        `Cannot get replaced option for deprecated option ${replacedOptionName}.`
      );
    }
    return replacingOptionName;
  }

  private getDuplicateOptionsUsed(): { oldName: string; newName: string }[] {
    const oldOptionsUsed = this.getReplacedOptionsUsed();

    if (oldOptionsUsed.length) {
      const oldNewNames = oldOptionsUsed.map(name => ({
        oldName: name,
        newName: this.getReplacingOptionName(name)
      }));

      return oldNewNames.filter(({ newName }) =>
        Object.keys(this.userOptions).includes(newName)
      );
    }

    return [];
  }

  /**
   * @internal
   * Logs a warning if deprecated options are used.
   * @param args - Either the command line arguments or the config passed for programmatic use. An array implicates command line arguments, while objects represent the programmatic config.
   * @param options - Available generator options.
   */
  private warnIfDeprecatedOptionsUsed(): void {
    const deprecatedOptionsInUse = this.getDeprecatedOptionsInUse();

    if (deprecatedOptionsInUse.length) {
      const logs = deprecatedOptionsInUse
        .map(name => `\t${name}: ${this.options[name].deprecated}`)
        .join('\n');

      logger.warn(`Deprecated options used:\n${logs}`);
    }
  }

  private warnIfDuplicateOptionsUsed(): void {
    const duplicateOptionsUsed = this.getDuplicateOptionsUsed();

    if (duplicateOptionsUsed.length) {
      const log = duplicateOptionsUsed
        .map(
          ({ oldName, newName }) => `\t${oldName} was replaced by ${newName}.`
        )
        .join('\n');

      logger.warn(`Duplicate options used:\n${log}`);
    }
  }

  private sanitizeIfReplacedOptionsUsed(): ParsedOptions<CliOptionsT> {
    const replacedOptionsUsed = this.getReplacedOptionsUsed();

    return Object.entries(this.userOptions).reduce((opts, [name, value]) => {
      if (replacedOptionsUsed.includes(name)) {
        const replacedByName = this.getReplacingOptionName(name);
        return replacedByName in this.userOptions
          ? // ignore the deprecated value => it will be set by the correct option
            opts
          : // set the replaced value for the new name
            { ...opts, [replacedByName]: value };
      }
      return { ...opts, [name]: value };
    }, {} as ParsedOptions<CliOptionsT>);
  }
}
