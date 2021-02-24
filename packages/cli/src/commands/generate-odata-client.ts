/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Command } from '@oclif/command';
import cli from 'cli-ux';
import execa from 'execa';
import { generatorOptionsSDK, NumberArgType, toIntegerFlag } from '../utils';
import {
  BoolArgType,
  generatorOptionCli,
  StringArgType,
  toBooleanFlag,
  toStringFlag
} from '../utils/generate-odata-client-util';

export default class GenerateODataClient extends Command {
  static description =
    'Generates a OData client from a edmx service file definition. For SAP solutions, you can find these definitions at https://api.sap.com/.';

  static examples = [
    '$ sap-cloud-sdk generate-odata-client -i directoryWithEdmxFiles -o outputDirectory --forceOverwrite',
    '$ sap-cloud-sdk generate-odata-client --help'
  ];

  static flags: BoolArgType & StringArgType & NumberArgType = {
    // Options which are 1:1 to the SDK CLI
    inputDir: toStringFlag(generatorOptionsSDK.inputDir),
    outputDir: toStringFlag(generatorOptionsSDK.outputDir),
    generateCSN: toBooleanFlag(generatorOptionsSDK.generateCSN),
    generateJs: toBooleanFlag(generatorOptionsSDK.generateJs),
    generatePackageJson: toBooleanFlag(generatorOptionsSDK.generatePackageJson),
    generateTypedocJson: toBooleanFlag(generatorOptionsSDK.generateTypedocJson),
    useSwagger: toBooleanFlag(generatorOptionsSDK.useSwagger),
    serviceMapping: toStringFlag(generatorOptionsSDK.serviceMapping),
    writeReadme: toBooleanFlag(generatorOptionsSDK.writeReadme),
    additionalFiles: toStringFlag(generatorOptionsSDK.additionalFiles!),
    clearOutputDir: toBooleanFlag(generatorOptionsSDK.clearOutputDir),
    aggregatorDirectoryName: toStringFlag(
      generatorOptionsSDK.aggregatorDirectoryName
    ),
    aggregatorNpmPackageName: toStringFlag(
      generatorOptionsSDK.aggregatorNpmPackageName
    ),
    sdkAfterVersionScript: toBooleanFlag(
      generatorOptionsSDK.sdkAfterVersionScript
    ),
    versionInPackageJson: toStringFlag(
      generatorOptionsSDK.versionInPackageJson
    ),
    processesJsGeneration: toIntegerFlag(
      generatorOptionsSDK.processesJsGeneration
    ),
    s4hanaCloud: toBooleanFlag(generatorOptionsSDK.s4hanaCloud),
    forceOverwrite: toBooleanFlag(generatorOptionsSDK.forceOverwrite),
    // Options related to the CLI some of them are mapped to SDK CLI attributes
    projectDir: toStringFlag(generatorOptionCli.projectDir)
  };

  async run(): Promise<execa.ExecaChildProcess<string>> {
    const { flags } = this.parse(GenerateODataClient);

    const yargsFlags = Object.entries(flags)
      .filter(
        ([key, value]) =>
          typeof value !== 'undefined' &&
          generatorOptionsSDK.hasOwnProperty(key)
      )
      .map(([key, value]) => `--${key}=${value}`);

    try {
      await execa('npm', ['ls', '-g', '@sap-cloud-sdk/generator']);
    } catch ({ exitCode }) {
      if (exitCode === 1) {
        this.log('');
        this.log(
          'To generate an OData client, it is necessary to install the @sap-cloud-sdk/generator.'
        );
        this.log(
          'For now, the CLI expects the generator to be installed globally.'
        );
        this.log('');

        if (
          await cli.confirm(
            'Do you want to install the @sap-cloud-sdk/generator globally? (y|n)'
          )
        ) {
          await execa('npm', [
            'install',
            '--global',
            '--force',
            '@sap-cloud-sdk/generator'
          ]);
        } else {
          this.error(
            'It is required to have the @sap-cloud-sdk/generator installed globally. Please install and rerun.',
            { exit: 1 }
          );
        }
      }
    }

    const promise = execa('generate-odata-client', yargsFlags, {
      cwd: flags.projectDir || '.'
    });
    // eslint-disable-next-line no-unused-expressions
    promise.stdout?.pipe(process.stdout);
    return promise;
  }
}
