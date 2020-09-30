import { PathLike, readFileSync } from 'fs';
import path, { basename } from 'path';
import { parse } from 'fast-xml-parser';
import { createLogger, ODataVersion } from '@sap-cloud-sdk/util';
import { forceArray } from '../generator-utils';
import { SwaggerMetadata } from '../swagger-parser/swagger-types';

const logger = createLogger({
  package: 'generator',
  messageContext: 'edmx-edmx-parser'
});

export interface EdmxMetadata {
  path: PathLike;
  oDataVersion: ODataVersion;
  fileName: string;
  namespace: string;
  selfLink?: string;
  root: any;
}

function parseMetadata(
  root,
  oDataVersion: ODataVersion,
  edmxPath: PathLike
): EdmxMetadata {
  return {
    path: edmxPath,
    oDataVersion,
    fileName: basename(edmxPath.toString()).split('.')[0],
    namespace: root.Namespace,
    selfLink: parseLink(root),
    root
  };
}

export function readEdmxFile(edmxPath: PathLike): EdmxMetadata {
  const edmxFile = readFileSync(path.resolve(edmxPath.toString()), {
    encoding: 'utf-8'
  });
  return parseEdmxFile(edmxFile, edmxPath);
}

function parseEdmxFile(edmx: string, edmxPath: PathLike): EdmxMetadata {
  const parsedEdmx = parse(edmx, {
    ignoreAttributes: false,
    attributeNamePrefix: ''
  });
  const root = getRoot(parsedEdmx);
  return parseMetadata(root, getODataVersion(parsedEdmx), edmxPath);
}

function getODataVersion(edmx): ODataVersion {
  return edmx['edmx:Edmx'].Version === '4.0' ? 'v4' : 'v2';
}

function getRoot(edmx) {
  const schema = edmx['edmx:Edmx']['edmx:DataServices'].Schema;
  if (schema.length > 1) {
    if (schema.length > 2) {
      throw new Error(
        'There are more than two schemas in the input metadata file.'
      );
    }
    // We assume SFSF edmx files to always have multiple schema tags
    logger.info(`${schema.length} schemas found. Schemas will be merged.`);
    return schema.reduce(
      (mergedSchemas, schemaEntry) => ({ ...mergedSchemas, ...schemaEntry }),
      {}
    );
  }
  return schema;
}

function parseLink(root): string | undefined {
  const links = forceArray(root['atom:link']);
  const selfLink = links.find(link => link.rel === 'self');
  if (selfLink) {
    return selfLink.href;
  }
}

export interface ServiceMetadata {
  edmx: EdmxMetadata;
  swagger?: SwaggerMetadata;
}
