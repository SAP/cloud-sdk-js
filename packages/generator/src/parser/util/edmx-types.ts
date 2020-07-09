/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { PathLike } from 'fs';
import { ODataVersion } from '@sap-cloud-sdk/util';
import { SwaggerMetadata } from '../swagger/swagger-types';

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
