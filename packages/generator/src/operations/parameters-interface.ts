import { StructureKind } from 'ts-morph';
import { addLeadingNewline } from '../typedoc';
import type { InterfaceDeclarationStructure } from 'ts-morph';
import type { VdmOperation } from '../vdm-types';

/**
 * @internal
 */
export function parametersInterface(
  operation: VdmOperation
): InterfaceDeclarationStructure {
  return {
    kind: StructureKind.Interface,
    name: `${operation.parametersTypeName}<DeSerializersT extends DeSerializers>`,
    isExported: true,
    properties: operation.parameters.map(parameter => ({
      name: parameter.parameterName,
      type: parameter.nullable
        ? `${parameter.jsType} | null`
        : parameter.jsType,
      hasQuestionToken: parameter.nullable,
      docs: [addLeadingNewline(parameter.description)]
    })),
    docs: [
      addLeadingNewline(
        `Type of the parameters to be passed to {@link ${operation.name}}.`
      )
    ]
  };
}
