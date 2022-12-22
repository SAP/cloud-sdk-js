import { createLogger } from '@sap-cloud-sdk/util';
import { Options } from 'yargs';
const logger = createLogger('generator-options');

/**
 * @internal
 * Option for SAP Cloud SDK generators
 */
export type Option = Options & {
  /**
   * Name of the option the current option was replaced with.
   */
  replacedBy?: string;

  /**
   * Mandatory description.
   */
  describe: string;

  /**
   * Only required options should set `demandOption`. Other options are not required by default.
   */
  demandOption?: true;
};

/**
 * @internal
 * Helper to represent parsed options based on a public generator options type and a CLI options configuration.
 * - Makes all properties required.
 * - Removes deprecated and replaced options.
 * - Replaces input types with coerced types.
 * @typeParam GeneratorOptionsOptionsT - Public generator options.
 * @typeParam CliOptionsT - Configuration of CLI options.
 */
export type ParsedOptions<
  GeneratorOptionsT,
  CliOptionsT extends Record<keyof GeneratorOptionsT, Option>
> = Omit<
  Required<GeneratorOptionsT>,
  | OptionsWith<'deprecated' | 'replacedBy', CliOptionsT>
  | OptionsWith<'coerce', CliOptionsT>
> &
  CoercedTypes<CliOptionsT>;

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
 * Represents an object with all properties that have a `coerce()` function after coercion.
 * @typeParam CliOptionsT - Configuration of CLI options.
 */
type CoercedTypes<CliOptionsT extends Record<string, Option>> = {
  [K in keyof Pick<
    CliOptionsT,
    OptionsWith<'coerce', CliOptionsT>
  >]: CoercedType<CliOptionsT[K]>;
};

/**
 * Infer the return type of the `coerce()` function for a given option.
 * @typeParam OptionT - Type of the option.
 */
type CoercedType<OptionT extends Option> = OptionT extends { coerce: any }
  ? ReturnType<OptionT['coerce']>
  : undefined;

/**
 * @internal
 * Remove defaults from CLI options. This is necessary to handle default setting on our own.
 * @param options - CLI options, record, that maps option name to option config.
 * @returns CLI options without default values.
 */
export function getOptionsWithoutDefaults<
  CliOptionsT extends Record<string, Option>
>(options: CliOptionsT): CliOptionsT {
  return Object.entries(options).reduce(
    (optionsWithoutDefaults, [name, option]) => {
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
  CliOptionsT extends Record<keyof GeneratorOptionsT, Option>,
  GeneratorOptionsT extends Record<string, any>
>(
  options: CliOptionsT,
  userOptions: GeneratorOptionsT,
  sanitize?: (
    options: ParsedOptions<GeneratorOptionsT, CliOptionsT>
  ) => ParsedOptions<GeneratorOptionsT, CliOptionsT>
): ParsedOptions<GeneratorOptionsT, CliOptionsT> {
  return new OptionsParser(options, userOptions).parseOptions(sanitize);
}

class OptionsParser<
  CliOptionsT extends Record<keyof GeneratorOptionsT, Option>,
  GeneratorOptionsT extends Record<string, any>
> {
  constructor(
    private options: CliOptionsT,
    private userOptions: GeneratorOptionsT
  ) {}

  parseOptions(
    sanitize?: (
      options: ParsedOptions<GeneratorOptionsT, CliOptionsT>
    ) => ParsedOptions<GeneratorOptionsT, CliOptionsT>
  ): ParsedOptions<GeneratorOptionsT, CliOptionsT> {
    this.warnIfDeprecatedOptionsUsed();
    this.warnIfDuplicateOptionsUsed();
    let parsedOptions = this.sanitizeIfReplacedOptionsUsed();
    parsedOptions = this.addDefaults(parsedOptions);
    return sanitize ? sanitize(parsedOptions) : parsedOptions;
  }

  private addDefaults(
    parsedOptions: ParsedOptions<GeneratorOptionsT, CliOptionsT>
  ): ParsedOptions<GeneratorOptionsT, CliOptionsT> {
    Object.entries(this.options).forEach(([name, option]) => {
      if ('default' in option) {
        parsedOptions[name] = parsedOptions[name] ?? option.default;
      }
      if ('coerce' in option) {
        parsedOptions[name] =
          parsedOptions[name] ?? option.coerce?.(parseOptions[name]);
      }
    });

    return parsedOptions;
  }

  // private resolvePaths() {}

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

  private sanitizeIfReplacedOptionsUsed(): ParsedOptions<
    GeneratorOptionsT,
    CliOptionsT
  > {
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
    }, {} as ParsedOptions<GeneratorOptionsT, CliOptionsT>);
  }
}
