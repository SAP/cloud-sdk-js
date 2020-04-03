/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { version, openFile } from './util';

export function getChangeLog(v = version) {
  const changeLog = openFile('CHANGELOG.md');
  const [_, olderLogs] = changeLog.split(`\n# ${v}`);
  return olderLogs.split('\n# ')[0];
}

/* eslint-disable-next-line no-console */
console.log(getChangeLog());
