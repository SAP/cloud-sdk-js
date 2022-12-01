import { createLogger } from '@sap-cloud-sdk/util';
import { Options } from 'yargs';
import { ParsedOptions } from './generator-options';
const logger = createLogger('generator-options');

type Option = Options & {
  replacedBy?: string;
  describe: string;
};

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
      const { default: def, ...optionWithoutDefault } = option;
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
  GeneratorOptionsT extends Record<string, any>
>(
  options: CliOptionsT,
  userOptions: GeneratorOptionsT
): ParsedOptions<GeneratorOptionsT, CliOptionsT> {
  return new OptionsParser(options, userOptions).parseOptions();
}

class OptionsParser<
  CliOptionsT extends Record<string, Option>,
  GeneratorOptionsT extends Record<string, any>
> {
  constructor(
    private options: CliOptionsT,
    private userOptions: GeneratorOptionsT
  ) {}

  parseOptions(): ParsedOptions<GeneratorOptionsT, CliOptionsT> {
    this.warnIfDeprecatedOptionsUsed();
    this.warnIfDuplicateOptionsUsed();
    const parsedOptions = this.sanitizeIfReplacedOptionsUsed();
    return this.addDefaults(parsedOptions);
  }

  private addDefaults(
    parsedOptions: ParsedOptions<GeneratorOptionsT, CliOptionsT>
  ): ParsedOptions<GeneratorOptionsT, CliOptionsT> {
    Object.entries(this.options).forEach(([name, option]) => {
      if ('default' in option) {
        parsedOptions[name] = parsedOptions[name] ?? option.default;
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
