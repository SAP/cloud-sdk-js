/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { createLogger } from '@sap-cloud-sdk/util';
import { parse } from 'fast-xml-parser';
import { PathLike, readFileSync } from 'fs';
import path, { basename } from 'path';
import { forceArray } from '../generator-utils';
import {
  EdmxAssociation,
  EdmxAssociationSet,
  EdmxComplexType,
  EdmxEntitySet,
  EdmxEntityType,
  EdmxFunctionImport,
  EdmxMetadata
} from './parser-types';

const logger = createLogger({
  package: 'generator',
  messageContext: 'edmx-parser'
});

export function parseEdmxFromPath(edmxPath: PathLike): EdmxMetadata {
  const edmxFile = readFileSync(path.resolve(edmxPath.toString()), { encoding: 'utf-8' });
  return parseEdmxFile(edmxFile, edmxPath);
}

function parseEdmxFile(edmx: string, edmxPath: PathLike): EdmxMetadata {
  const parsedEdmx = parse(edmx, { ignoreAttributes: false, attributeNamePrefix: '' });
  const root = getRoot(parsedEdmx);

  const metadata: EdmxMetadata = {
    path: edmxPath,
    fileName: basename(edmxPath.toString()).split('.')[0],
    namespace: root.Namespace,
    entitySets: parseEntitySets(root),
    entityTypes: parseEntityTypes(root),
    functionImports: parseFunctionImports(root),
    complexTypes: parseComplexTypes(root),
    associationSets: parseAssociationSets(root),
    associations: parseAssociations(root),
    selfLink: parseLink(root)
  };
  return metadata;
}

function parseLink(root): string | undefined {
  const links = forceArray(root['atom:link']);
  const selfLink = links.find(link => link.rel === 'self');
  if (selfLink) {
    return selfLink.href;
  }
}

function parseAssociations(root): EdmxAssociation[] {
  return forceArray(root.Association);
}

function parseAssociationSets(root): EdmxAssociationSet[] {
  return forceArray(root.EntityContainer.AssociationSet);
}

function parseEntitySets(root): EdmxEntitySet[] {
  return forceArray(root.EntityContainer.EntitySet);
}

function parseEntityTypes(root): EdmxEntityType[] {
  return forceArray(root.EntityType).map(e => {
    e.Key.PropertyRef = forceArray(e.Key.PropertyRef);
    e.NavigationProperty = forceArray(e.NavigationProperty);
    e.Property = forceArray(e.Property);
    return e;
  });
}

function parseFunctionImports(root): EdmxFunctionImport[] {
  return forceArray(root.EntityContainer.FunctionImport).map(f => {
    f.Parameter = forceArray(f.Parameter);
    return f;
  });
}

function parseComplexTypes(root): EdmxComplexType[] {
  return forceArray(root.ComplexType).map(c => {
    c.Property = forceArray(c.Property);
    return c;
  });
}

export function getRoot(edmx) {
  const schema = edmx['edmx:Edmx']['edmx:DataServices'].Schema;
  if (schema.length > 1) {
    if (schema.length > 2) {
      throw new Error('There are more than two schemas in the input metadata file.');
    }
    // We assume SFSF edmx files to always have multiple schema tags
    logger.info(`${schema.length} schemas found. Schemas will be merged.`);
    return schema.reduce((mergedSchemas, schemaEntry) => {
      return { ...mergedSchemas, ...schemaEntry };
    }, {});
  }
  return schema;
}
