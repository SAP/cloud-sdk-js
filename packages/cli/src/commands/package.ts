/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import * as fs from 'fs';
import * as path from 'path';
import { Command, flags } from '@oclif/command';
import glob from 'fast-glob';
import Listr from 'listr';
import rm from 'rimraf';
import {
  boxMessage,
  checkOldDependencies,
  getWarnings,
  parsePackageJson
} from '../utils';

export default class Package extends Command {
  static description = 'Copies the specified files to the deployment folder';

  static examples = [
    '$ sap-cloud-sdk package',
    '$ sap-cloud-sdk package -i="index.html"',
    '$ sap-cloud-sdk package --include="package.json,package-lock.json,index.js,dist/**/*" --exclude="**/*.java"'
  ];

  static flags = {
    help: flags.help({
      char: 'h',
      description: 'Show help for the package command.'
    }),
    output: flags.string({
      char: 'o',
      default: 'deployment',
      description: 'Output and deployment folder'
    }),
    ci: flags.boolean({
      default: false,
      description:
        'Add node_modules in production environments to respect the `build once` principle.'
    }),
    include: flags.string({
      char: 'i',
      default: 'package.json,package-lock.json,index.js,dist/**/*',
      description: 'Comma seperated list of files or globs to include'
    }),
    exclude: flags.string({
      char: 'e',
      default: '',
      description: 'Comma separated list of files or globs to exclude'
    }),
    verbose: flags.boolean({
      char: 'v',
      description: 'Show more detailed output.'
    })
  };

  static args = [
    {
      name: 'projectDir',
      description: 'Path to the project directory that shall be packaged.'
    }
  ];

  async run(): Promise<void> {
    const parsed = this.parse(Package);
    const projectDir = parsed.args.projectDir || '.';
    const outputDir = path.resolve(projectDir, parsed.flags.output);

    function copyFiles(filePaths: string[]): void {
      filePaths.forEach(filepath => {
        const outputFilePath = path.resolve(
          outputDir,
          path.relative(projectDir, filepath)
        );
        fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });
        fs.copyFileSync(filepath, outputFilePath);
      });
    }

    const tasks = new Listr([
      {
        title: `Overwrite ${parsed.flags.output}`,
        task: () => {
          try {
            if (fs.existsSync(outputDir)) {
              rm.sync(outputDir);
            }
            fs.mkdirSync(outputDir);
          } catch (error) {
            this.error(error, { exit: 1 });
          }
        }
      },
      {
        title: 'Copying files',
        task: async () => {
          const include = await glob(parsed.flags.include.split(','), {
            dot: true,
            absolute: true,
            cwd: projectDir
          });
          const exclude: string[] = parsed.flags.exclude.length
            ? await glob(parsed.flags.exclude.split(','), {
                dot: true,
                absolute: true,
                cwd: projectDir
              })
            : [];
          const filtered = include.filter(
            filepath => !exclude.includes(filepath)
          );

          copyFiles(filtered);
        }
      },
      {
        title: 'Copying node_modules for ci',
        enabled: () => parsed.flags.ci,
        task: async () => {
          const nodeModuleFiles = await glob('node_modules/**/*', {
            dot: true,
            absolute: true,
            cwd: projectDir
          });

          copyFiles(nodeModuleFiles);
        }
      },
      {
        title: 'Check the SAP Cloud SDK dependencies',
        task: async () => {
          const { dependencies, devDependencies } = await parsePackageJson(
            projectDir
          );
          checkOldDependencies(dependencies);
          checkOldDependencies(devDependencies);
        }
      }
    ]);

    await tasks.run();
    this.printSuccessMessage();
  }

  private printSuccessMessage() {
    const warnings = getWarnings();
    const body = [
      '🚀 Please migrate to new packages.',
      'Please find how to migrate here:',
      'https://github.com/SAP/cloud-sdk/blob/main/knowledge-base/how-to-switch-to-os-cloud-sdk.md'
    ];
    if (warnings) {
      if (this.hasOldSDKWarnings(warnings)) {
        this.log(
          boxMessage([
            '⚠️ Package finished with warnings:',
            ...warnings,
            '',
            ...body
          ])
        );
      } else {
        this.log(
          boxMessage(['⚠️ Package finished with warnings:', ...warnings])
        );
      }
    } else {
      this.log(boxMessage(['✅ Package finished successfully.']));
    }
  }

  private hasOldSDKWarnings(warnings: string[]) {
    const regex = RegExp('Old SAP Cloud SDK: .* is detected.');
    return (
      warnings.map(warning => regex.test(warning)).filter(value => value)
        .length > 0
    );
  }
}
