import { FunctionDeclarationStructure, StructureKind } from 'ts-morph';
import { addLeadingNewline, getFunctionDoc } from '../typedoc';
import { VdmServiceMetadata } from '../vdm-types';

export function batchFunction(
  service: VdmServiceMetadata
): FunctionDeclarationStructure {
  return {
    kind: StructureKind.Function,
    name: 'batch',
    isExported: true,
    parameters: [{ name: '...requests', type: getBatchParameterType(service) }],
    returnType: 'BatchRequestBuilder',
    statements: `return new BatchRequestBuilder(default${service.className}Path, requests, entityToConstructorMap);`,
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
              type: 'BatchRequestBuilder',
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
  return {
    kind: StructureKind.Function,
    name: 'changeset',
    isExported: true,
    parameters: [
      { name: '...requests', type: `Write${service.className}RequestBuilder[]` }
    ],
    returnType: `BatchChangeSet<Write${service.className}RequestBuilder>`,
    statements: 'return new BatchChangeSet(requests);',
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
              type: 'BatchChangeSet',
              description: 'A change set for batch.'
            }
          }
        )
      )
    ]
  };
}

function getBatchParameterType(service: VdmServiceMetadata): string {
  return `(Read${service.className}RequestBuilder | BatchChangeSet<Write${service.className}RequestBuilder>)[]`;
}
