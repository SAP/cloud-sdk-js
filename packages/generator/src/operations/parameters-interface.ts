import { InterfaceDeclarationStructure, StructureKind } from 'ts-morph';
import { VdmOperation } from '../vdm-types';
import { addLeadingNewline } from '../typedoc';

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
