import { PathLike, readFileSync } from 'fs';
import path, { basename } from 'path';
import { parse } from 'fast-xml-parser';
import { assoc, createLogger, flat, ODataVersion } from '@sap-cloud-sdk/util';
import { forceArray } from '../generator-utils';
import { SwaggerMetadata } from '../swagger-parser/swagger-types';
import {
  EdmxAction,
  EdmxActionImport,
  EdmxActionImportNamespaced,
  EdmxActionNamespaced,
  EdmxComplexType,
  EdmxComplexTypeNamespaced,
  EdmxEntitySetNamespaced,
  EdmxEntityType,
  EdmxEntityTypeNamespaced,
  EdmxEnumType,
  EdmxEnumTypeNamespaced,
  EdmxFunction,
  EdmxFunctionImport as EdmxFunctionImportV4,
  EdmxFunctionImportNamespaced as EdmxFunctionImportNamespacedV4,
  EdmxFunctionNamespaced
} from './v4';
import {
  EdmxAssociation,
  EdmxAssociationNamespaced,
  EdmxAssociationSet,
  EdmxAssociationSetNamespaced,
  EdmxFunctionImport as EdmxFunctionImportV2,
  EdmxFunctionImportNamespaced as EdmxFunctionImportNamespacedV2
} from './v2';
import {
  EdmxEntitySetBase,
  EdmxEntitySetBaseNamespaced,
  EdmxNamed
} from './common';

const logger = createLogger({
  package: 'generator',
  messageContext: 'edmx-edmx-parser'
});

export interface EdmxMetadataSchema {
  EntityContainer?: EdmxMetadataEntityContainer | EdmxMetadataEntityContainer[];
  Namespace: string;
  EntityType?: EdmxEntityType | EdmxEntityType[];
  EnumType?: EdmxEnumType | EdmxEnumType[];
  ComplexType?: EdmxComplexType | EdmxComplexType[];
  Action?: EdmxAction | EdmxAction[];
  Function?:
    | EdmxFunction
    | EdmxFunctionImportV2
    | EdmxFunction[]
    | EdmxFunctionImportV2[];
  Association?: EdmxAssociation[];
  'atom:link'?: [];
}

export interface EdmxMetadataSchemaMerged {
  EntityType: EdmxEntityTypeNamespaced[];
  EnumType: EdmxEnumTypeNamespaced[];
  ComplexType: EdmxComplexTypeNamespaced[];
  Action: EdmxActionNamespaced[];
  Namespace: string[];
}

export interface EdmxMetadataSchemaV2Merged extends EdmxMetadataSchemaMerged {
  EntityContainer: EdmxMetadataEntityContainerV2Merged[];
  Function: EdmxFunctionImportNamespacedV2[];
  Association: EdmxAssociationNamespaced[];
  'atom:link'?: string;
}

export interface EdmxMetadataSchemaV4Merged extends EdmxMetadataSchemaMerged {
  EntityContainer: EdmxMetadataEntityContainerV4Merged[];
  Function: EdmxFunctionNamespaced[];
}

export interface EdmxMetadataEntityContainer extends EdmxNamed {
  EntitySet?: EdmxEntitySetBase | EdmxEntitySetBase[];
  ActionImport?: EdmxActionImport | EdmxActionImport[];
  FunctionImport?:
    | EdmxFunctionImportV2
    | EdmxFunctionImportV4
    | EdmxFunctionImportV2[]
    | EdmxFunctionImportV4[];
  AssociationSet?: EdmxAssociationSet[];
}

export interface EdmxMetadataEntityContainerV2Merged extends EdmxNamed {
  EntitySet: EdmxEntitySetBaseNamespaced[];
  FunctionImport: EdmxFunctionImportNamespacedV2[];
  AssociationSet: EdmxAssociationSetNamespaced[];
}

export interface EdmxMetadataEntityContainerV4Merged extends EdmxNamed {
  EntitySet: EdmxEntitySetNamespaced[];
  FunctionImport: EdmxFunctionImportNamespacedV4[];
  ActionImport: EdmxActionImportNamespaced[];
}

export interface EdmxMetadata {
  path: PathLike;
  oDataVersion: ODataVersion;
  fileName: string;
  // TODO 1584
  namespace: string[];
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
    // TODO 1584
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
    return mergeSchema(schema);
  }
  return mergeSchema(forceArray(schema));
}

function mergeSchema(schema: EdmxMetadataSchema[]) {
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

function addNamespaceToEntityContainer(
  entityContainer: EdmxMetadataEntityContainer,
  namespace: string
): EdmxMetadataEntityContainerV2Merged | EdmxMetadataEntityContainerV4Merged {
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
