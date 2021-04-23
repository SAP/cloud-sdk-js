/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { resolve } from 'path';
import { createLogger } from '@sap-cloud-sdk/util';
import { Command, flags } from '@oclif/command';
import cli from 'cli-ux';
import { generate } from '../generator';

const logger = createLogger('openapi-generator');

class GenerateOpenApiClient extends Command {
  static description =
    'Generate OpenAPI client(s), that use the connectivity features of the SAP Cloud SDK for JavaScript/TypeScript.';

  static usage = '--input <input> --outputDir <outputDirectory>';
  static examples = [
    `
// generate TypeScript clients from OpenAPI definitions in a directory
$ generate-openapi-client --input ./my-specs --outputDir ./clients`,
    `
// generate a JavaScript client from a OpenAPI definition file
$ generate-openapi-client --input ./my-spec.yaml --outputDir ./client --transpile`
  ];

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  static version = require('../../package.json').version;

  static flags = {
    input: flags.string({
      char: 'i',
      description:
        'Specify the path to the directory or file containing the OpenAPI service definition(s) to generate clients for. Accepts Swagger and OpenAPI definitions as YAML and JSON files. Throws an error if the path does not exist.',
      parse: input => resolve(input),
      required: true,
      helpValue: '<path/to/input>'
    }),
    outputDir: flags.string({
      char: 'o',
      description:
        'Specify the path to the directory to generate the client(s) in. Each client is generated into a subdirectory within the given output directory. Creates the directory if it does not exist. Customize subdirectory naming through `--serviceMapping`.',
      parse: input => resolve(input),
      required: true,
      helpValue: '<path/to/output>'
    }),
    transpile: flags.boolean({
      char: 't',
      description:
        'Transpile the generated TypeScript code. When enabled a default `tsconfig.json` will be generated. It emits `.js`, `.js.map`, `.d.ts` and `.d.ts.map` files. To configure transpilation set `--tsconfig`.',
      default: false
    }),
    include: flags.string({
      description:
        'Include files matching the given glob into the root of each generated client directory.',
      parse: input => resolve(input),
      helpValue: '<glob/to/include>'
    }),
    clearOutputDir: flags.boolean({
      description:
        'Remove all files in the output directory before generation. Be cautious when using this option, as it really removes EVERYTHING in the output directory.',
      default: false
    }),
    tsConfig: flags.string({
      description:
        'Replace the default `tsconfig.json` by passing a path to a custom config. By default, a `tsconfig.json` is only generated, when transpilation is enabled (`--transpile`).',
      parse: input => resolve(input),
      helpValue: '<path/to/tsconfig.json>'
    }),
    packageJson: flags.boolean({
      description:
        'When set to false, no `package.json` is generated. By default, a `package.json` that specifies dependencies and scripts for transpilation and documentation generation.',
      default: true,
      allowNo: true
    }),
    serviceMapping: flags.string({
      description:
        'Set the path to the service mapping file. By default, a `service-mapping.json` is generated in the input directory. The service mapping ensures consistent names between multiple generation runs with updated service definitions.',
      helpValue: '<path/to/custom-service-mapping.json>'
    }),
    packageVersion: flags.string({
      description: 'Set the version in the generated package.json.',
      default: '1.0.0',
      hidden: true
    }),
    readme: flags.boolean({
      description:
        'Generate default `README.md` files in the client directories.',
      default: false,
      hidden: true
    })
  };

  async run(): Promise<void> {
    try {
      const parsed = this.parse(GenerateOpenApiClient);
      await generate(parsed.flags);
    } catch (e) {
      logger.error(e.message);
      return cli.exit(1);
    }
  }
}

export = GenerateOpenApiClient;
