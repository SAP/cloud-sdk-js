export interface SwaggerMetadata {
  swagger: string;
  info: { [properties: string]: string };
  definitions: { [entities: string]: SwaggerEntity };
  paths: { [path: string]: { [method: string]: SwaggerPath } };
  basePath?: string;
  'x-sap-ext-overview': { [key: string]: any };
  externalDocs?: { description: string; url; string };
}
//
export interface SwaggerEntity extends SwaggerDescribed {
  properties: { [fieldName: string]: SwaggerProperty };
  title: string;
  type?: string;
}

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

export interface SwaggerPath {
  summary: string;
  parameters: SwaggerPathParameter[];
}

export interface SwaggerPathParameter extends SwaggerDescribed {
  name: string;
  required: boolean;
  pattern?: string;
}

export interface SwaggerDescribed {
  description?: string;
}
