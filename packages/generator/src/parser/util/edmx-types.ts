import { SwaggerMetadata } from '../swagger/swagger-types';
import { PathLike } from "fs";
import { ODataVersion } from '@sap-cloud-sdk/util';

export interface ServiceMetadata {
  edmx: EdmxMetadataBase;
  swagger?: SwaggerMetadata;
}

export interface EdmxMetadataBase {
  path: PathLike;
  oDataVersion: ODataVersion;
  fileName: string;
  namespace: string;
  selfLink?: string;
  root: any;
}
