/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { FunctionDeclarationStructure, StructureKind } from 'ts-morph';
import { caps } from '@sap-cloud-sdk/util';
import { addLeadingNewline, getFunctionDoc } from '../typedoc';
import { VdmServiceMetadata } from '../vdm-types';

export function batchFunction(
  service: VdmServiceMetadata
): FunctionDeclarationStructure {
  const versionInCaps = caps(service.oDataVersion);
  return {
    kind: StructureKind.Function,
    name: 'batch',
    isExported: true,
    parameters: [{ name: '...requests', type: getBatchParameterType(service) }],
    returnType: `ODataBatchRequestBuilder${versionInCaps}`,
    statements: `return new ODataBatchRequestBuilder${versionInCaps}(default${service.className}Path, requests, map);`,
    docs: [
      addLeadingNewline(
        getFunctionDoc(
          `Batch builder for operations supported on the ${service.speakingModuleName}.`,
          {
            params: [
              {
                name: 'requests',
                type: 'MethodRequestBuilderBase<ODataRequestConfig>[]',
                description: 'The requests of the batch'
              }
            ],
            returns: {
              type: `ODataBatchRequestBuilder${versionInCaps}`,
              description: 'A request builder for batch.'
            }
          }
        )
      )
    ]
  };
}

export function changesetFunction(
  service: VdmServiceMetadata
): FunctionDeclarationStructure {
  const versionInCaps = caps(service.oDataVersion);
  return {
    kind: StructureKind.Function,
    name: 'changeset',
    isExported: true,
    parameters: [
      { name: '...requests', type: `Write${service.className}RequestBuilder[]` }
    ],
    returnType: `ODataBatchChangeSet${versionInCaps}<Write${service.className}RequestBuilder>`,
    statements: `return new ODataBatchChangeSet${versionInCaps}(requests);`,
    docs: [
      addLeadingNewline(
        getFunctionDoc(
          `Change set constructor consists of write operations supported on the ${service.speakingModuleName}.`,
          {
            params: [
              {
                name: 'requests',
                type: `Write${service.className}RequestBuilder[]`,
                description: 'The requests of the change set'
              }
            ],
            returns: {
              type: `ODataBatchChangeSet${versionInCaps}`,
              description: 'A change set for batch.'
            }
          }
        )
      )
    ]
  };
}

function getBatchParameterType(service: VdmServiceMetadata): string {
  return `Array<Read${
    service.className
  }RequestBuilder | ODataBatchChangeSet${caps(service.oDataVersion)}<Write${
    service.className
  }RequestBuilder>>`;
}
