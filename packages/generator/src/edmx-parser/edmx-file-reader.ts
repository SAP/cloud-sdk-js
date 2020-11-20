import { PathLike, readFileSync } from 'fs';
import path, { basename } from 'path';
import { parse } from 'fast-xml-parser';
import { assoc, createLogger, flat, ODataVersion } from '@sap-cloud-sdk/util';
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
  namespaces: string[];
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
    namespaces: root.Namespace,
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
    return mergeSchemas(schema);
  }
  return mergeSchemas(forceArray(schema));
}

function mergeSchemas(schema) {
  return {
    EntityContainer: flat(
      schema.map(s =>
        forceArray(s.EntityContainer).map(ec =>
          addNamespaceToEntityContainer(ec, s.Namespace)
        )
      )
    ),
    EntityType: flat(
      schema.map(s => forceArray(s.EntityType).map(addNamespace(s.Namespace)))
    ),
    EnumType: flat(
      schema.map(s => forceArray(s.EnumType).map(addNamespace(s.Namespace)))
    ),
    ComplexType: flat(
      schema.map(s => forceArray(s.ComplexType).map(addNamespace(s.Namespace)))
    ),
    Action: flat(
      schema.map(s => forceArray(s.Action).map(addNamespace(s.Namespace)))
    ),
    Function: flat(
      schema.map(s => forceArray(s.Function).map(addNamespace(s.Namespace)))
    ),
    Association: flat(
      schema.map(s => forceArray(s.Association).map(addNamespace(s.Namespace)))
    ),
    'atom:link': flat(
      schema.map(s => forceArray(s['atom:link']).map(addNamespace(s.Namespace)))
    ),
    Namespace: schema.map(s => s.Namespace)
  };
}

function addNamespaceToEntityContainer(entityContainer, namespace: string) {
  return {
    Name: entityContainer.Name,
    EntitySet: forceArray(entityContainer.EntitySet).map(
      addNamespace(namespace)
    ),
    ActionImport: forceArray(entityContainer.ActionImport).map(
      addNamespace(namespace)
    ),
    FunctionImport: forceArray(entityContainer.FunctionImport).map(
      addNamespace(namespace)
    ),
    AssociationSet: forceArray(entityContainer.AssociationSet).map(
      addNamespace(namespace)
    )
  };
}

function addNamespace(namespace) {
  return obj => assoc('Namespace', namespace, obj);
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
