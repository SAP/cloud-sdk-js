/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { unixEOL } from '@sap-cloud-sdk/util';
import { Command, flags } from '@oclif/command';
import cli from 'cli-ux';
import Listr from 'listr';
import {
  installDependencies,
  modifyGitIgnore,
  modifyPackageJson,
  copyFiles,
  findConflicts,
  getCopyDescriptors,
  getProjectNameFromManifest,
  getTemplatePaths
} from '../utils';
export default class AddCds extends Command {
  static description = 'Setup your Cloud Foundry app to use a CDS service';
  static examples = ['$ sap-cloud-sdk add-cds'];

  static flags = {
    // visible
    force: flags.boolean({
      description:
        'Do not fail if a file or npm script already exist and overwrite it.'
    }),
    help: flags.help({
      char: 'h',
      description: 'Show help for the add-cds command.'
    }),
    verbose: flags.boolean({
      char: 'v',
      description: 'Show more detailed output.'
    }),
    // hidden
    projectName: flags.string({
      hidden: true,
      description:
        'Give project name which is used for the Cloud Foundry mainfest.yml.'
    }),
    skipInstall: flags.boolean({
      hidden: true,
      description:
        'Skip installing npm dependencies. If you use this, make sure to install manually afterwards.'
    })
  };

  static args = [
    {
      name: 'projectDir',
      description:
        'Path to the project directory in which the cds sources should be added.'
    }
  ];

  async run(): Promise<void> {
    const parsed = this.parse(AddCds);
    const projectDir = parsed.args.projectDir || '.';

    try {
      const options = await this.getOptions();
      const tasks = new Listr([
        {
          title: 'Creating files',
          task: async () => {
            const copyDescriptors = getCopyDescriptors(
              projectDir,
              getTemplatePaths(['add-cds'])
            );
            await findConflicts(copyDescriptors, parsed.flags.force).catch(e =>
              this.error(parsed.flags.verbose ? e.stack : e.message, {
                exit: 11
              })
            );
            await copyFiles(copyDescriptors, options);
          }
        },
        {
          title: 'Adding dependencies to package.json',
          task: async () =>
            modifyPackageJson({
              projectDir,
              force: parsed.flags.force,
              addCds: true
            }).catch(e =>
              this.error(parsed.flags.verbose ? e.stack : e.message, {
                exit: 12
              })
            )
        },
        {
          title: 'Installing dependencies',
          task: async () =>
            installDependencies(projectDir, parsed.flags.verbose).catch(e =>
              this.error(parsed.flags.verbose ? e.stack : e.message, {
                exit: 13
              })
            ),
          enabled: () => !parsed.flags.skipInstall
        },
        {
          title: 'Modifying `.gitignore`',
          task: () => modifyGitIgnore(projectDir, true)
        }
      ]);

      await tasks.run();

      this.printSuccessMessage();
    } catch (e) {
      this.error(parsed.flags.verbose ? e.stack : e.message, { exit: 1 });
    }
  }

  private async getOptions() {
    const projectName = getProjectNameFromManifest(this);

    const options: { [key: string]: string } = {
      projectName:
        projectName ||
        (await cli.prompt('Enter project name as maintained in Cloud Foundry'))
    };

    return options;
  }

  private printSuccessMessage() {
    this.log(
      [
        '✅ Successfully added a cds service to your project.',
        '',
        'Generated service needs to be exposed.',
        'For express apps you can do this by adding the following snippet to your code:',
        'cds',
        '  .connect()',
        "  .serve('CatalogService')",
        '  .in(<your-express-app>)',
        '',
        'For other frameworks please refer to the documentation.'
      ].join(unixEOL)
    );
  }
}
