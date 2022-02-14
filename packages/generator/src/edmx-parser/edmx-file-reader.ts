import { PathLike, readFileSync } from 'fs';
import path, { basename } from 'path';
import { XMLParser } from 'fast-xml-parser';
import { ODataVersion, removeFileExtension } from '@sap-cloud-sdk/util';
import { forceArray } from '../generator-utils';
import { SwaggerMetadata } from '../swagger-parser';
import { getMergedPropertyWithNamespace } from './common';
/**
 * @internal
 */
export interface EdmxMetadata {
  path: PathLike;
  oDataVersion: ODataVersion;
  fileName: string;
  namespaces: string[];
  selfLink?: string;
  root: any;
}

function parseMetadata(
  root: any,
  oDataVersion: ODataVersion,
  edmxPath: PathLike
): EdmxMetadata {
  return {
    path: edmxPath,
    oDataVersion,
    fileName: removeFileExtension(basename(edmxPath.toString())),
    namespaces: forceArray(root).map(schema => schema.Namespace),
    selfLink: parseLink(root),
    root
  };
}

// eslint-disable-next-line valid-jsdoc
/**
 * @internal
 */
export function readEdmxFile(edmxPath: PathLike): EdmxMetadata {
  const edmxFile = readFileSync(path.resolve(edmxPath.toString()), {
    encoding: 'utf-8'
  });
  return parseEdmxFile(edmxFile, edmxPath);
}

function parseEdmxFile(edmx: string, edmxPath: PathLike): EdmxMetadata {
  const parsedEdmx = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: ''
  }).parse(edmx);
  const root = getRoot(parsedEdmx);
  return parseMetadata(root, getODataVersion(parsedEdmx), edmxPath);
}

function getODataVersion(edmx): ODataVersion {
  return edmx['edmx:Edmx'].Version === '4.0' ? 'v4' : 'v2';
}

function getRoot(edmx) {
  const schema = edmx['edmx:Edmx']['edmx:DataServices'].Schema;
  return forceArray(schema);
}

function parseLink(root): string | undefined {
  const links = getMergedPropertyWithNamespace(root, 'atom:link');
  const selfLink = links.find(link => link.rel === 'self');
  if (selfLink) {
    return selfLink.href;
  }
}
/**
 * @internal
 */
export interface ServiceMetadata {
  edmx: EdmxMetadata;
  swagger?: SwaggerMetadata;
}
