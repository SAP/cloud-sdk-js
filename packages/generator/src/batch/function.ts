import {
  FunctionDeclarationOverloadStructure,
  FunctionDeclarationStructure,
  StructureKind
} from 'ts-morph';
import { caps } from '@sap-cloud-sdk/util';
import { addLeadingNewline, getFunctionDoc } from '../typedoc';
import { VdmServiceMetadata } from '../vdm-types';

export function batchFunction(
  service: VdmServiceMetadata
): FunctionDeclarationStructure {
  const versionInCaps = caps(service.oDataVersion);
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
            type: `ODataBatchRequestBuilder${versionInCaps}`,
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
      returnType: `ODataBatchRequestBuilder${versionInCaps}`,
      docs
    },
    {
      kind: StructureKind.FunctionOverload,
      parameters: [{ name: 'requests', type: asArray(type) }],
      returnType: `ODataBatchRequestBuilder${versionInCaps}`
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
    returnType: `ODataBatchRequestBuilder${versionInCaps}`,
    statements: `return new ODataBatchRequestBuilder${versionInCaps}(default${service.className}Path, variadicArgumentToArray(first,rest), map);`,
    overloads
  };
}

export function changesetFunction(
  service: VdmServiceMetadata
): FunctionDeclarationStructure {
  const versionInCaps = caps(service.oDataVersion);
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
            type: `ODataBatchChangeSet${versionInCaps}`,
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
      returnType: `ODataBatchChangeSet${versionInCaps}<Write${service.className}RequestBuilder>`,
      docs
    },
    {
      kind: StructureKind.FunctionOverload,
      parameters: [{ name: 'requests', type: asArray(type) }],
      returnType: `ODataBatchChangeSet${versionInCaps}<Write${service.className}RequestBuilder>`
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
    returnType: `ODataBatchChangeSet${versionInCaps}<Write${service.className}RequestBuilder>`,
    statements: `return new ODataBatchChangeSet${versionInCaps}(variadicArgumentToArray(first,rest));`,
    overloads
  };
}

function asArray(type: string): string {
  return `Array<${type}>`;
}

function getBatchParameterType(service: VdmServiceMetadata): string {
  return `Read${service.className}RequestBuilder | ODataBatchChangeSet${caps(
    service.oDataVersion
  )}<Write${service.className}RequestBuilder>`;
}
