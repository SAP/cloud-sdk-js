import { unixEOL, titleFormat } from '@sap-cloud-sdk/util';
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
} from '../swagger-parser';

/**
 * @internal
 */
export function longDescription(
  documented: EdmxDocumented,
  described?: SwaggerDescribed
): string {
  let docs = '';
  if (documented.Documentation) {
    const summary = ensureString(documented.Documentation.Summary);
    const longDesc = ensureString(documented.Documentation.LongDescription);
    docs = `${summary}${unixEOL}${longDesc}`.trim();
  }
  if (!docs && described) {
    docs = ensureString(described.description);
  }
  return endWithDot(docs.trim());
}
/**
 * @internal
 */
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
/**
 * @internal
 */
export function propertyDescription(
  property: EdmxProperty,
  swaggerProperty?: SwaggerProperty
): string {
  const short = shortPropertyDescription(property, swaggerProperty);
  const long = longDescription(property, swaggerProperty);
  return `${short}${unixEOL}${long}`.trim();
}
/**
 * @internal
 */
export function parameterDescription(
  parameter: EdmxParameter,
  swaggerParameter?: SwaggerPathParameter
): string {
  const short = endWithDot(titleFormat(parameter.Name));
  const long = longDescription(parameter, swaggerParameter);
  return endWithDot((long || short).trim());
}
/**
 * @internal
 */
export function functionImportDescription(
  swaggerDefinition: SwaggerPath | undefined,
  originalName: string
): string {
  return endWithDot(swaggerDefinition?.summary || titleFormat(originalName));
}
/**
 * @internal
 */
export function actionImportDescription(
  swaggerDefinition: SwaggerPath | undefined,
  originalName: string
): string {
  return functionImportDescription(swaggerDefinition, originalName);
}
/**
 * @internal
 */
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
