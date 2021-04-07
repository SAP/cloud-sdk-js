import { unixEOL } from '@sap-cloud-sdk/util'
import { titleFormat } from '@sap-cloud-sdk/util';
import { endWithDot, ensureString } from '../generator-utils';
import {
  EdmxDocumented,
  EdmxEntitySetBase,
  EdmxParameter,
  EdmxProperty,
  JoinedEntityMetadata
} from '../edmx-parser/common';
import {
  SwaggerDescribed,
  SwaggerPath,
  SwaggerPathParameter,
  SwaggerProperty
} from '../swagger-parser/swagger-types';
export function longDescription(
  documented: EdmxDocumented,
  described?: SwaggerDescribed
): string {
  let docs = '';
  if (documented.Documentation) {
    const summmary = ensureString(documented.Documentation.Summary);
    const longDesc = ensureString(documented.Documentation.LongDescription);
    docs = `${summmary}${unixEOL}${longDesc}`.trim();
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
  const desc =
    property['sap:quickinfo'] ||
    property['sap:label'] ||
    swaggerProperty?.title ||
    '';
  return endWithDot(desc.trim());
}

export function propertyDescription(
  property: EdmxProperty,
  swaggerProperty?: SwaggerProperty
): string {
  const short = shortPropertyDescription(property, swaggerProperty);
  const long = longDescription(property, swaggerProperty);
  return `${short}${unixEOL}${long}`.trim();
}

export function parameterDescription(
  parameter: EdmxParameter,
  swaggerParameter?: SwaggerPathParameter
): string {
  const short = endWithDot(titleFormat(parameter.Name));
  const long = longDescription(parameter, swaggerParameter);
  return endWithDot((long || short).trim());
}

export function functionImportDescription(
  swaggerDefinition: SwaggerPath | undefined,
  originalName: string
): string {
  return endWithDot(swaggerDefinition?.summary || titleFormat(originalName));
}

export function actionImportDescription(
  swaggerDefinition: SwaggerPath | undefined,
  originalName: string
): string {
  return functionImportDescription(swaggerDefinition, originalName);
}
export function entityDescription(
  entity: JoinedEntityMetadata<EdmxEntitySetBase, any>,
  className: string
): string {
  return (
    entity.entityType['sap:label'] ||
    entity.swaggerDefinition?.title ||
    titleFormat(className)
  );
}
