/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
const { version, openFile } = require('./util');

module.exports = {
  getChangelog: function (v = version) {
    const changelog = openFile('CHANGELOG.md');
    const [_, olderLogs] = changelog.split(`\n# ${v}`);
    const logs = olderLogs.split('\n# ')[0];
    return logs.slice(logs.indexOf('\n##') + 1);
  }
}
