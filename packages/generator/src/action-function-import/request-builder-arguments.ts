/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import {
  VdmActionImport,
  VdmFunctionImport,
  VdmServiceMetadata
} from '../vdm-types';
import { responseTransformerFunctionName } from './response-transformer-function';

export function getRequestBuilderArgumentsBase(
  parameterName: 'params' | 'payload',
  actionFunctionImport: VdmFunctionImport | VdmActionImport,
  service: VdmServiceMetadata
): string[] {
  return [
    `'${service.servicePath}'`,
    `'${actionFunctionImport.originalName}'`,
    `(data) => ${responseTransformerFunctionName(
      actionFunctionImport.returnType
    )}(data, ${actionFunctionImport.returnType.builderFunction})`,
    parameterName
  ];
}
