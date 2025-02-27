import yargs from 'yargs';
import { getOptionsWithoutDefaults } from './options-parser';
import type { Option } from './options-parser';

/**
 * @internal
 * @param options Options to build the parseCmdArgs function for either OData or OpenApi.
 */
export function parseCmdArgsBuilder<GeneratorOptionsT>(options: {
  cliOptions: Record<string, Option<any>>;
  commandText: string;
}): (argv: string[]) => GeneratorOptionsT & { config?: string } {
  return function parseCmdArgs(
    argv: string[]
  ): GeneratorOptionsT & { config?: string } {
    const command = yargs(argv)
      .command('$0', options.commandText)
      .options(getOptionsWithoutDefaults(options.cliOptions))
      .config()
      .alias('config', 'c')
      .alias('version', 'v')
      .alias('help', 'h')
      .strict(true)
      .parserConfiguration({
        'strip-aliased': true,
        'strip-dashed': true
      })
      .recommendCommands();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _, $0, ...userOptions } = command.parseSync();

    return userOptions as unknown as GeneratorOptionsT & { config?: string };
  };
}
