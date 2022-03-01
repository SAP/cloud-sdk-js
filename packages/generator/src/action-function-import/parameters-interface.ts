import { InterfaceDeclarationStructure, StructureKind } from 'ts-morph';
import { VdmActionImport, VdmFunctionImport } from '../vdm-types';
import { addLeadingNewline } from '../typedoc';

/**
 * @internal
 */
export function parametersInterface(
  actionFunctionImport: VdmFunctionImport | VdmActionImport
): InterfaceDeclarationStructure {
  return {
    kind: StructureKind.Interface,
    name: `${actionFunctionImport.parametersTypeName}<DeSerializersT extends DeSerializers>`,
    isExported: true,
    properties: actionFunctionImport.parameters.map(parameter => ({
      name: parameter.parameterName,
      type: parameter.nullable
        ? `${parameter.jsType} | null`
        : parameter.jsType,
      hasQuestionToken: parameter.nullable,
      docs: [addLeadingNewline(parameter.description)]
    })),
    docs: [
      addLeadingNewline(
        `Type of the parameters to be passed to [[${actionFunctionImport.name}]].`
      )
    ]
  };
}
