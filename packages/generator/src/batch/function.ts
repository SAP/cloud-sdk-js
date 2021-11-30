import {
  FunctionDeclarationOverloadStructure,
  FunctionDeclarationStructure,
  StructureKind
} from 'ts-morph';
import { addLeadingNewline, getFunctionDoc } from '../typedoc';
import { VdmServiceMetadata } from '../vdm-types';
/* eslint-disable valid-jsdoc */

/**
 * @internal
 */
export function batchFunction(
  service: VdmServiceMetadata
): FunctionDeclarationStructure {
  const type = getBatchParameterType(service);

  const docs = [
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
            type: 'ODataBatchRequestBuilder ',
            description: 'A request builder for batch.'
          }
        }
      )
    )
  ];

  const overloads: FunctionDeclarationOverloadStructure[] = [
    {
      kind: StructureKind.FunctionOverload,
      parameters: [{ name: '...requests', type: asArray(type) }],
      returnType: 'ODataBatchRequestBuilder',
      docs
    },
    {
      kind: StructureKind.FunctionOverload,
      parameters: [{ name: 'requests', type: asArray(type) }],
      returnType: 'ODataBatchRequestBuilder'
    }
  ];

  return {
    kind: StructureKind.Function,
    name: 'batch',
    isExported: true,
    parameters: [
      { name: 'first', type: `undefined|${type}|${asArray(type)}` },
      { name: '...rest', type: asArray(type) }
    ],
    returnType: 'ODataBatchRequestBuilder',
    statements: `return new ODataBatchRequestBuilder(default${service.className}Path, variadicArgumentToArray(first,rest), map);`,
    overloads
  };
}
/**
 * @internal
 */
export function changesetFunction(
  service: VdmServiceMetadata
): FunctionDeclarationStructure {
  const type = `Write${service.className}RequestBuilder`;

  const docs = [
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
  ];

  const overloads: FunctionDeclarationOverloadStructure[] = [
    {
      kind: StructureKind.FunctionOverload,
      parameters: [{ name: '...requests', type: asArray(type) }],
      returnType: `BatchChangeSet<Write${service.className}RequestBuilder>`,
      docs
    },
    {
      kind: StructureKind.FunctionOverload,
      parameters: [{ name: 'requests', type: asArray(type) }],
      returnType: `BatchChangeSet<Write${service.className}RequestBuilder>`
    }
  ];

  return {
    kind: StructureKind.Function,
    name: 'changeset',
    isExported: true,
    parameters: [
      { name: 'first', type: `undefined|${type}|${asArray(type)}` },
      { name: '...rest', type: asArray(type) }
    ],
    returnType: `BatchChangeSet<Write${service.className}RequestBuilder>`,
    statements:
      'return new BatchChangeSet(variadicArgumentToArray(first,rest));',
    overloads
  };
}

function asArray(type: string): string {
  return `Array<${type}>`;
}

function getBatchParameterType(service: VdmServiceMetadata): string {
  return `Read${service.className}RequestBuilder | BatchChangeSet<Write${service.className}RequestBuilder>`;
}
