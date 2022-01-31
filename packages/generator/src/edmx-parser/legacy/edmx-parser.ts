/* eslint-disable valid-jsdoc */

import { PathLike, readFileSync } from 'fs';
import path from 'path';
import { XMLParser } from 'fast-xml-parser';
import { ODataVersion } from '@sap-cloud-sdk/util';
import {
  EdmxMetadata as EdmxMetadataV2,
  isV2Metadata,
  parseEdmxV2
} from './v2';
import { EdmxMetadata as EdmxMetadataV4, parseEdmxV4 } from './v4';
import { parseBaseMetadata, getRoot } from './common';
/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
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
  const parsedEdmx = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: ''
  }).parse;
  const root = getRoot(parsedEdmx);
  const metaData = parseBaseMetadata(
    root,
    getODataVersion(parsedEdmx),
    edmxPath
  );

  return {
    ...metaData,
    ...(isV2Metadata(metaData) ? parseEdmxV2(root) : parseEdmxV4(root))
  };
}

function getODataVersion(edmx): ODataVersion {
  return edmx['edmx:Edmx'].Version === '4.0' ? 'v4' : 'v2';
}
