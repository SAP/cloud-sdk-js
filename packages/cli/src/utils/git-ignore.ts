/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import * as fs from 'fs';
import * as path from 'path';
import { recordWarning } from '../utils';

export function modifyGitIgnore(projectDir: string, addCds: boolean) {
  const pathToGitignore = path.resolve(projectDir, '.gitignore');
  const pathsToIgnore = ['credentials.json', '/s4hana_pipeline', '/deployment'];
  if (addCds) {
    const cdsPathsToIgnore = [
      '_out',
      '.cds_gen.log',
      '*.db',
      'connection.properties',
      'default-*.json',
      'gen/',
      'target/'
    ];
    pathsToIgnore.push(...cdsPathsToIgnore);
  }

  if (fs.existsSync(pathToGitignore)) {
    try {
      const fileContent = fs.readFileSync(pathToGitignore, 'utf8');
      const newPaths = pathsToIgnore.filter(
        filePath => !fileContent.includes(filePath)
      );
      const newFileContent =
        fileContent + (newPaths.length ? `\n${newPaths.join('\n')}\n` : '');

      fs.writeFileSync(pathToGitignore, newFileContent, 'utf8');
    } catch (error) {
      recordWarning(
        'There was a problem writing to the .gitignore.',
        'If your project is using a different version control system,',
        'please make sure the following paths are not tracked:',
        ...pathsToIgnore.map(filePath => '  ' + filePath)
      );
    }
  } else {
    recordWarning(
      'No .gitignore file found!',
      'If your project is using a different version control system,',
      'please make sure the following paths are not tracked:',
      ...pathsToIgnore.map(filePath => '  ' + filePath)
    );
  }
}
