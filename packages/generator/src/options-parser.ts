/* eslint-disable jsdoc/require-jsdoc */

import { createLogger } from '@sap-cloud-sdk/util';

const logger = createLogger('generator-options');

export class OptionsParser {
  constructor(
    private options: Record<string, Record<string, any>> // private userOptions: Record<string, any>
  ) {}

  getOptionsWithoutDefaults(): Record<string, Record<string, any>> {
    return Object.entries(this.options).reduce((opts, [name, option]) => {
      const { default: def, ...optionWithoutDefault } = option;
      const describe =
        def === undefined
          ? optionWithoutDefault.describe
          : `${optionWithoutDefault.describe}\n[Default: ${def}]`;
      return {
        ...opts,
        [name]: {
          ...optionWithoutDefault,
          describe
        }
      };
    }, {});
  }

  parseOptionsWithDefaults(
    userOptions: Record<string, any>
  ): Record<string, any> {
    this.warnIfDeprecatedOptionsUsed(userOptions);
    this.warnIfDuplicateOptionsUsed(userOptions);
    // it is important to set defaults after sanitizing, otherwise we don't know whether a set value was set by a user or by default
    return this.setDefaults(this.sanitizeIfReplacedOptionsUsed(userOptions));
  }

  private setDefaults(userOptions: Record<string, any>): Record<string, any> {
    Object.entries(this.options).forEach(([name, option]) => {
      if ('default' in option) {
        userOptions[name] = userOptions[name] ?? option.default;
      }
    });

    return userOptions;
  }

  // private getCliOptionAlias(name: string): string[] {
  //   const alias = this.options[name].alias || [];
  //   const aliasAsArray = Array.isArray(alias) ? alias : [alias];
  //   return aliasAsArray.map(a => `-${a}`);
  // }

  // private getValidOptionNameAndAlias(name: string): string[] {
  //   // if CLI: [--optionName, -a (alias)], if programmatically: [optionName]
  //   return this.isCli ? [`--${name}`, ...this.getCliOptionAlias(name)] : [name];
  // }

  // private formatOptionNameAndAlias(name: string): string {
  //   const [optionName, ...alias] = this.getValidOptionNameAndAlias(name);
  //   return alias.length ? `${optionName}(${alias.join(', ')})` : optionName;
  // }

  // private formatOptionName(name: string): string {
  //   return this.getValidOptionNameAndAlias(name)[0];
  // }

  private getDeprecatedOptionsInUse(
    userOptions: Record<string, any>
  ): string[] {
    return Object.keys(this.options)
      .filter(name => this.options[name].deprecated)
      .filter(name => Object.keys(userOptions).includes(name));
  }

  private getReplacedOptionsUsed(userOptions: Record<string, any>): string[] {
    return Object.keys(this.options)
      .filter(name => this.options[name].replacedBy)
      .filter(name => Object.keys(userOptions).includes(name));
  }

  private getDuplicateOptionsUsed(
    userOptions: Record<string, any>
  ): [oldName: string, newName: string][] {
    const oldOptionsUsed = this.getReplacedOptionsUsed(userOptions);

    if (oldOptionsUsed.length) {
      const oldNewNames: [string, string][] = oldOptionsUsed.map(name => [
        name,
        this.options[name].replacedBy
      ]);

      return oldNewNames.filter(([, newName]) =>
        Object.keys(userOptions).includes(newName)
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
  private warnIfDeprecatedOptionsUsed(userOptions: Record<string, any>): void {
    const deprecatedOptionsInUse = this.getDeprecatedOptionsInUse(userOptions);

    if (deprecatedOptionsInUse.length) {
      const logs = deprecatedOptionsInUse
        .map(name => `\t${name}: ${this.options[name].deprecated}`)
        .join('\n');

      logger.warn(
        `Deprecated options used. The following options will be removed in the next major version:\n${logs}`
      );
    }
  }

  private warnIfDuplicateOptionsUsed(userOptions: Record<string, any>): void {
    const duplicateOptionsUsed = this.getDuplicateOptionsUsed(userOptions);

    if (duplicateOptionsUsed.length) {
      const log = duplicateOptionsUsed
        .map(([oldName, newName]) => `\t${oldName} was replaced by ${newName}.`)
        .join('\n');

      logger.warn(`Duplicate options used:\n${log}`);
    }
  }

  private sanitizeIfReplacedOptionsUsed(
    userOptions: Record<string, any>
  ): Record<string, any> {
    const replacedOptionsUsed = this.getReplacedOptionsUsed(userOptions);

    return Object.entries(userOptions).reduce((opts, [name, value]) => {
      if (replacedOptionsUsed.includes(name)) {
        const replacedByName = this.options[name].replacedBy;
        return replacedByName in userOptions
          ? opts
          : { ...opts, [replacedByName]: value };
      }
      return { ...opts, [name]: value };
    }, {});
  }
}
