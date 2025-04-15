import { readdirSync, readFileSync } from 'fs';
import path, { basename, join, parse } from 'path';
import { XMLParser } from 'fast-xml-parser';
import { removeFileExtension } from '@sap-cloud-sdk/util';
import { forceArray } from '../generator-utils';
import { readSwaggerFile } from '../swagger-parser';
import { getMergedPropertyWithNamespace } from './common';
import type { SwaggerMetadata } from '../swagger-parser';
import type { ODataVersion } from '@sap-cloud-sdk/util';
import type { PathLike } from 'fs';
/**
 * @internal
 */
export interface EdmxMetadata {
  /**
   * @internal
   */
  path: PathLike;
  /**
   * @internal
   */
  oDataVersion: ODataVersion;
  /**
   * @internal
   */
  fileName: string;
  /**
   * @internal
   */
  namespaces: string[];
  /**
   * @internal
   */
  selfLink?: string;
  /**
   * @internal
   */
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
  const odataV4VersionRegex = new RegExp('^4.0\\d{0,1}$'); // Regex for 4.0, 4.0X
  return odataV4VersionRegex.test(edmx['edmx:Edmx'].Version) ? 'v4' : 'v2';
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
export function readEdmxAndSwaggerFile(
  edmxServiceSpecPath: string
): ServiceMetadata {
  const serviceMetadata: ServiceMetadata = {
    edmx: readEdmxFile(edmxServiceSpecPath)
  };
  const { dir, name } = parse(edmxServiceSpecPath);
  const files = readdirSync(dir);
  files.forEach(file => {
    if (name + '.json' === file || name + '.JSON' === file) {
      serviceMetadata.swagger = readSwaggerFile(join(dir, file));
    }
  });

  return serviceMetadata;
}

/**
 * @internal
 */
export interface ServiceMetadata {
  /**
   * @internal
   */
  edmx: EdmxMetadata;
  /**
   * @internal
   */
  swagger?: SwaggerMetadata;
}
