/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { createLogger } from '@sap-cloud-sdk/util';
import { edmToTsType, endWithDot, ensureString } from '../../generator-utils';
import { parseTypeName } from '../parser-util';
import { EdmxMetadataBase } from '../edmx-parser';
import { EdmxDocumented, EdmxProperty } from './edmx-types';
import {
  SwaggerDescribed,
  SwaggerMetadata,
  SwaggerPath,
  SwaggerProperty
} from './swagger-types';

const logger = createLogger({
  package: 'generator',
  messageContext: 'some-util-find-good-name'
});

export function longDescription(
  documented: EdmxDocumented,
  described?: SwaggerDescribed
): string {
  let docs = '';
  if (documented.Documentation) {
    const summmary = ensureString(documented.Documentation.Summary);
    const longDesc = ensureString(documented.Documentation.LongDescription);
    docs = `${summmary}\n${longDesc}`.trim();
  }
  if (!docs && described) {
    docs = ensureString(described.description);
  }
  return endWithDot(docs.trim());
}

export function parseType(type: string): string {
  return type.startsWith('Edm')
    ? type
    : type.split('.')[type.split('.').length - 1];
}

export function filterUnknownEdmTypes(p: EdmxProperty): boolean {
  const type = parseTypeName(p.Type);
  const skip = type.startsWith('Edm.') && !edmToTsType(type);
  if (skip) {
    logger.warn(
      `Edm Type ${type} not supported by the SAP Cloud SDK. Skipping generation of property ${p.Name}.`
    );
  }
  return !skip;
}

export function propertyDescription(
  property: EdmxProperty,
  swaggerProperty?: SwaggerProperty
): string {
  const short = shortPropertyDescription(property, swaggerProperty);
  const long = longDescription(property, swaggerProperty);
  return `${short}\n${long}`.trim();
}

export function shortPropertyDescription(
  property: EdmxProperty,
  swaggerProperty?: SwaggerProperty
): string {
  let desc = '';
  if (property['sap:quickinfo']) {
    desc = property['sap:quickinfo'];
  } else if (property['sap:label']) {
    desc = property['sap:label'];
  } else if (swaggerProperty && swaggerProperty.title) {
    desc = swaggerProperty.title;
  }
  return endWithDot(desc.trim());
}

export function isComplexType(type: string): boolean {
  const typeParts = type.split('.');
  return typeParts[0] !== 'Edm' && typeParts[1] !== undefined;
}

export function checkCollectionKind(property: EdmxProperty) {
  if (property.hasOwnProperty('CollectionKind')) {
    logger.warn(
      `"CollectionKind" attribute found in the "${property.Name}" property. Currently, handling collection of properties is not supported by the generator.`
    );
  }
}

export const propertyJsType = (type: string): string | undefined =>
  type.startsWith('Edm.') ? edmToTsType(type) : undefined;

export function isV2Metadata(metadata: EdmxMetadataBase): boolean {
  return metadata.oDataVersion === 'v2';
}

export function swaggerDefinitionForFunctionImport(
  originalName: string,
  httpMethod: string,
  swaggerMetadata: SwaggerMetadata | undefined
): SwaggerPath | undefined {
  if (swaggerMetadata) {
    const paths = swaggerMetadata.paths;
    const entryPath = Object.keys(paths).find(
      path => path === `/${originalName}`
    );
    if (entryPath) {
      const key = Object.keys(paths[entryPath]).find(
        k => k.toLowerCase() === httpMethod.toLowerCase()
      );
      if (key) {
        return paths[entryPath][key];
      }
    }
  }
}
