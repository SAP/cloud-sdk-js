/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { mkdirSync } from 'fs';
import path from 'path';
import { Command, flags } from '@oclif/command';
import cli from 'cli-ux';
import Listr from 'listr';
import {
  boxMessage,
  getWarnings,
  buildScaffold,
  copyFiles,
  findConflicts,
  getCopyDescriptors,
  getJestConfig,
  getTemplatePaths,
  installDependencies,
  modifyGitIgnore,
  modifyJestConfig,
  modifyPackageJson,
  parsePackageJson,
  shouldBuildScaffold,
  usageAnalytics
} from '../utils';

export default class Init extends Command {
  static description =
    'Initializes your project for the SAP Cloud SDK, SAP Cloud Platform Cloud Foundry and CI/CD using the SAP Cloud SDK toolkit';

  static examples = ['$ sap-cloud-sdk init', '$ sap-cloud-sdk init --help'];

  static flags = {
    // visible
    projectDir: flags.string({
      description:
        'Path to the directory in which the project should be created.'
    }),
    addCds: flags.boolean({
      description:
        'Add a cds configuration and example data to follow the SAP Cloud Application Programming model.'
    }),
    force: flags.boolean({
      description:
        'Do not fail if a file or npm script already exist and overwrite it.'
    }),
    frontendScripts: flags.boolean({
      description:
        'Add frontend-related npm scripts which are executed by our CI/CD toolkit.'
    }),
    help: flags.help({
      char: 'h',
      description: 'Show help for the init command.'
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
    startCommand: flags.string({
      hidden: true,
      description:
        'Give a command which is used to start the application productively.'
    }),
    buildScaffold: flags.boolean({
      hidden: true,
      description:
        'If the folder is empty, use nest-cli to create a project scaffold.'
    }),
    analytics: flags.boolean({
      hidden: true,
      allowNo: true,
      description: 'Enable or disable collection of anonymous usage data.'
    }),
    analyticsSalt: flags.string({
      hidden: true,
      description:
        'Set salt for analytics. This should only be used for CI builds.'
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
        'Path to the directory in which the project should be created.'
    }
  ];

  async run() {
    const parsed = this.parse(Init);
    const projectDir = parsed.args.projectDir || '.';

    try {
      mkdirSync(projectDir, { recursive: true });
      const isScaffold = await shouldBuildScaffold(
        projectDir,
        parsed.flags.buildScaffold,
        parsed.flags.force
      );
      if (isScaffold) {
        await buildScaffold(
          projectDir,
          parsed.flags.verbose,
          parsed.flags.addCds
        );
      }
      const options = await this.getOptions(
        projectDir,
        isScaffold ? 'npm run start:prod' : parsed.flags.startCommand,
        parsed.flags.projectName
      ).catch(e =>
        this.error(parsed.flags.verbose ? e.stack : e.message, { exit: 10 })
      );

      await usageAnalytics(
        projectDir,
        parsed.flags.analytics,
        parsed.flags.analyticsSalt
      );

      const tasks = new Listr([
        {
          title: 'Creating files',
          task: async () => {
            const copyDescriptors = getCopyDescriptors(
              projectDir,
              getTemplatePaths(
                this.getTemplateNames(isScaffold, parsed.flags.addCds)
              )
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
          title: 'Modifying test config',
          task: () =>
            modifyJestConfig(
              path.resolve(projectDir, 'test', 'jest-e2e.json'),
              getJestConfig(false)
            ),
          enabled: () => isScaffold
        },
        {
          title: 'Adding dependencies to package.json',
          task: async () =>
            modifyPackageJson({
              projectDir,
              isScaffold,
              frontendScripts: parsed.flags.frontendScripts,
              force: parsed.flags.force,
              addCds: parsed.flags.addCds
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
          task: () => modifyGitIgnore(projectDir, parsed.flags.addCds)
        }
      ]);

      await tasks.run();

      this.printSuccessMessage(isScaffold, parsed.flags.addCds);
    } catch (error) {
      this.error(parsed.flags.verbose ? error.stack : error.message, {
        exit: 1
      });
    }
  }

  private getTemplateNames(isScaffold: boolean, addCds: boolean): string[] {
    const templates = ['init'];

    if (addCds) {
      templates.push('add-cds');
      if (isScaffold) {
        templates.push('add-cds-scaffold');
      }
    }
    if (isScaffold) {
      templates.push('scaffold-readme');
    }

    return templates;
  }

  private async getOptions(
    projectDir: string,
    startCommand?: string,
    projectName?: string
  ) {
    const { name, scripts } = await parsePackageJson(projectDir);

    const options: { [key: string]: string } = {
      projectName:
        projectName ||
        (await cli.prompt('Enter project name (for use in manifest.yml)', {
          default: name
        })),
      command:
        startCommand ||
        (await cli.prompt('Enter the command to start your application', {
          default: scripts.start ? 'npm start' : ''
        }))
    };

    return options;
  }

  private printSuccessMessage(isScaffold: boolean, addCds: boolean) {
    const warnings = getWarnings();
    const body = [
      '🚀 Next steps:',
      ...this.getNextSteps(isScaffold, addCds),
      '',
      '🔨 Consider setting up Jenkins to continuously build your app.',
      'Use `sap-cloud-sdk add-cx-server` to create the setup script.'
    ];

    if (warnings) {
      this.log(
        boxMessage([
          '⚠️  Init finished with warnings:',
          ...warnings,
          '',
          ...body
        ])
      );
    } else {
      this.log(boxMessage(['✅ Init finished successfully.', '', ...body]));
    }
  }

  private getNextSteps(isScaffold: boolean, addCds: boolean): string[] {
    const message: string[] = [];
    if (addCds) {
      message.push('- Deploy your database locally (`npm run cds-deploy`)');
    }

    if (isScaffold) {
      message.push(...this.nextStepsScaffold());
    } else {
      if (addCds) {
        message.push(...this.nextStepsCdsNoScaffold());
      }
      message.push(...this.nextStepsNoScaffold());
    }

    return message;
  }

  private nextStepsNoScaffold() {
    return [
      '- Make sure that your app listens to `process.env.PORT`',
      '- Build your app if necessary',
      '- Run `sap-cloud-sdk package [--include INC][--exclude EXC]`',
      '- Push to Cloud Foundry (`cf push`)'
    ];
  }

  private nextStepsScaffold() {
    return [
      '- Run the application locally (`npm run start:dev`)',
      '- Deploy your application (`npm run deploy`)'
    ];
  }

  private nextStepsCdsNoScaffold() {
    return [
      'Expose your service:',
      'For express apps add the following snippet to your code:',
      '',
      'cds',
      '  .connect()',
      "  .serve('CatalogService')",
      '  .in(<your-express-app>);',
      '',
      'For other frameworks please refer to the documentation.'
    ];
  }
}
