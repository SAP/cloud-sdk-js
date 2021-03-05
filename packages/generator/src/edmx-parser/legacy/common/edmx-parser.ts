import { PathLike } from 'fs';
import { basename } from 'path';
import { createLogger, ODataVersion } from '@sap-cloud-sdk/util';
import { forceArray } from '../../../generator-utils';
import {
  EdmxMetadataBase,
  EdmxEntityTypeBase,
  EdmxComplexTypeBase,
  EdmxFunctionImportBase
} from './parser-types';

/* eslint-disable valid-jsdoc */

const logger = createLogger({
  package: 'generator',
  messageContext: 'edmx-parser'
});
/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export function parseBaseMetadata(
  root: any,
  oDataVersion: ODataVersion,
  edmxPath: PathLike
): EdmxMetadataBase {
  return {
    path: edmxPath,
    oDataVersion,
    fileName: basename(edmxPath.toString()).split('.')[0],
    namespace: root.Namespace,
    selfLink: parseLink(root)
  };
}
/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export function parseEntityTypes(root: any): EdmxEntityTypeBase[] {
  return forceArray(root.EntityType).map(e => {
    if (!e.Key) {
      e.Key = {};
    }
    e.Key.PropertyRef = forceArray(e.Key.PropertyRef);
    e.NavigationProperty = forceArray(e.NavigationProperty);
    e.Property = forceArray(e.Property);
    return e;
  });
}
/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export function parseFunctionImportsBase(root: any): EdmxFunctionImportBase[] {
  return forceArray(root.EntityContainer.FunctionImport).map(f => {
    f.Parameter = forceArray(f.Parameter);
    return f;
  });
}
/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export function parseComplexTypes(root: any): EdmxComplexTypeBase[] {
  return forceArray(root.ComplexType).map(c => {
    c.Property = forceArray(c.Property);
    return c;
  });
}

function parseLink(root: any): string | undefined {
  const links = forceArray(root['atom:link']);
  const selfLink = links.find(link => link.rel === 'self');
  if (selfLink) {
    return selfLink.href;
  }
}
/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export function getRoot(edmx: any): any {
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
