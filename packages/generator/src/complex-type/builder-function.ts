import { FunctionDeclarationStructure, StructureKind } from 'ts-morph';
import { VdmComplexType } from '../vdm-types';
import { addLeadingNewline } from '../typedoc';

// eslint-disable-next-line valid-jsdoc
/**
 * @internal
 */
export function builderFunction(
  complexType: VdmComplexType
): FunctionDeclarationStructure {
  return {
    kind: StructureKind.Function,
    name: complexType.factoryName,
    isExported: true,
    parameters: [
      {
        name: 'json',
        type: 'any'
      }
    ],
    returnType: complexType.typeName,
    statements: `return ${complexType.typeName}.build(json);`,
    docs: [
      addLeadingNewline(
        `@deprecated Since v1.6.0. Use [[${complexType.typeName}.build]] instead.`
      )
    ]
  };
}
