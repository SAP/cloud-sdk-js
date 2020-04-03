import { version, openFile } from "./util";

export function getChangeLog(v = version) {
  const changeLog = openFile('CHANGELOG.md');
  const [_, olderLogs] = changeLog.split(`\n# ${v}`);
  return olderLogs.split('\n# ')[0];
}

console.log(getChangeLog());
