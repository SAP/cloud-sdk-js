/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { resolve } from 'path';
import { Command, flags } from '@oclif/command';
import Listr from 'listr';
import { CopyDescriptor, copyFiles, findConflicts } from '../utils';

export default class AddCxServer extends Command {
  static description =
    'Add the scripts to set up a Jenkins server for CI/CD of your project';
  static examples = ['$ sap-cloud-sdk add-cx-server'];

  static flags = {
    force: flags.boolean({
      description: 'Do not fail if a file already exist and overwrite it.'
    }),
    platform: flags.string({
      hidden: true,
      default: process.platform,
      description: 'The currently running OS.'
    }),
    help: flags.help({
      char: 'h',
      description: 'Show help for the add-cx-server command.'
    })
  };

  static args = [
    {
      name: 'projectDir',
      description:
        'Path to the project directory to which the cx-server should be added.'
    }
  ];

  async run(): Promise<void> {
    const parsed = this.parse(AddCxServer);
    const projectDir = parsed.args.projectDir || '.';
    const options = await this.getOptions();

    try {
      const files = [
        this.copyDescriptorForGithub('cx-server', projectDir),
        this.copyDescriptorForGithub('server.cfg', projectDir)
      ];
      if (parsed.flags.platform === 'win32') {
        files.push(this.copyDescriptorForGithub('cx-server.bat', projectDir));
      }

      const tasks = new Listr([
        {
          title: 'Finding potential conflicts',
          task: async () =>
            findConflicts(files, parsed.flags.force).catch(e =>
              this.error(e, { exit: 11 })
            )
        },
        {
          title: 'Creating files',
          task: async () => copyFiles(files, options)
        }
      ]);

      await tasks.run();
    } catch (error) {
      this.error(error, { exit: 1 });
    }
  }

  private copyDescriptorForGithub(
    fileName: string,
    projectDir: string
  ): CopyDescriptor {
    const githubPrefix =
      'https://raw.githubusercontent.com/SAP/devops-docker-cx-server/master/cx-server-companion/life-cycle-scripts/';

    return {
      sourcePath: new URL(fileName, githubPrefix),
      fileName: resolve(projectDir, 'cx-server', fileName)
    };
  }

  private async getOptions() {
    return {};
  }
}
