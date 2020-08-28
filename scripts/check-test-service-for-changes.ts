/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { execSync } from 'child_process';

const git_diff = execSync('git diff --name-only', { encoding: 'utf8' });
if (git_diff) {
  throw new Error(
    `The test services need to be updated, please generate them again. See git diff result: \n ${git_diff}`
  );
}
