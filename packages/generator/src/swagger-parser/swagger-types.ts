/**
 * @internal
 */
export interface SwaggerMetadata {
  swagger: string;
  info: { [properties: string]: string };
  definitions: { [entities: string]: SwaggerEntity };
  paths: { [path: string]: { [method: string]: SwaggerPath } };
  basePath?: string;
  'x-sap-ext-overview': { [key: string]: any };
  externalDocs?: { description: string; url; string };
}
/**
 * @internal
 */
export interface SwaggerEntity extends SwaggerDescribed {
  properties: { [fieldName: string]: SwaggerProperty };
  title: string;
  type?: string;
}
/**
 * @internal
 */
export interface SwaggerProperty extends SwaggerDescribed {
  type: string[];
  title?: string;
  example?: string;
  format?: string;
  multipleOf?: number;
  minimum?: number;
  maximum?: number;
  maxLength?: number;
}
/**
 * @internal
 */
export interface SwaggerPath {
  summary: string;
  parameters: SwaggerPathParameter[];
}
/**
 * @internal
 */
export interface SwaggerPathParameter extends SwaggerDescribed {
  name: string;
  required: boolean;
  pattern?: string;
}
/**
 * @internal
 */
export interface SwaggerDescribed {
  description?: string;
}
