/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { FunctionDeclarationStructure, StructureKind } from 'ts-morph';
import { getFunctionDoc } from '../typedoc';
import { VdmServiceMetadata } from '../vdm-types';

export function batchFunction(service: VdmServiceMetadata): FunctionDeclarationStructure {
  return {
    kind: StructureKind.Function,
    name: 'batch',
    isExported: true,
    parameters: [{ name: '...requests', type: getBatchParameterType(service) }],
    returnType: 'ODataBatchRequestBuilder',
    statements: `return new ODataBatchRequestBuilder(default${service.className}Path, requests, map);`,
    docs: [
      getFunctionDoc(`Batch builder for operations supported on the ${service.speakingModuleName}.`, {
        params: [
          {
            name: 'requests',
            type: 'MethodRequestBuilderBase<ODataRequestConfig>[]',
            description: 'The requests of the batch'
          }
        ],
        returns: {
          type: 'ODataBatchRequestBuilder',
          description: 'A request builder for batch.'
        }
      })
    ]
  };
}

export function changesetFunction(service: VdmServiceMetadata): FunctionDeclarationStructure {
  return {
    kind: StructureKind.Function,
    name: 'changeset',
    isExported: true,
    parameters: [{ name: '...requests', type: `Write${service.className}RequestBuilder[]` }],
    returnType: `ODataBatchChangeSet<Write${service.className}RequestBuilder>`,
    statements: 'return new ODataBatchChangeSet(requests);',
    docs: [
      getFunctionDoc(`Change set constructor consists of write operations supported on the ${service.speakingModuleName}.`, {
        params: [
          {
            name: 'requests',
            type: `Write${service.className}RequestBuilder[]`,
            description: 'The requests of the change set'
          }
        ],
        returns: {
          type: 'ODataBatchChangeSet',
          description: 'A change set for batch.'
        }
      })
    ]
  };
}

function getBatchParameterType(service: VdmServiceMetadata): string {
  return `Array<Read${service.className}RequestBuilder | ODataBatchChangeSet<Write${service.className}RequestBuilder>>`;
}
