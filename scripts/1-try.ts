import { version, openFile } from './util';

const changeLog = openFile('CHANGELOG.md');
console.log(changeLog.substring(0, 450));
