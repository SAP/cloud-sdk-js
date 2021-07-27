import { createLogger, unique } from '@sap-cloud-sdk/util';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { VdmEnumMemberType, VdmEnumType } from '../../vdm-types';
import { EdmxEnumType } from '../../edmx-parser/v4';

const logger = createLogger({
  package: 'generator',
  messageContext: 'enum-type'
});

export function transformEnumTypesBase(
  enumTypes: EdmxEnumType[],
  formatter: ServiceNameFormatter
): VdmEnumType[] {
  const formattedTypes = enumTypes.reduce(
    (formatted, enumType) => ({
      ...formatted,
      [enumType.Name]: formatter.originalToEnumTypeName(enumType.Name)
    }),
    {}
  );
  return enumTypes.map(e => {
    e.UnderlyingType = e.UnderlyingType || 'Edm.Int32';
    const typeName = formattedTypes[e.Name];
    return {
      originalName: e.Name,
      typeName,
      underlyingType: e.UnderlyingType,
      members: parseMember(e)
    };
  });
}

function parseMember(edmxEnumType: EdmxEnumType): VdmEnumMemberType[] {
  validateUniqueness(edmxEnumType);
  validateUnderlyingType(edmxEnumType);

  if (areAllValuesSet(edmxEnumType)) {
    return edmxEnumType.Member.map(member => ({
      name: member.Name,
      originalValue: member.Value!
    }));
  }

  return edmxEnumType.Member.map((member, index) => ({
    name: member.Name,
    originalValue: index.toString()
  }));
}

function validateUniqueness(edmxEnumType: EdmxEnumType) {
  if (unique(edmxEnumType.Member).length !== edmxEnumType.Member.length) {
    logger.warn(
      `The enum '${edmxEnumType.Name}' has duplicate member names. Only the last ones are kept.`
    );
  }
}

function validateUnderlyingType(edmxEnumType: EdmxEnumType) {
  const validUnderlyingTypes = [
    'Edm.Byte',
    'Edm.SByte',
    'Edm.Int16',
    'Edm.Int32',
    'Edm.Int64'
  ];
  if (
    !!edmxEnumType.UnderlyingType &&
    !validUnderlyingTypes.includes(edmxEnumType.UnderlyingType)
  ) {
    logger.warn(
      `The enum ${edmxEnumType.Name} has invalid underlying type ${edmxEnumType.UnderlyingType}.`
    );
  }
}

function areAllValuesSet(edmxEnumType: EdmxEnumType): boolean {
  const values = edmxEnumType.Member.map(member => member.Value);
  return !values.some(value => !value);
}
