/**
 * @internal
 */
export interface SwaggerMetadata {
  /**
   * @internal
   */
  swagger: string;
  /**
   * @internal
   */
  info: { [properties: string]: string };
  /**
   * @internal
   */
  definitions: { [entities: string]: SwaggerEntity };
  /**
   * @internal
   */
  paths: { [path: string]: { [method: string]: SwaggerPath } };
  /**
   * @internal
   */
  basePath?: string;
  /**
   * @internal
   */
  'x-sap-ext-overview': { [key: string]: any };
  /**
   * @internal
   */
  externalDocs?: { description: string; url; string };
}
/**
 * @internal
 */
export interface SwaggerEntity extends SwaggerDescribed {
  /**
   * @internal
   */
  properties: { [fieldName: string]: SwaggerProperty };
  /**
   * @internal
   */
  title: string;
  /**
   * @internal
   */
  type?: string;
}
/**
 * @internal
 */
export interface SwaggerProperty extends SwaggerDescribed {
  /**
   * @internal
   */
  type: string[];
  /**
   * @internal
   */
  title?: string;
  /**
   * @internal
   */
  example?: string;
  /**
   * @internal
   */
  format?: string;
  /**
   * @internal
   */
  multipleOf?: number;
  /**
   * @internal
   */
  minimum?: number;
  /**
   * @internal
   */
  maximum?: number;
  /**
   * @internal
   */
  maxLength?: number;
}
/**
 * @internal
 */
export interface SwaggerPath {
  /**
   * @internal
   */
  summary: string;
  /**
   * @internal
   */
  parameters: SwaggerPathParameter[];
}
/**
 * @internal
 */
export interface SwaggerPathParameter extends SwaggerDescribed {
  /**
   * @internal
   */
  name: string;
  /**
   * @internal
   */
  required: boolean;
  /**
   * @internal
   */
  pattern?: string;
}
/**
 * @internal
 */
export interface SwaggerDescribed {
  /**
   * @internal
   */
  description?: string;
}
