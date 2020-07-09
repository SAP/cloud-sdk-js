/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { toTitleFormat } from '@sap-cloud-sdk/core';
import { endWithDot, ensureString } from '../../generator-utils';
import {
  EdmxDocumented,
  EdmxEntitySetBase,
  EdmxParameter,
  EdmxProperty,
  JoinedEntityMetadata
} from '../common/edmx-types';
import {
  SwaggerDescribed,
  SwaggerPath,
  SwaggerPathParameter,
  SwaggerProperty
} from '../swagger/swagger-types';

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

export function propertyDescription(
  property: EdmxProperty,
  swaggerProperty?: SwaggerProperty
): string {
  const short = shortPropertyDescription(property, swaggerProperty);
  const long = longDescription(property, swaggerProperty);
  return `${short}\n${long}`.trim();
}

export function parameterDescription(
  parameter: EdmxParameter,
  swaggerParameter?: SwaggerPathParameter
): string {
  const short = endWithDot(toTitleFormat(parameter.Name));
  const long = longDescription(parameter, swaggerParameter);
  return endWithDot((long || short).trim());
}

export function functionImportDescription(
  swaggerDefinition: SwaggerPath | undefined,
  originalName: string
): string {
  if (swaggerDefinition && swaggerDefinition.summary) {
    return endWithDot(swaggerDefinition.summary);
  }
  return endWithDot(toTitleFormat(originalName));
}

export function entityDescription(
  entity: JoinedEntityMetadata<EdmxEntitySetBase, any>,
  className: string
): string {
  if (entity.entityType['sap:label']) {
    return entity.entityType['sap:label'];
  }
  return entity.swaggerDefinition && entity.swaggerDefinition.title
    ? entity.swaggerDefinition.title
    : toTitleFormat(className);
}
