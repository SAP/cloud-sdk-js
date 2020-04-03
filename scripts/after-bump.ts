import * as fs from 'fs';
import * as path from 'path';

import { transformFile } from './util';

function updateTypeDocConfig() {
  transformFile('typedoc.json', config => JSON.stringify({ ...JSON.parse(config), out: `${path.relative(path.resolve(), apiDocPath)}/${version}` }, null, 2));
}

function updateChangelog() {
# Next

Release Date:
API Docs:
API Docs (VDM):
blog:

## knownIssues

-

## compatibilityNotes

-

## newFunctionality

-

## improvements

-

## fixedIssues

-
  transformFile('typedoc.json', config => JSON.stringify({ ...JSON.parse(config), out: `${path.relative(path.resolve(), apiDocPath)}/${version}` }, null, 2));
}


function afterBump() {
  updateTypeDocConfig();
  updateVersion
}
