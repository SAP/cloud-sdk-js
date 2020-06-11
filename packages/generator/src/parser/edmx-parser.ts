/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { PathLike, readFileSync } from 'fs';
import path from 'path';
import { parse } from 'fast-xml-parser';
import { EdmxMetadata as EdmxMetadataV2 } from './parser-types-v2';
import { EdmxMetadata as EdmxMetadataV4 } from './parser-types-v4';
import { parseBaseMetadata, getRoot } from './edmx-parser-common';
import { parseEdmxV2 } from './edmx-parser-v2';
import { parseEdmxV4 } from './edmx-parser-v4';

export function parseEdmxFromPath(
  edmxPath: PathLike
): EdmxMetadataV2 | EdmxMetadataV4 {
  const edmxFile = readFileSync(path.resolve(edmxPath.toString()), {
    encoding: 'utf-8'
  });
  return parseEdmxFile(edmxFile, edmxPath);
}

function parseEdmxFile(
  edmx: string,
  edmxPath: PathLike
): EdmxMetadataV2 | EdmxMetadataV4 {
  const parsedEdmx = parse(edmx, {
    ignoreAttributes: false,
    attributeNamePrefix: ''
  });
  const root = getRoot(parsedEdmx);
  const metaData = parseBaseMetadata(
    root,
    getODataVersion(parsedEdmx),
    edmxPath
  );

  return {
    ...metaData,
    ...(metaData.oDataVersion === 'v2' ? parseEdmxV2(root) : parseEdmxV4(root))
  };
}

function getODataVersion(edmx): 'v2' | 'v4' {
  return edmx['edmx:Edmx'].Version === '4.0' ? 'v4' : 'v2';
}
