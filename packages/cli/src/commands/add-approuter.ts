/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Command, flags } from '@oclif/command';
import cli from 'cli-ux';
import Listr from 'listr';
import {
  copyFiles,
  findConflicts,
  getCopyDescriptors,
  getProjectNameFromManifest,
  getTemplatePaths
} from '../utils';

export default class AddApprouter extends Command {
  static description =
    'Setup your Cloud Foundry app to authenticate through the app router';
  static aliases = ['add-app-router'];
  static examples = ['$ sap-cloud-sdk add-approuter'];

  static flags = {
    force: flags.boolean({
      description: 'Do not fail if a file already exist and overwrite it.'
    }),
    help: flags.help({
      char: 'h',
      description: 'Show help for the add-approuter command.'
    })
  };
// trigger diff
  static args = [
    {
      name: 'projectDir',
      description:
        'Path to the project directory to which the approuter should be added.'
    }
  ];

  async run(): Promise<void> {
    const parsed = this.parse(AddApprouter);
    const projectDir = parsed.args.projectDir || '.';

    try {
      const options = await this.getOptions();
      const tasks = new Listr([
        {
          title: 'Creating files',
          task: async () => {
            const copyDescriptors = getCopyDescriptors(
              projectDir,
              getTemplatePaths(['add-approuter'])
            );
            await findConflicts(copyDescriptors, parsed.flags.force).catch(e =>
              this.error(e, { exit: 11 })
            );
            await copyFiles(copyDescriptors, options);
          }
        }
      ]);

      await tasks.run();

      this.printSuccessMessage();
    } catch (error) {
      this.error(error, { exit: 1 });
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
      `✅ Successfully added approuter to your project.

Generated files might need customization. Documentation available here:
- xs-security.json (for help check https://help.sap.com/viewer/4505d0bdaf4948449b7f7379d24d0f0d/2.0.02/en-US/e6fc90df44464a29952e1c2c36dd9861.html)
- xs-app.json (for help check https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/c103fb414988447ead2023f768096dcc.html)
- mainfest.yml (for help check https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/ba527058dc4d423a9e0a69ecc67f4593.html)`
    );
  }
}
